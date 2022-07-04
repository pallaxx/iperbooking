//le richieste ajax sono state fatte sulla base di questo url
var site = 'https://backoffice.iperbooking.cristiano/';

// LINGUA
const staticheight = 24;
let nowheight=0, multipleindex=0;
const arraylanguage = ['en','it','es','fr','de','ru','zh'];
const langcookiename="language";
var translator = $('body').translate({lang: "en", t: dict}); //initialize dictionary in English
loadLang();
function loadLang() {
  let cookievalue = getCookie(langcookiename);
  if(cookievalue != "")
  {
    for (let index = 0; index < arraylanguage.length; index++) {
      if(arraylanguage[index]==cookievalue)
      {
        multipleindex = index;
      }
    }
    translator.lang(arraylanguage[multipleindex]); //change to any language
  }
}

// VARIABILI GENERALI DELL'UTENTE
var id; //id utente
var nome, email, profilepic; //page user

function serviceWorkerRegister() {
  'use strict';
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
}

window.onload = () => {
  //register the service worker (for pwa)
  serviceWorkerRegister();
  try {
    // check if user logged
    findCrossCookies();

    // navbar update
    profilepic = "images/iperbooking-icon-192.png";
    for (let index = 0; index < document.getElementsByClassName("profilepic").length; index++) { //carica le foto profilo in tutti gli elementi
      document.getElementsByClassName("profilepic")[index].src = profilepic;
    }
  } catch (error) {}
}
function findCrossCookies() { //cerca se ci sono dei cookie nel sito di iperbooking (per controllare se appunto effettivamente l'utente è loggato)
  var url = site+"ajax/proxy.cfm?action=utente.dettagli";
  let xhrfindcookies = new XMLHttpRequest();
  xhrfindcookies.withCredentials = true;
  xhrfindcookies.open("GET", url, true);
  xhrfindcookies.send();
  xhrfindcookies.onload = handleFindCrossCookiesResponse;
} function handleFindCrossCookiesResponse() {
  if(this.status==200)
  {
    try {
      let json = JSON.parse(this.responseText);
      if (!json.hasOwnProperty('error')) //se è loggato carica all'interno delle variabili le informazioni dell'utente come immagine del profilo nome cognome e email
      {
        id = json.id;
        nome = json.nome + ' ' + json.cognome;
        email = json.email;
        profilepic = "https://iperbooking.cristiano/"+json.foto; //qui non so che url ha bisogno l'immagine (bisognerebbe riadattarlo).
        profilepic = "images/iperbooking-icon-192.png";//fisso una immagine statica
        if(!location.pathname.includes("index.html"))
          location.href="index.html";
      }
      else //altrimenti se non è loggato ritona alla pagina di login
      { //il controllo serve poichè senno andrebbe sempre sulla pagina login.html 
        if(!location.pathname.includes("login.html")) //https://site.test/login.html oppure https://site.test/MobileApp/login.html
        location.href="login.html";
      }
    } catch(error){
    }
  }
}
//       credenziali di prova
// email: alex.mazzoni17@gmail.com
// pdw: Test123456



//manage cookie
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}