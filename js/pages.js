viewLang();

// ------ user page --------------------------------------------------------------------------------------------------------------
function cambiaPsw() {
  var url = site+"/ajax/proxy.cfm?action=utente.inviaEmailModificaPassword&idutente="+id;
  let xhrcambiapsw = new XMLHttpRequest();
  xhrcambiapsw.open("GET", url, true);
  xhrcambiapsw.send();
  xhrcambiapsw.onload = handleCambiaPswResponse;
}
function handleCambiaPswResponse() {
  if(this.status==200)
  {
    document.getElementById("user_psw").onclick = 0;
    document.getElementById("user_pswspan").innerHTML = "email successfully sent!";
  }
}

function viewLang() {
  var tmp="";
  for (let index = 0; index < arraylanguage.length; index++) {
    tmp += "<span>"+arraylanguage[index].toUpperCase()+"</span><br>";
  }
  document.getElementById('user_lang').innerHTML = tmp;
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
  var lang = document.getElementById('user_lang');
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
// variabili
var pagenumber=1,maxpages; //page prenotazioni
const arraymonth = ["january","february","march","april","may","june","july","august","september","october","november","december"];
const arrayndays = [  31,       28,       31,       30,    31,    30,   31,     31,       30,       31,         30,         31];

//AJAX per l'elenco delle prenotazioni
function elencoPrenotazioni() {
    //suddivisione di ogni filtro
    let codice = document.getElementById("bookings_search").value; //filtra per codice o nome (un po di tutto)
    let canale = document.getElementById('bookings_filter-channels').value; // se 0 prende tutto (esempio di canali. (Agoda, Adriatico, CRM, Booking.com))
    let data_arrivo = encodeURIComponent(document.getElementById('bookings_filter-from').value); //data di arrivo
    let data_partenza = encodeURIComponent(document.getElementById('bookings_filter-to').value); //data di partenza
    let filtradataper = document.getElementById('bookings_filter-date').value; //prenotazione, partenza, arrivo, presenza
    let filtroeliminate = "";
    if(document.getElementById("bookings_filter-deleted").checked)
      filtroeliminate = "&filtroEliminate=I";
    
      // inizio richiesta
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
    
    document.getElementById("bookings_list").innerHTML = row;
  }
}
function redirectBooking(codice) {
  location.href="prenotazioni.html?Id="+codice;
}
function nextPage() {
  pagenumber++;
  document.getElementById("bookings_list").innerHTML = '<div class="loading"><img src="images/loading-page.gif" alt=""></div>';
  elencoPrenotazioni();
}
function previousPage() {
  pagenumber--;
  document.getElementById("bookings_list").innerHTML = '<div class="loading"><img src="images/loading-page.gif" alt=""></div>';
  elencoPrenotazioni();
}

//20220525 anno mese giorno
function stampaData(stringadata) {return stringadata.slice(6, 8)+'/'+stringadata.slice(4, 6)+'/'+stringadata.slice(2, 4);} //stampa 23/01/2022
function stampaDataNoAnno(stringadata) {return stringadata.slice(6, 9)+'/'+stringadata.slice(4, 6)} //stampa 23/01
function stampaGiorno(stringadata) {return arraymonth[parseInt(stringadata.slice(4, 6))-1]} //stampa tipo gennaio dato 01 (stringa)



// ------ disponibilita page --------------------------------------------------------------------------------------------------------------
let arrayUTCDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let gruppi = [];
const data1 = new Date(); //data periodo
const data2 = new Date(); //data periodo
const datacalendario = new Date();//data calendario visivo
let ndays; //numero giorni in un mese
let data1id = "";
let data2id = "";
cambiaPeriodo();


//AJAX per l'elenco dei gruppi creati
function elencoGruppi() {
  var url = site+"/ajax/proxy.cfm?action=disponibilita.elencoGruppi";
  let xhrelencog = new XMLHttpRequest();
  xhrelencog.withCredentials = true;
  xhrelencog.open("GET", url, true);
  xhrelencog.send();
  xhrelencog.onload = handleElencoGruppiResponse; 
} function handleElencoGruppiResponse() {
  if(this.status==200)
  {
    let json = JSON.parse(this.responseText);
    for (let index = 0; index < json.count; index++) {
      let gruppo = {
          "id": json.data[index].id,
          "name": json.data[index].nome,
          "color": json.data[index].colore
        };
      gruppi.push(gruppo);
    }
  }
}

