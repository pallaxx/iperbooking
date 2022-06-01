var site = 'https://backoffice.iperbooking.cristiano/';
var nome, email, profilepic; //page user
var pagenumber=1,maxpages; //page prenotazioni
const arraygiorni = ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];


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
    document.getElementById("profilepic").src = profilepic;
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
