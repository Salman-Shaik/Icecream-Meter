const createTrWithData = (tag, ...args) => {
  let tr = createElement('tr');
  args.forEach(arg => appendChilds(tr, createElement(tag, arg)));
  return tr;
};

const getEle = selectorInput => document.querySelector(selectorInput);

const getStatus = ticks => {
  const statusDot = createElement('span','','dot red');
  if(ticks <= 4 && ticks > 2) statusDot.className = 'dot yellow'
  if(ticks >= 5 ) statusDot.className = 'dot green'
  return statusDot;
}

const getTallyMarks = (tallyList,ticks) => {
  for (let i = 0; i < ticks; i++) appendChilds(tallyList,createElement('li'));
}

const updateTally = (tr,ticks) => {
  const tallyList = createElement('ol');
  getTallyMarks(tallyList,ticks);
  const tallyData = createElement('td');
  appendChilds(tallyData,tallyList);
  appendChilds(tr, tallyData);
}
const updateStatus = (tr,ticks) => {
  const statusSpan = getStatus(ticks);
  const spanData = createElement('td');
  appendChilds(spanData,statusSpan);
  appendChilds(tr, spanData);
}

const addTickButton = tr => {
  const tickButton = createElement('button', 'Add', 'addTick');
  const tickData = createElement('td');
  appendChilds(tickData,tickButton);
  appendChilds(tr,tickData);
}

const updateMemberDetails = (table, name,ticks) => {
  let tr = createTrWithData('td',name);
  updateTally(tr,ticks);
  updateStatus(tr,ticks);
  addTickButton(tr);
  appendChilds(table,tr);
}

const addTick = ({target}) => {
  const memberName = target.parentNode.parentNode.firstChild.innerText;
  const params = JSON.stringify({"memberName":memberName});
  sendAjaxRequest("PUT","/tick",'',params);
  fetchMeterDetails();
}

const displayMemberDetails = function() {
  const response = JSON.parse(this.responseText);
  const shownDetails = getEle('table');
  const updatedDetails = createElement('table');
  const heading = createTrWithData(
    'th', 'Name' , 'Number Of Ticks', 'Treat Status', 'Add Tick');
  updatedDetails.appendChild(heading);
  Object.keys(response).forEach((key,index)=>{
      updateMemberDetails(updatedDetails, key, response[key]);
  })
  shownDetails.replaceWith(updatedDetails);
  let addButtons = document.querySelectorAll('button[class=addTick]');
  addButtons.forEach(button => button.onclick = addTick);
}

const fetchMeterDetails = () => {
  sendAjaxRequest("GET","/members",displayMemberDetails);
}
window.onload = fetchMeterDetails;
