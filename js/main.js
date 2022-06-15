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

// LOGIN
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
    profilepic = "https://images.theconversation.com/files/443350/original/file-20220131-15-1ndq1m6.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C3354%2C2464&q=45&auto=format&w=926&fit=clip";//perchè le immagini risiedono su protocollo http
    for (let index = 0; index < document.getElementsByClassName("profilepic").length; index++) {
      document.getElementsByClassName("profilepic")[index].src = profilepic;
    }
  } catch (error) {}
}
function findCrossCookies() {
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
      if (!json.hasOwnProperty('error'))
      {
        id = json.id;
        nome = json.nome + ' ' + json.cognome;
        email = json.email;
        profilepic = "https://iperbooking.cristiano/"+json.foto;
        profilepic = "https://images.theconversation.com/files/443350/original/file-20220131-15-1ndq1m6.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C3354%2C2464&q=45&auto=format&w=926&fit=clip";//perchè le immagini risiedono su protocollo http
        if(!location.pathname.includes("index.html"))
          location.href="index.html";
      }
      else
      {   //  PER FARE LA GRAFICA DISABILITARE
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