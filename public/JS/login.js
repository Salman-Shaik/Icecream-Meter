const updateMessage = function() {
  const message = getEle('.message');
  message.innerText = this.responseText;
  message.style.padding="10px";
}

const login = () => {
  const userName = getEle('.username').value;
  const password = getEle('.password').value;
  const body = JSON.stringify({
    userName: userName,
    password: password
  });
  sendAjaxRequest("POST","/login",updateMessage,body);
  window.location.href = '/index.html';
}

const addListenersToButton= () => {
  let loginbtn = getEle('.loginbtn');
  console.log(loginbtn);
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
