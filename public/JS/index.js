const createElement = function(element, innerText, className) {
  let ele = document.createElement(element);
  ele.innerText = innerText || '';
  ele.className = className;
  return ele;
};

const appendChilds = function(node, ...childs) {
  childs.forEach(child => node.appendChild(child));
};

const createTrWithData = function(tag, ...args) {
  let tr = createElement('tr');
  args.forEach(arg => appendChilds(tr, createElement(tag, arg)));
  return tr;
};

const getEle = selectorInput => document.querySelector(selectorInput);

const getStatus = ticks => {
  const statusDot = createElement('span','','dot green');
  if(ticks <= 4 && ticks > 2) statusDot.className = 'dot yellow'
  if(ticks >= 5 ) statusDot.className = 'dot red'
  return statusDot;
}

const updateMemberDetails = (table, name,ticks) => {
  let tr = createTrWithData('td',name,ticks);
  const statusSpan = getStatus(ticks);
  const spanData = createElement('td');
  appendChilds(spanData,statusSpan)
  appendChilds(tr, spanData)

  appendChilds(table,tr);
}

const displayMemberDetails = function() {
  const response = JSON.parse(this.responseText);
  const shownDetails = getEle('table');
  const updatedDetails = createElement('table');
  const heading = createTrWithData(
    'th', 'Name' , 'Number Of Ticks', 'Icecream Treat Status');
  updatedDetails.appendChild(heading);
  Object.keys(response).forEach((key,index)=>{
      updateMemberDetails(updatedDetails, key, response[key]);
  })
  shownDetails.replaceWith(updatedDetails);
}

const getMeterDetails = () => {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = displayMemberDetails;
  xhttp.open("GET", "/members", true);
  xhttp.send();
}
window.onload = getMeterDetails;
