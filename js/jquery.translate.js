  /**
   * @file jquery.translate.js
   * @brief jQuery plugin to translate text in the client side.
   * @author Manuel Fernandes
   * @site
   * @version 0.9
   * @license MIT license <http://www.opensource.org/licenses/MIT>
   *
   * translate.js is a jQuery plugin to translate text in the client side.
   *
   */

   (function($) {
    $.fn.translate = function(options) {

      var that = this; //a reference to ourselves

      var settings = {
        css: "trn",
        lang: "en"
        /*,
      t: {
        "translate": {
          pt: "tradução",
          br: "tradução"
        }
      }*/
      };
      settings = $.extend(settings, options || {});
      if (settings.css.lastIndexOf(".", 0) !== 0) //doesn't start with '.'
        settings.css = "." + settings.css;

      var t = settings.t;

      //public methods
      this.lang = function(l) {
        if (l) {
          settings.lang = l;
          this.translate(settings); //translate everything
        }

        return settings.lang;
      };


    //   this.get = function(index) {
    //     var res = index;

    this.get = function(index) {
        var res = index;

        // not pretty but more functional
        try {
            if (t[index]){
                res = t[index][settings.lang]
            }else if(t[index.toLowerCase()]){
                res = t[index.toLowerCase()][settings.lang]
            }else{
                return index
            } 
        } catch (error) {
            
        }


        // try {
        //   res = t[index][settings.lang];
        // } catch (err) {
        //   //not found, return index
        //   return index;
        // }

        if (res) return res;
        else return index;
      };

      this.g = this.get;



      //main
      this.find(settings.css).each(function(i) {
        var $this = $(this);

        var trn_key = $this.attr("data-trn-key");
        if (!trn_key) {
          trn_key = $this.html();
          $this.attr("data-trn-key", trn_key); //store key for next time
        }

        var trn_value = $this.attr("data-trn-value"); // Translate attribute value="" (e.g = submit button)
        if (!trn_value) {
           trn_value = $this.val();
        $this.attr("data-trn-value", trn_value);   //store key for next time
       }
       
        var trn_holder = $this.attr("data-trn-holder"); // Translate attribute placeholder="" (e.g = input text field)
        if (!trn_holder) {
           trn_holder = $(this).data("placeholder");
        $this.attr("data-trn-holder", trn_holder);   //store key for next time
       }

        $this.html(that.get(trn_key)); // plain text html
        $this.val(that.get(trn_value)); // attribute value
        $(this).attr("placeholder", that.get(trn_holder)); // attribute placeholder
      });


      return this;



    };
  })(jQuery);
  

//dizionario per aggiungere parole
var dict = {
    "bookings": {
        en: "Bookings",
        it: "Prenotazioni",
        es: "Reservaciones"
    },
    "availability": {
        en: "Availability",
        it: "Disponibilità",
        es: "Disponibilidad"
    },
    "Login": {
        en: "Login",
        it: "Accedi",
        es: "Acceso"
    },
    "Logout": {
        en: "Logout",
        it: "Esci",
        es: "Salir"
    },
    "loading": {
        en: "loading",
        it: "caricamento",
        es: "cargando"
    },
    "Language": {
        en: "Language",
        it: "Lingua",
        es: "Idioma"
    },
    "email successfully sent!": {
        en: "email successfully sent!",
        it: "email inviata con successo!",
        es: ""
    },
    "click to reset password!": {
        en: "click to reset password!",
        it: "clicca per reimpostare la password!",
        es: ""
    }, 
    "Settings": {
        en: "Settings",
        it: "Impostazioni",
        es: "Ajustes"
    },
    "january": {
        en: "january",
        it: "gennaio",
        es: "enero"
    },
    "february": {
        en: "february",
        it: "febbraio",
        es: "febrero"
    },
    "march": {
        en: "march",
        it: "marzo",
        es: "marzo"
    },
    "april": {
        en: "april",
        it: "aprile",
        es: "abril"
    },
    "may": {
        en: "may",
        it: "maggio",
        es: "mayo"
    },
    "june": {
        en: "june",
        it: "giugno",
        es: "junio"
    },
    "july": {
        en: "july",
        it: "luglio",
        es: "julio"
    },
    "august": {
        en: "august",
        it: "agosto",
        es: "agosto"
    },
    "september": {
        en: "september",
        it: "settembre",
        es: "septiembre"
    },
    "october": {
        en: "october",
        it: "ottobre",
        es: "octubre"
    },
    "november": {
        en: "november",
        it: "novembre",
        es: "noviembre"
    },
    "december": {
        en: "december",
        it: "dicembre",
        es: "diciembre"
    },
    "FILTER BY": {
        en: "FILTER BY",
        it: "FILTRA PER",
        es: "FILTRADO POR"
    },
    "search": {
        en: "Search",
        it: "Cerca",
        es: "ajustes"
    },
    searchfield: { 
        en: "Search Bookings",
        it: "Cerca Prenotazioni",
        es: "ajustes"
      },
    "all channels": {
        en: "ALL CHANNELS",
        it: "TUTTI I CANALI",
        es: "ajustes"
    },
    "from": {
        en: "from",
        it: "da",
        es: "ajustes"
    },
    "to": {
        en: "to",
        it: "a",
        es: "ajustes"
    },
    "confirmed booking": {
        en: "confirmed booking",
        it: "prenotazione effettuata",
        es: "ajustes"
    },
    "arrival": {
        en: "arrival",
        it: "arrivo",
        es: "ajustes"
    },
    "departure": {
        en: "departure",
        it: "partenza",
        es: "ajustes"
    },
    "existing": {
        en: "existing",
        it: "presenza",
        es: "ajustes"
    },
    "deleted": {
        en: "Deleted",
        it: "Eliminate",
        es: "ajustes"
    }
  }