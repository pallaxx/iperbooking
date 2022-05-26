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
        if(location.href=="https://site.test/MobileApp/login.html")
          location.href="index.html";
      }
      else
      {   //  PER FARE LA GRAFICA DISABILITARE
        if(location.href!="https://site.test/MobileApp/login.html")
        location.href="login.html";
      }
    } catch(error){
    }
  }
}
//       credenziali di prova
// email: alex.mazzoni17@gmail.com
// pdw: Test123456



// ------ prenotazione page --------------------------------------------------------------------------------------------------------------
//AJAX per le prenotazioni
function showFilter() {
  
}

function ElencoPrenotazioni() {
    //suddivisione di ogni filtro
    let codice = document.getElementById("prenotazioni_search").value; //filtra per codice o nome (un po di tutto)
    let canale = "0"; // se 0 prende tutto (esempio di canali. (Agoda, Adriatico, CRM, Booking.com))
    let data_partenza = ""; //data di partenza
    let data_arrivo = ""; //data di arrivo
    let  filtradataper = ""; //prenotazione, partenza, arrivo, presenza
    var url = site+"/ajax/proxy.cfm?action=prenotazione.cerca&codice="+codice+"&canale="+canale+"&dal="+data_partenza+"&al="+data_arrivo+"&filtroData="+filtradataper+"&page="+pagenumber+"&pageSize=10&sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdir%5D=desc&_=1653313538581";
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
      maxpages = json.total;
      var row="";
      for (let index = 0; index < json.count; index++) {
        row += '<div class="prenotazione" onclick="RedirectPrenotazione('+json.data[index].id+'">';
        row += '<div class="dataprenotazione">'+ stampaData(json.data[index].dataPrenotazione) + ' ' + json.data[index].orarioPrenotazione +'</div>';
        row += '<div class="cliente">'+json.data[index].cliente+'</div>';
        row += '<div class="camere"> <div class="camere-group">'; //QUANTE CAMERE SONO
        row += '<div class="testo">'+json.data[index].quantita.slice(0, 1)+'</div><div class="icona"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/><path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/></svg></div>';
        row += '</div> </div>';
        row += '<div class="canale">'+json.data[index].canale+'</div>';
        row += '<div class="anno">'+stampaGiorno(json.data[index].dataPrenotazione)+'</div>';
        row += '<div class="periodo">' + stampaDataNoAnno(json.data[index].partenza) +' - '+ stampaDataNoAnno(json.data[index].arrivo) + '</div>';
        row += '<div class="notti"> <div class="notti-group">'; //QUANTE CAMERE SONO
        row += '<div class="icona"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"></path></svg></div><div class="testo">'+json.data[index].notti+'</div>';
        row += '</div> </div>';
        row += '</div>';
      }
      // if(pagenumber==1)
      //   row += '<td></td>';
      // else
      //   row += '<td onclick="previousPage()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg></td>';
      
      // row += '<td>'+pagenumber+'</td>';
      
      // if(pagenumber==maxpages)
      //   row += '<td></td>';
      // else
      //   row += '<td onclick="nextPage()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg></td>';
      // row += '</tr>';
      document.getElementById("elenco").innerHTML = row;
    
    }catch(error) {}
  }
}
function RedirectPrenotazione(codice) {
  
}
function nextPage() {
  pagenumber++;
  document.getElementById("elenco").innerHTML = '';
  ElencoPrenotazioni();
}
function previousPage() {
  pagenumber--;
  document.getElementById("elenco").innerHTML = '';
  ElencoPrenotazioni();
}

//20220525 anno mese giorno
function stampaData(stringadata) {return stringadata.slice(6, 8)+'/'+stringadata.slice(4, 6)+'/'+stringadata.slice(2, 4);} //stampa 23/01/2022
function stampaDataNoAnno(stringadata) {return stringadata.slice(6, 9)+'/'+stringadata.slice(4, 6)} //stampa 23/01
function stampaGiorno(stringadata) {return arraygiorni[parseInt(stringadata.slice(4, 6))+1]} //stampa tipo gennaio dato 01 (stringa)



// ------ user page --------------------------------------------------------------------------------------------------------------
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



// ------ show/hide pages --------------------------------------------------------------------------------------------------------------
viewHome(); //appena lO script viene caricato la pagina mostra la home

function viewHome() { //pagona centrale
  clearPages();
  document.getElementById("navbar_home").classList.add("active");
  document.getElementById("home").style.display = '';
}
function viewUser() { //pagina che si apre cliccando l'icona (nella home)
  clearPages();
  document.getElementById("user").classList.add("active");
  document.getElementById("user").style.display = '';

  // Update
  document.getElementById("bigprofilepic").src = profilepic;
  document.getElementById("user_nome").innerHTML = nome;
  document.getElementById("user_email").value = email;
  document.getElementById("user_sites").innerHTML = "<a class='h4' href='https://backoffice.iperbooking.cristiano/'>backoffice.iperbooking.cristiano</a><br><a class='h4' href='https://www.google.com'>GOOGLE</a>";
}

function viewPrenotazioni() { //pagina tutta a sinistra (la chiave)
  clearPages();
  document.getElementById("navbar_prenotazioni").classList.add("active");
  document.getElementById("prenotazioni").style.display = '';
  ElencoPrenotazioni();
}
function viewCalendar() { //pagina tutta a sinistra (la chiave)
  clearPages();
  document.getElementById("navbar_calendar").classList.add("active");
  document.getElementById("calendar").style.display = '';
}
function viewApple() { //pagina tutta a sinistra (la chiave)
  clearPages();
  document.getElementById("navbar_apple").classList.add("active");
  document.getElementById("apple").style.display = '';
}
function viewSettings() { //pagina tutta a sinistra (la chiave)
  clearPages();
  document.getElementById("navbar_settings").classList.add("active");
  document.getElementById("settings").style.display = '';
}

function clearPages() {
  document.getElementById("home").style.display = 'none';
  document.getElementById("navbar_home").classList.remove("active");
  document.getElementById("user").style.display = 'none';

  document.getElementById("prenotazioni").style.display = 'none';
  document.getElementById("navbar_prenotazioni").classList.remove("active");

  document.getElementById("calendar").style.display = 'none';
  document.getElementById("navbar_calendar").classList.remove("active");

  document.getElementById("apple").style.display = 'none';
  document.getElementById("navbar_apple").classList.remove("active");

  document.getElementById("settings").style.display = 'none';
  document.getElementById("navbar_settings").classList.remove("active");
}