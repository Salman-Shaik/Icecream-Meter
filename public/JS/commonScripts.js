const sendAjaxRequest = (method,url,callBack,reqBody,asyn=true) => {
  let ajax = new XMLHttpRequest();
  ajax.onload=callBack;
  ajax.open(method,url,asyn);
  if(reqBody){
    ajax.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    return ajax.send(reqBody);
  }
  ajax.send();
};

const createElement = (element, innerHTML, className) => {
  let ele = document.createElement(element);
  ele.innerHTML = innerHTML || '';
  ele.className = className;
  return ele;
};

const appendChilds = (node, ...childs) => {
   childs.forEach(child => node.appendChild(child));
};

const isObjectEmpty = obj => Object.keys(obj).length === 0;
