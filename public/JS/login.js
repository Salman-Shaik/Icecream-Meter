const updateMessage = function() {
  const message = getEle('.message');
  message.innerText = this.responseText.replace(/Bad Request:/g,'Error:');
  if(!this.responseText.includes('Bad Request:')){
    window.location.href = '/index.html';
  }
  message.style.padding="10px";
}

const login = () => {
  const userName = getEle('.username').value;
  const password = getEle('.password').value;
  if(!(userName&&password)) return;
  const body = JSON.stringify({
    userName: userName,
    password: password
  });
  sendAjaxRequest("POST","/login",updateMessage,body);
}

const addListenersToButton= () => {
  let loginbtn = getEle('.loginbtn');
  loginbtn.onclick=login;
}

const clearMessage = () => {
  const message = getEle('.message');
  message.innerText = '';
}

const start=()=>{
  clearMessage();
  addListenersToButton();
}

window.onload = start;