function cambiaPeriodo() {
  //GRUPPI
  let html='<option value="all groups"/>';
  html+='<option value="gruppo prova"/>';
  for (let index = 0; index < gruppi.length; index++) {
    html += '<option value="'+gruppi[index].name+'/>';
  }
  document.getElementById('availability_grouplist').innerHTML = html;

  data1id = data1.getDate()+'/'+data1.getMonth()+'/'+data1.getFullYear();
  calcolaData2();

  document.getElementById('availability_period-from').innerHTML = addZero(data1.getDate())+'/'+addZero(data1.getMonth()+1);
  document.getElementById('availability_period-to').innerHTML = addZero(data2.getDate())+'/'+addZero(data2.getMonth()+1);

  for (let index = 0; index < 7; index++)
  {
    const tmp = new Date();
    tmp.setMonth(data1.getMonth());
    tmp.setDate(data1.getDate()+index);
    if(tmp.getUTCDay()==0)
      document.getElementById('availability_grid-period-'+(index+1)).innerHTML = '<span class="day">'+addZero(tmp.getDate())+'/'+addZero(tmp.getMonth()+1)+'</span><span class="weekday trn" style="color:#F00;">'+arrayUTCDay[tmp.getUTCDay()]+'</span>';
    else
      document.getElementById('availability_grid-period-'+(index+1)).innerHTML = '<span class="day">'+addZero(tmp.getDate())+'/'+addZero(tmp.getMonth()+1)+'</span><span class="weekday trn">'+arrayUTCDay[tmp.getUTCDay()]+'</span>';
    
    document.getElementById('availability_grid-period-'+(index+1)).setAttribute('data-trn-key', arrayUTCDay[data1.getUTCDay()]);
  }
  loadLang();
  richiediDisponibilita();
}
function previousPeriod() {
  data1.setDate(data1.getDate() - 7);
  cambiaPeriodo();
  costruisciCalendario();
}
function nextPeriod() {
  data1.setDate(data1.getDate() + 7);  
  cambiaPeriodo();
  costruisciCalendario();
}
function previousDay() {
  data1.setDate(data1.getDate() - 1);
  cambiaPeriodo();
  costruisciCalendario();
}
function nextDay() {
  data1.setDate(data1.getDate() + 1);
  cambiaPeriodo();
  costruisciCalendario();
}

function calcolaData2() {
  data2.setMonth(data1.getMonth());
  data2.setDate(data1.getDate() + 6);
  data2id = data2.getDate()+'/'+data2.getMonth()+'/'+data2.getFullYear();
}


function costruisciCalendario() {
  //calendario visualizzato
  let giorni = "";
  ndays = arrayndays[datacalendario.getMonth()];
  document.getElementById('availability_calendar-period-month').innerHTML = arraymonth[datacalendario.getMonth()];
  document.getElementById('availability_calendar-period-month').setAttribute('data-trn-key', arraymonth[datacalendario.getMonth()]);
  document.getElementById('availability_calendar-period-year').innerHTML = datacalendario.getFullYear();

  for (let index = 0; index < datacalendario.getUTCDay(); index++) {
    giorni += '<li></li>'; //giorni vuoti
  }
  if(datacalendario.getMonth()==1) //febbraio
  {
    if(datacalendario.getFullYear()%400==0 || datacalendario.getFullYear()%4==0 && !(datacalendario.getFullYear()%100==0))
    {
      ndays = 29;
    }
  }

  var flag = false;
  var flag2 = false;
  for (let index = 1; index <= ndays; index++) {
    let id = index+'/'+datacalendario.getMonth()+'/'+datacalendario.getFullYear();
    if(datacalendario.getMonth() > data1.getMonth() && datacalendario.getMonth() <= data2.getMonth() )
    {
      if(!flag2)
        flag = true;
    }
    if(id == data1id)
    {
      giorni += '<li id="'+id+'" class="active" onclick="selectData(this.id)">'+index+'</li>';
      flag=true;
    }
    else if(id == data2id)
    {
      giorni += '<li id="'+id+'" class="active" onclick="selectData(this.id)">'+index+'</li>';
      flag = false;
      flag2 = true;
    }
    else if(flag)
    {
      giorni += '<li id="'+id+'" class="striscione" onclick="selectData(this.id)">'+index+'</li>';
    }
    else
      giorni += '<li id="'+id+'" onclick="selectData(this.id)">'+index+'</li>';
  }
  document.getElementById('availability_calendar-days').innerHTML = giorni;
  loadLang();
}
function selectData(id) {
  let splitted = id.split('/');
  data1.setDate(splitted[0]);
  data1.setMonth(splitted[1]);
  data1.setFullYear(splitted[2]);
  cambiaPeriodo();
  costruisciCalendario();
}
function previousMonth() {
  datacalendario.setMonth(datacalendario.getMonth()-1);
  costruisciCalendario();
}
function nextMonth() {
  datacalendario.setMonth(datacalendario.getMonth()+1);
  costruisciCalendario();
}

function returnToPeriod() {
  datacalendario.setDate(data1.getDate());
  datacalendario.setMonth(data1.getMonth());
  datacalendario.setFullYear(data1.getFullYear());
  costruisciCalendario();
}

// function creaDatadDaId(dataid) { BOH
//   const datatmp = new Date();
//   let splitted = dataid.split('/');
//   datatmp.setFullYear(splitted[2]);
//   datatmp.setMonth(splitted[1]);
//   datatmp.setDate(splitted[0]);
//   return datatmp;
// }
function addZero(numero) { if(numero<10) return '0'+numero; else return numero; }

function hideCalendar() {
  document.getElementById('availability_calendar').style.display = 'none';
  document.getElementById('availability_period').onclick = viewCalendar;
  document.getElementById('availability_grid').style.display = '';
}

