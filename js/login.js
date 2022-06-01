document.getElementById("form").style.display = '';
var requestcode;

function requestLogin() {
  document.getElementById("btnform").innerHTML = '<img src="images/loading-page.gif" alt="">';
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
        document.getElementById("btnform").innerHTML = '<div class="btn" id="btnlogin" onclick="requestAuthCode()"><span>Login</span></div>';
        requestcode = json.confirmationRequestCode;
      }
      else
        document.getElementById("loginmsg").innerHTML = json.messaggio;
    }catch(error) {}
  }
}

function requestAuthCode() {
  document.getElementById("btnform").innerHTML = '<img src="images/loading-page.gif" alt="">';
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
    {
      document.getElementById("loginmsg").innerHTML = json.messaggio;
      document.getElementById("btnform").innerHTML = '<div class="btn" id="btnlogin" onclick="requestAuthCode()"><span>Login</span></div>';
    }
  } 
}

// email: alex.mazzoni17@gmail.com
// pdw: Test123456
// http://backoffice.iperbooking.cristiano/?event=codiceLogin&req=96994004A2CEEA7C7A05CFF427533324CFC417AB

function hideForm()
{
  document.getElementById("form").style.display = 'none';
}