var site = 'https://backoffice.iperbooking.cristiano/';
var nome, email, profilepic; //info user

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
        if(location.href=="https://site.test/MobileApp/login.html")
          location.href="index.html";
      }
      else
      {   //  PER FARE LA GRAFICA DISABILITARLO
        // if(location.href!="https://site.test/MobileApp/login.html")
        // location.href="login.html";
      }
    } catch(error){
    }
  }
}

//         credenziali
// email: alex.mazzoni17@gmail.com
// pdw: Test123456


// PRENOTAZIONI PAGE
//AJAX per le prenotazioni
function ElencoPrenotazioni() {
  //suddivisione di ogni fottuto filtro
  let codice = ""; //filtra per codice o nome (un po di tutto)
  let canale = "0"; // se 0 prende tutto (esempio di canali. (Agoda, Adriatico, CRM, Booking.com))
  let data_partenza = ""; //data di partenza
  let data_arrivo = ""; //data di arrivo
  let  filtradataper = ""; //prenotazione, partenza, arrivo, presenza
  var url = site+"/ajax/proxy.cfm?action=prenotazione.cerca&codice="+codice+"&canale="+canale+"&dal="+data_partenza+"&al="+data_arrivo+"&filtroData="+filtradataper+"&page=1&pageSize=20&sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdir%5D=desc&_=1653313538581";
  let xhrfindcookies = new XMLHttpRequest();
  xhrfindcookies.withCredentials = true;
  xhrfindcookies.open("GET", url, true);
  xhrfindcookies.send();
  xhrfindcookies.onload = handleElencoPrenotazioniResponse;
} function handleElencoPrenotazioniResponse() {
  if(this.status==200)
  {
    try { //costruire la tabella
      let json = JSON.parse(this.responseText);
      
    }catch(error) {}
  }
}

// USER ICON - PAGE
//copia l'email toccandola
function copy(field) { navigator.clipboard.writeText(field); }

//AJAX per sloggare
function Logout() {
  var url = site+"?event=logout";
  let xhrfindcookies = new XMLHttpRequest();
  xhrfindcookies.withCredentials = true;
  xhrfindcookies.open("GET", url, true);
  xhrfindcookies.send();
  xhrfindcookies.onload = handleLogoutResponse;
} function handleLogoutResponse() {
  if(this.status==200)
    findCrossCookies();
}

// HTML "AJAX"
viewHome(); //appena lO script viene caricato la pagina mostra la dashboard

function viewHome() {
  document.getElementById("dashboard").style.display = '';
  document.getElementById("prenotazioni").style.display = 'none';
  document.getElementById("user").style.display = 'none';
}
function viewPrenotazioni() {
  document.getElementById("dashboard").style.display = 'none';
  document.getElementById("prenotazioni").style.display = '';
  document.getElementById("user").style.display = 'none';

  ElencoPrenotazioni();
}
function viewUser() {
  document.getElementById("dashboard").style.display = 'none';
  document.getElementById("prenotazioni").style.display = 'none';
  document.getElementById("user").style.display = '';

  // Update
  document.getElementById("bigprofilepic").src = profilepic;
  document.getElementById("user_nome").innerHTML = nome;
  document.getElementById("user_email").value = email;
  document.getElementById("user_sites").innerHTML = "<a class='h4' href='https://backoffice.iperbooking.cristiano/'>backoffice.iperbooking.cristiano</a><br><a class='h4' href='https://www.google.com'>GOOGLE</a>";
}