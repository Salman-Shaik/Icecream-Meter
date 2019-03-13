const createTrWithData = (tag, ...args) => {
  let tr = createElement('tr');
  args.forEach(arg => appendChilds(tr, createElement(tag, arg)));
  return tr;
};

const getEle = selectorInput => document.querySelector(selectorInput);
const getAllEle = selectorInput => document.querySelectorAll(selectorInput);

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

const appendButton = (tr,innerHTML,className) => {
  const button = createElement('button',innerHTML,className);
  const countData = createElement('td');
  appendChilds(countData,button);
  appendChilds(tr,countData);
}

const appendAddButton = tr => appendButton(tr, '+', 'add');
const appendRemoveButton = tr => appendButton(tr,'x','remove');
const appendDeleteButton = tr => {
  const del = createElement('button','','delete');
  let icon =  createElement('i');
  icon.className = 'fas fa-trash-alt';
  const data = createElement('td');
  appendChilds(del,icon);
  appendChilds(data,del);
  appendChilds(tr,data);
}

const updateMemberDetails = (table, name,count) => {
  let tr = createTrWithData('td',name);
  updateTally(tr,count);
  updateStatus(tr,count);
  appendAddButton(tr);
  appendRemoveButton(tr);
  appendDeleteButton(tr);
  appendChilds(table,tr);
}

const fetchFirstChildText = node => node.firstChild.innerText;

const fetchGreatGrandParentFirstChild = node => {
  const greatGrandParent = node.parentNode.parentNode.parentNode;
  return fetchFirstChildText(greatGrandParent);
}

const fetchGrandParentFirstChild = node => {
  const grandParent = node.parentNode.parentNode;
  return fetchFirstChildText(grandParent);
}

const fetchMemberName = node => {
  return fetchGrandParentFirstChild(node) || fetchGreatGrandParentFirstChild(node);
}

const memberOperations = (node,method,url,memberName=fetchMemberName(node)) => {
  const params = JSON.stringify({"memberName":memberName});
  sendAjaxRequest(method,url,'',params);
  fetchMeterDetails();
}

const createInputForName = ()=>{
  const nameElement = createElement('input','','name');
  nameElement.type='text';
  nameElement.placeholder='Full Name';
  return nameElement;
}

const clearChildNodes = parentNode => {
  parentNode.removeChild(getEle('.name'));
  parentNode.removeChild(getEle('.addMember'));
}

const addListenersToButtons = (className,callBack) => {
  let buttons = getAllEle(`button[class=${className}]`);
  buttons.forEach(button => button.onclick = callBack);
}

const addMember = ({target}) =>{
  const buttonHolder = target.parentNode;
  const nameElement = getEle('.name');
  const showForm = createElement('button','➕ Add Member','showForm');
  addListenersToButtons('showForm',showForm);
  const memberName = nameElement.value;
  memberOperations(target, "POST", "/member",memberName);
  nameElement.value='';
  clearChildNodes(buttonHolder);
  buttonHolder.appendChild(showForm);
}

const incrementCount = ({target}) => memberOperations(target, "PUT", "/count");
const clearCount = ({target}) => memberOperations(target, "DELETE", "/count");
const deleteMember = ({target}) =>  memberOperations(target, "DELETE", "/member");
const showForm = ({target}) => {
  const buttonHolder = target.parentNode;
  const nameElement = createInputForName();
  const submitButton = createElement('button','Submit','addMember');
  buttonHolder.replaceChild(nameElement,target);
  buttonHolder.appendChild(submitButton);
  nameElement.focus();
  addListenersToButtons('addMember', addMember);
}

const addListenersToAllButtons = () => {
  addListenersToButtons('add', incrementCount);
  addListenersToButtons('remove', clearCount);
  addListenersToButtons('delete', deleteMember);
  addListenersToButtons('showForm', showForm);
}

const appendHeading = node => {
  const heading = createTrWithData(
    'th', 'Name' , 'Count', 'Treat Status', 'Add Count', 'Clear Count','Delete');
  node.appendChild(heading);
}
const displayMemberDetails = function() {
  const response = JSON.parse(this.responseText);
  const shownDetails = getEle('table');
  const updatedDetails = createElement('table');
  appendHeading(updatedDetails);
  Object.keys(response).forEach((key,index)=>{
      updateMemberDetails(updatedDetails, key, response[key]);
  });
  shownDetails.replaceWith(updatedDetails);
  addListenersToAllButtons();
}

const fetchMeterDetails = () => {
  sendAjaxRequest("GET","/members",displayMemberDetails);
}

window.onload = fetchMeterDetails;