function viewCalendar() {
  document.getElementById('availability_header').style.display = '';
  document.getElementById('availability_calendar').style.display = '';
  document.getElementById('availability_period').onclick = hideCalendar;
  document.getElementById('availability_grid').style.display = 'none';
}

function selectGruppi() {
  document.getElementById('availability_accommodation-plans').style.display = 'none';
  for(let index=0 ; index < gruppi.length ; index++)
  {
    if(document.getElementById('calendar_gruppi').value == gruppi.name)
    {
      document.getElementById('availability_accommodation-plans').style.display = '';
      richiediDisponibilita();
      break;
    }
  }
}

function selectTrattamento(trattamento) {
  //0 all inclusive, 1 full board, 2 half board, 3 bed and breakfast , 4 room only, 5 apartment
  //0 all inclusive, 1 pensione completa, 2 mezza pensione, 3 pernottamento e colazione , 4 pernottamento, 5 appartamento
  document.getElementById('availability_grid-filter').style.display = 'none';
  var flag = false;
  if(!document.getElementById(trattamento).classList.contains('active'))
    flag=true;
  for (let index = 0; index < 6; index++)
    try {document.getElementById('accomodation_'+index).classList.remove('active'); } catch (error) {} 
  if(flag)
  {
    document.getElementById(trattamento).classList.add('active');
    document.getElementById('availability_grid-filter').style.display = '';
    richiediDisponibilita();
  }
}
function selectFilter(id) {
  var filter = document.getElementById(id).classList;
  if(filter.contains('active'))
    filter.remove('active');
  else
  {
    filter.add('active');
    richiediDisponibilita();
  }
}

function richiediDisponibilita() {
    //suddivisione di ogni filtro
    let payload="";
    //gruppi
    for (let index = 0; index < gruppi.lenght; index++) {
      if(document.getElementById('calendar_gruppi').value == gruppi[index].name)
        payload = 'gruppi='+gruppi[index].id+'&';
      else
        payload += 'gruppi='+gruppi[index].id+'&';
    }

    // inizio richiesta
    var url = site+"/ajax/proxy.cfm?action=disponibilita.grigliaContent";
    let xhrelencoa = new XMLHttpRequest();
    xhrelencoa.withCredentials = true;
    xhrelencoa.open("POST", url, true);
    xhrelencoa.send(payload+'dal='+decodeURIComponent(data1)+'&numeroGiorni=6');
    xhrelencoa.onload = handleElencoDisponibilitaResponse; 
} function handleElencoDisponibilitaResponse() {
  if(this.status==200)
  {
    let json = JSON.parse(this.responseText);
    //DOVREBBE ANDARE BISOGNA SOLO FILTRARE OGNI STAMPA IN BASE AI FILTRI MESSI
  }
}


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
    if(json.count>1) //DA FINIRE
    {

      document.getElementById("").innerHTML = input;
    }
  }
}



// ------ show/hide pages --------------------------------------------------------------------------------------------------------------
viewHome(); //appena lo script viene caricato la pagina mostra la home
// viewLoading('3'); //con un caricamento di 3 secondi

function viewHome() { //pagona centrale
  clearPages();
  document.getElementById("navbar_home").classList.add("active");
  document.getElementById("home").style.display = '';
}

function viewBookings() { //pagina tutta a sinistra (la chiave)
  clearPages();
  document.getElementById("navbar_bookings").classList.add("active");
  document.getElementById("bookings").style.display = '';
  document.getElementById("bookings_filter").style.display = 'none';
  elencoPrenotazioni();
}
function showBookingsFilter() {
  document.getElementById("bookings_filter").style.display = '';
  for (let index = 0; index < document.getElementsByClassName("page").length; index++){document.getElementsByClassName("page")[index].style.opacity = 0.5;}
  document.getElementById("bookings_filter").style.opacity = 1;
}

function viewAvailability() { //pagina tutta a sinistra (la chiave)
  clearPages();
  document.getElementById("navbar_availability").classList.add("active");
  document.getElementById("availability").style.display = '';
  
  costruisciCalendario();
  elencoGruppi();
}

function viewCRM() { //pagina tutta a sinistra (la chiave)
  clearPages();
  document.getElementById("navbar_crm").classList.add("active");
  document.getElementById("crm").style.display = '';
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

  document.getElementById("bookings").style.display = 'none';
  document.getElementById("navbar_bookings").classList.remove("active");
  document.getElementById("bookings_filter").style.display = 'none';

  document.getElementById("availability").style.display = 'none';
  document.getElementById("navbar_availability").classList.remove("active");

  document.getElementById("crm").style.display = 'none';
  document.getElementById("navbar_crm").classList.remove("active");

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

}

function viewUser() { //pagina che si apre cliccando l'icona (nella home)
  document.getElementById("user").style.display = '';

  // Update
  document.getElementById("user_bigprofilepic").src = profilepic;
  document.getElementById("user_nome").innerHTML = nome;
  document.getElementById("user_email").value = email;
  document.getElementById("user_psw").onclick = cambiaPsw;
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