var requestcode;

function setLogin() {
  document.getElementById("txtEmail").style.display = "";
  document.getElementById("pswPwd").style.display = "";
  document.getElementById("txtCodice").style.display = "none";
  document.getElementById("loginmsg").innerHTML = "";
  document.getElementById("btnLogin").onclick= requestLogin;
}
function setAuthCode() {
  document.getElementById("txtEmail").style.display = "none";
  document.getElementById("pswPwd").style.display = "none";
  document.getElementById("txtCodice").style.display = "";
  document.getElementById("loginmsg").innerHTML = "";
  document.getElementById("btnLogin").onclick= requestAuthCode;
}

function requestLogin() {
  var url = site+"ajax/proxy.cfm?action=utente.login";
  var email = encodeURIComponent(document.getElementById("txtEmail").value);
  var pwd = encodeURIComponent(document.getElementById("pswPwd").value);

  let xhrlogin = new XMLHttpRequest();
  xhrlogin.open("POST", url, true);
  xhrlogin.withCredentials = true;
  xhrlogin.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
  xhrlogin.send("email="+email+"&pwd="+pwd);
  xhrlogin.onload = handleLoginResponse;
}

function handleLoginResponse() {
  if(this.status==200)
  {
    try {
      let json = JSON.parse(this.responseText);
      if(json.autenticato) {
        document.getElementById("txtEmail").style.display = "none";
        document.getElementById("pswPwd").style.display = "none";
        document.getElementById("txtCodice").style.display = "";
        document.getElementById("loginmsg").innerHTML = "";
        document.getElementById("btnLogin").onclick = requestAuthCode;
        requestcode = json.confirmationRequestCode;
      }
      else
        document.getElementById("loginmsg").innerHTML = json.messaggio;
    }catch(error) {}
  }
}

function requestAuthCode() {
  var url = site+"ajax/proxy.cfm?action=utente.confermaLogin";
  var code = document.getElementById("txtCodice").value;

  let xhrauthcode = new XMLHttpRequest();
    xhrauthcode.open("POST", url, true);
    xhrauthcode.withCredentials = true;
    xhrauthcode.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    xhrauthcode.send("codice="+code+"&reqCodice="+requestcode);
    xhrauthcode.onload = handleCodeResponse;
}

function handleCodeResponse() {
  if (this.status == 200)
  {
    let json = JSON.parse(this.responseText);
    if(json.autenticato) {
      findCrossCookies();
    }
    else
      document.getElementById("loginmsg").innerHTML = json.messaggio;
  } 
}

// email: alex.mazzoni17@gmail.com
// pdw: Test123456
// http://backoffice.iperbooking.cristiano/?event=codiceLogin&req=96994004A2CEEA7C7A05CFF427533324CFC417AB