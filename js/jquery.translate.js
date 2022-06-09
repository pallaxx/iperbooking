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
        it: "Disponibilità"
    },
    "Login": {
        en: "Login",
        it: "Accedi"
    },
    "Logout": {
        en: "Logout",
        it: "Disconnettiti"
    },
    "loading": {
        en: "loading",
        it: "caricamento"
    },
    "Language": {
        en: "Language",
        it: "Lingua"
    },
    "Settings": {
        en: "Settings",
        it: "Impostazioni"
    },
    "january": {
        en: "january",
        it: "gennaio"
    },
    "february": {
        en: "february",
        it: "febbraio"
    },
    "march": {
        en: "march",
        it: "marzo"
    },
    "april": {
        en: "april",
        it: "aprile"
    },
    "may": {
        en: "may",
        it: "maggio"
    },
    "june": {
        en: "june",
        it: "giugno"
    },
    "july": {
        en: "july",
        it: "luglio"
    },
    "august": {
        en: "august",
        it: "agosto"
    },
    "september": {
        en: "september",
        it: "settembre"
    },
    "october": {
        en: "october",
        it: "ottobre"
    },
    "november": {
        en: "november",
        it: "novembre"
    },
    "december": {
        en: "december",
        it: "dicembre"
    },
    "FILTER BY": {
        en: "FILTER BY",
        it: "FILTRA PER"
    },
    "search": {
        en: "Search",
        it: "Cerca"
    },
    searchfield: { 
        en: "Search Bookings",
        it: "Cerca Prenotazioni",
      },
    "all channels": {
        en: "ALL CHANNELS",
        it: "TUTTI I CANALI"
    },
    "from": {
        en: "from",
        it: "da"
    },
    "to": {
        en: "to",
        it: "a"
    },
    "confirmed booking": {
        en: "confirmed booking",
        it: "prenotazione effettuata"
    },
    "arrival": {
        en: "arrival",
        it: "arrivo"
    },
    "departure": {
        en: "departure",
        it: "partenza"
    },
    "existing": {
        en: "existing",
        it: "presenza"
    },
    "deleted": {
        en: "Deleted",
        it: "Eliminate"
    }
  }