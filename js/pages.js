viewLang();

// PRENOTAZIONI
var pagenumber=1,maxpages; //page prenotazioni
const arraygiorni = ["january","february","march","april","may","june","july","august","september","october","november","december"];

// ------ user page --------------------------------------------------------------------------------------------------------------
function viewLang() {
  var tmp="";
  for (let index = 0; index < arraylanguage.length; index++) {
    tmp += "<span>"+arraylanguage[index].toUpperCase()+"</span><br>";
  }
  document.getElementById('lang').innerHTML = tmp;
}

function BackLang() {
  if(multipleindex>0)
  {
    multipleindex--;
    setLang();
  }
  else
  {
    multipleindex=arraylanguage.length-1;
    setLang();
  }
}
function forwardLang() {
  if(multipleindex < arraylanguage.length-1)
  {
    multipleindex++;
    setLang();
  }
  else
  {
    multipleindex=0;
    setLang();
  }
}
function setLang() {
  var lang = document.getElementById('lang');
  nowheight=staticheight*multipleindex;
  lang.scrollTo(0,nowheight);
}

//AJAX per sloggare
function Logout() {
  var url = site+"?event=logout";
  let xhrlogout = new XMLHttpRequest();
  xhrlogout.withCredentials = true;
  xhrlogout.open("GET", url, true);
  xhrlogout.send();
  xhrlogout.onload = handleLogoutResponse;
} function handleLogoutResponse() {
  if(this.status==200)
    findCrossCookies();
}

// ------ prenotazione page --------------------------------------------------------------------------------------------------------------
//AJAX per le prenotazioni

function elencoPrenotazioni() {
    //suddivisione di ogni filtro
    let codice = document.getElementById("prenotazioni_search").value; //filtra per codice o nome (un po di tutto)
    let canale = document.getElementById('filter_canali').value; // se 0 prende tutto (esempio di canali. (Agoda, Adriatico, CRM, Booking.com))
    let data_arrivo = encodeURIComponent(document.getElementById('filter_arrivo').value); //data di arrivo
    let data_partenza = encodeURIComponent(document.getElementById('filter_partenza').value); //data di partenza
    let filtradataper = document.getElementById('filter_filtradata').value; //prenotazione, partenza, arrivo, presenza
    let filtroeliminate = "";
    if(document.getElementById("filter_filtraeliminate").checked)
      filtroeliminate = "&filtroEliminate=I";
    var url = site+"/ajax/proxy.cfm?action=prenotazione.cerca&codice="+codice+"&canale="+canale+"&dal="+data_partenza+"&al="+data_arrivo+"&filtroData="+filtradataper+filtroeliminate+"&page="+pagenumber+"&pageSize=10&sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdir%5D=desc&_=1653313538581";
    let xhrelencop = new XMLHttpRequest();
    xhrelencop.withCredentials = true;
    xhrelencop.open("GET", url, true);
    xhrelencop.send();
    xhrelencop.onload = handleElencoPrenotazioniResponse; 
} function handleElencoPrenotazioniResponse() {
  if(this.status==200)
  {
    let json = JSON.parse(this.responseText);
    maxpages = Math.ceil(json.total/10);  
    var row="";
    for (let index = 0; index < json.count; index++) {
      if(json.data[index].eliminata)          //CLICCANDO IN QUELLA PRENOTAZIONE RICHIEDE TRAMITE L'ID LA PRNOTAZIONE E STAMPA UNA PAGINA
        row += '<div class="prenotazione eliminata" onclick="redirectPrenotazione('+json.data[index].id+')">';
      else
        row += '<div class="prenotazione" onclick="redirectPrenotazione('+json.data[index].id+')">';
       
       row += '<div class="dataprenotazione">'+ stampaData(json.data[index].dataPrenotazione) + ' ' + json.data[index].orarioPrenotazione +'</div>'; //DATA DI PRENOTAZIONE
       row += '<div class="cliente">'+json.data[index].cliente+'</div>'; //NOME COGNOME CLIENTE
       row += '<div class="canale">'+json.data[index].sito+'</div>';   //CANALE DELLA PRENOTAZIONE
       row += '<div class="stagione_periodo">'; // STAGIONE E PERIODO
         row += '<div class="stagione-group trn">'+stampaGiorno(json.data[index].arrivo)+'</div>';
         row += '<div class="periodo-group">' + stampaDataNoAnno(json.data[index].arrivo) +' - '+ stampaDataNoAnno(json.data[index].partenza) + '</div>';
       row += '</div>';
       row += '<div class="camere_notti">'; // CAMERE E NOTTI
        row += '<div class="camere-group">'; // CAMERE
          row += '<div class="icona"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/><path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/></svg></div>'; 
          row += '<div class="testo">'+json.data[index].quantita.slice(0, 1)+'</div>'; 
        row += '</div>'; 
        row += '<div class="notti-group">'; // NOTTI
          row += '<div class="icona"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"></path></svg></div>'; 
          row += '<div class="testo">'+json.data[index].notti+'</div>'; 
        row += '</div>'; 
       row += '</div>';
      row += '</div>';
    }

      // INDICE PER SCORRERE LE PAGINE
    row += '<div class="indice">';
      
      if(pagenumber==1)
        row += '<div class="arrow-left">';
      else
        row += '<div class="arrow-left" onclick="previousPage()">';
        row += '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>'; 
      row += '</div>'; 
      row += '<div class="number">'+pagenumber+'</div>';
      
      if(pagenumber>=maxpages)
        row += '<div class="arrow-right">';
      else
        row += '<div class="arrow-right" onclick="nextPage()">';
      
      row += '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>'; 
      row += '</div>'; 
    row += '</div>'; 
    
    document.getElementById("elenco").innerHTML = row;
  }
}
function redirectPrenotazione(codice) {
  location.href="prenotazioni.html?Id="+codice;
}
function nextPage() {
  pagenumber++;
  document.getElementById("elenco").innerHTML = '<div class="loading"><img src="images/loading-page.gif" alt=""></div>';
  elencoPrenotazioni();
}
function previousPage() {
  pagenumber--;
  document.getElementById("elenco").innerHTML = '<div class="loading"><img src="images/loading-page.gif" alt=""></div>';
  elencoPrenotazioni();
}

