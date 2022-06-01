// attributes
let id;

window.onload = () => {
    var attributes = location.href.split('?');
    var attribute = attributes[1].split('=');
    id = attribute[1];
}

function Prenotazione(params) {
    var url = site+""; //CHIEDERE AJAX
    let xhrprenotazione = new XMLHttpRequest();
    xhrprenotazione.withCredentials = true;
    xhrprenotazione.open("GET", url, true);
    xhrprenotazione.send();
    xhrprenotazione.onload = handlePrenotazioneResponse; 
}
function handlePrenotazioneResponse() {
    if(this.status==200)
    {

    }
}
