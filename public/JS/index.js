const createTrWithData = (tag, ...args) => {
  let tr = createElement('tr');
  args.forEach(arg => appendChilds(tr, createElement(tag, arg)));
  return tr;
};

const getEle = selectorInput => document.querySelector(selectorInput);

const getStatus = count => {
  const statusDot = createElement('span','','dot red');
  if(count <= 4 && count > 2) statusDot.className = 'dot yellow'
  if(count >= 5 ) statusDot.className = 'dot green'
  return statusDot;
}

const getTallyMarks = (tallyList,count) => {
  for (let i = 0; i < count; i++) appendChilds(tallyList,createElement('li'));
}

const updateTally = (tr,count) => {
  const tallyList = createElement('ol');
  getTallyMarks(tallyList,count);
  const tallyData = createElement('td');
  appendChilds(tallyData,tallyList);
  appendChilds(tr, tallyData);
}
const updateStatus = (tr,count) => {
  const statusSpan = getStatus(count);
  const spanData = createElement('td');
  appendChilds(spanData,statusSpan);
  appendChilds(tr, spanData);
}

const appendAddButton = tr => {
  const add = createElement('button', '+', 'add');
  const tickData = createElement('td');
  appendChilds(tickData,add);
  appendChilds(tr,tickData);
}

const appendRemoveButton = tr => {
  const remove = createElement('button', '-', 'remove');
  const tickData = createElement('td');
  appendChilds(tickData,remove);
  appendChilds(tr,tickData);
}

const updateMemberDetails = (table, name,count) => {
  let tr = createTrWithData('td',name);
  updateTally(tr,count);
  updateStatus(tr,count);
  appendAddButton(tr);
  appendRemoveButton(tr);
  appendChilds(table,tr);
}

const fetchMemberName = node => node.parentNode.parentNode.firstChild.innerText;

const incrementCount = ({target}) => {
  const memberName = fetchMemberName(target);
  const params = JSON.stringify({"memberName":memberName});
  sendAjaxRequest("PUT","/tick",'',params);
  fetchMeterDetails();
}

const clearCount = ({target}) => {
  const memberName = fetchMemberName(target)
  const params = JSON.stringify({"memberName":memberName});
  sendAjaxRequest("DELETE","/tick",'',params);
  fetchMeterDetails();
}

const displayMemberDetails = function() {
  const response = JSON.parse(this.responseText);
  const shownDetails = getEle('table');
  const updatedDetails = createElement('table');
  const heading = createTrWithData(
    'th', 'Name' , 'Count', 'Treat Status', 'Add', 'Clear');
  updatedDetails.appendChild(heading);
  Object.keys(response).forEach((key,index)=>{
      updateMemberDetails(updatedDetails, key, response[key]);
  })
  shownDetails.replaceWith(updatedDetails);
  let addButtons = document.querySelectorAll('button[class=add]');
  let removeButtons = document.querySelectorAll('button[class=remove]');
  addButtons.forEach(button => button.onclick = incrementCount);
  removeButtons.forEach(button => button.onclick = clearCount);
}

const fetchMeterDetails = () => {
  sendAjaxRequest("GET","/members",displayMemberDetails);
}
window.onload = fetchMeterDetails;