//20220525 anno mese giorno
function stampaData(stringadata) {return stringadata.slice(6, 8)+'/'+stringadata.slice(4, 6)+'/'+stringadata.slice(2, 4);} //stampa 23/01/2022
function stampaDataNoAnno(stringadata) {return stringadata.slice(6, 9)+'/'+stringadata.slice(4, 6)} //stampa 23/01
function stampaGiorno(stringadata) {return arraygiorni[parseInt(stringadata.slice(4, 6))-1]} //stampa tipo gennaio dato 01 (stringa)



// ------ settings page --------------------------------------------------------------------------------------------------------------
//AJAX per l'elenco di strutture dell'utente
function elencoStrutture() {
  var url = site+"/ajax/proxy.cfm?action=utente.listHotel&IdUtente="+id+"&skip=0&page=1";
  let xhrelencos = new XMLHttpRequest();
  xhrelencos.withCredentials = true;
  xhrelencos.open("GET", url, true);
  xhrelencos.send();
  xhrelencos.onload = handleElencoStruttureResponse; 
} function handleElencoStruttureResponse() {
if(this.status==200)
{
  let json = JSON.parse(this.responseText);
  if(json.count>1)
  {


    document.getElementById("").innerHTML = input;
  }
}
}



// ------ show/hide pages --------------------------------------------------------------------------------------------------------------
viewHome(); //appena lo script viene caricato la pagina mostra la home
document.getElementById("navbar").style.display = 'none';
viewLoading('3'); //con un caricamento di 3 secondi

function viewHome() { //pagona centrale
  clearPages();
  document.getElementById("navbar_home").classList.add("active");
  document.getElementById("home").style.display = '';
}

function viewPrenotazioni() { //pagina tutta a sinistra (la chiave)
  clearPages();
  document.getElementById("navbar_prenotazioni").classList.add("active");
  document.getElementById("prenotazioni").style.display = '';
  document.getElementById("filter").style.display = 'none';
  elencoPrenotazioni();
}
function showFilter() {
  document.getElementById("filter").style.display = '';
  for (let index = 0; index < document.getElementsByClassName("page").length; index++){document.getElementsByClassName("page")[index].style.opacity = 0.5;}
  document.getElementById("filter").style.opacity = 1;
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
  document.getElementById("navbar").style.opacity = 1;
  for (let index = 0; index < document.getElementsByClassName("page").length; index++){document.getElementsByClassName("page")[index].style.opacity = 1;}
  document.getElementById("navbar").style.display = '';
  document.getElementById("loading").style.display = 'none';

  document.getElementById("home").style.display = 'none';
  document.getElementById("navbar_home").classList.remove("active");
  document.getElementById("user").style.display = 'none';

  document.getElementById("prenotazioni").style.display = 'none';
  document.getElementById("navbar_prenotazioni").classList.remove("active");
  document.getElementById("filter").style.display = 'none';

  document.getElementById("calendar").style.display = 'none';
  document.getElementById("navbar_calendar").classList.remove("active");

  document.getElementById("apple").style.display = 'none';
  document.getElementById("navbar_apple").classList.remove("active");

  document.getElementById("settings").style.display = 'none';
  document.getElementById("navbar_settings").classList.remove("active");
}

function viewLoading(durata) { //durata di quanto deve caricare
  document.getElementById("loading").style.display = '';
  document.getElementById("loading_bar").style.animationDuration = durata+'s';
  document.getElementById("loading_bar").style.animationPlayState = "running";
  setTimeout(stopLoading, parseInt(durata*1000));
}function stopLoading() {
  document.getElementById("loading_bar").style.animationPlayState = "paused";
  document.getElementById("loading").style.display = 'none';
  document.getElementById("navbar").style.display = '';
}

function viewUser() { //pagina che si apre cliccando l'icona (nella home)
  document.getElementById("user").style.display = '';

  // Update
  document.getElementById("bigprofilepic").src = profilepic;
  document.getElementById("user_nome").innerHTML = nome;
  document.getElementById("user_email").value = email;
  setLang();
}
function closeUser() {
  document.getElementById("user").style.display = 'none';
  setCookieLang();
}

function setCookieLang() {
  const d = new Date();
  d.setTime(d.getTime() + (30*24*60*60*1000));
  document.cookie = langcookiename+"="+arraylanguage[multipleindex]+"; expires="+ d.toUTCString()+"; path=/";
  translator.lang(arraylanguage[multipleindex]); //change to any language
}