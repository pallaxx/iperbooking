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
        es: "Reservaciones",
        fr: "Réservations",
        de: "Buchungen",
        ru: "Бронирование",
        zh: "预订"
    },
    "availability": {
        en: "Availability",
        it: "Disponibilità",
        es: "Disponibilidad",
        fr: "Disponibilité",
        de: "Verfügbarkeit",
        ru: "Доступность",
        zh: "可用性"
    },
    "Login": {
        en: "Login",
        it: "Accedi",
        es: "Acceso",
        fr: "Connexion",
        de: "Anmeldung",
        ru: "Авторизоваться",
        zh: "登录"
    },
    "Logout": {
        en: "Logout",
        it: "Esci",
        es: "Salir",
        fr: "Se déconnecter",
        de: "Ausloggen",
        ru: "Выйти",
        zh: "登出"
    },
    "loading": {
        en: "loading",
        it: "caricamento",
        es: "cargando",
        fr: "chargement en cours",
        de: "wird geladen",
        ru: "загрузка",
        zh: "加载"
    },
    "Language": {
        en: "Language",
        it: "Lingua",
        es: "Idioma",
        fr: "Langue",
        de: "Sprache",
        ru: "Язык",
        zh: "语"
    },
    "email successfully sent!": {
        en: "email successfully sent!",
        it: "email inviata con successo!",
        es: "correo electrónico enviado con éxito!",
        fr: "e-mail envoyé avec succès!",
        de: "e-mail erfolgreich versendet!",
        ru: "письмо успешно отправлено!",
        zh: "电子邮件已成功发送"
    },
    "click to reset password!": {
        en: "click to reset password!",
        it: "clicca per reimpostare la password!",
        es: "haga clic para restablecer la contraseña!",
        fr: "cliquez pour réinitialiser le mot de passe!",
        de: "klicken sie hier, um das passwort zurückzusetzen!",
        ru: "нажмите, чтобы сбросить пароль!",
        zh: "点击重置密码"
    }, 
    "Settings": {
        en: "Settings",
        it: "Impostazioni",
        es: "Ajustes",
        fr: "Réglages",
        de: "Einstellungen",
        ru: "Настройки",
        zh: "设置"
    },
    "january": {
        en: "January",
        it: "Gennaio",
        es: "Enero",
        fr: "Janvier",
        de: "Januar",
        ru: "январь",
        zh: "一月"
    },
    "february": {
        en: "February",
        it: "Febbraio",
        es: "Febrero",
        fr: "Février",
        de: "Februar",
        ru: "февраль",
        zh: "二月"
    },
    "march": {
        en: "March",
        it: "Marzo",
        es: "Marzo",
        fr: "Mars",
        de: "März",
        ru: "марш",
        zh: "行进"
    },
    "april": {
        en: "April",
        it: "Aprile",
        es: "Abril",
        fr: "Avril",
        de: "April",
        ru: "Aпреля",
        zh: "四月"
    },
    "may": {
        en: "May",
        it: "Maggio",
        es: "Mayo",
        fr: "Peut",
        de: "Kann",
        ru: "май",
        zh: "可能"
    },
    "june": {
        en: "June",
        it: "Giugno",
        es: "Junio",
        fr: "Juin",
        de: "Juni",
        ru: "июнь",
        zh: "六月"
    },
    "july": {
        en: "July",
        it: "Luglio",
        es: "Julio",
        fr: "Juillet",
        de: "Juli",
        ru: "июль",
        zh: "七月"
    },
    "august": {
        en: "August",
        it: "Agosto",
        es: "Agosto",
        fr: "Août",
        de: "August",
        ru: "Aвгуст",
        zh: "八月"
    },
    "september": {
        en: "September",
        it: "Settembre",
        es: "Septiembre",
        fr: "Septembre",
        de: "September",
        ru: "Cентябрь",
        zh: "九月"
    },
    "october": {
        en: "October",
        it: "Ottobre",
        es: "Octubre",
        fr: "Octobre",
        de: "Oktober",
        ru: "Oктябрь",
        zh: "十月"
    },
    "november": {
        en: "November",
        it: "Novembre",
        es: "Noviembre",
        fr: "Novembre",
        de: "November",
        ru: "ноябрь",
        zh: "十一月"
    },
    "december": {
        en: "December",
        it: "Dicembre",
        es: "Diciembre",
        fr: "Décembre",
        de: "Dezember",
        ru: "Декабрь",
        zh: "十二月"
    },
    "FILTER BY": {
        en: "FILTER BY",
        it: "FILTRA PER",
        es: "FILTRADO POR",
        fr: "FILTRER PAR",
        de: "FILTERN NACH",
        ru: "СОРТИРОВАТЬ ПО",
        zh: "过滤"
    },
    "search": {
        en: "Search",
        it: "Cerca",
        es: "Buscar",
        fr: "Chercher",
        de: "Suche",
        ru: "Поиск",
        zh: "搜索"
    },
    searchfield: { 
        en: "Search Bookings",
        it: "Cerca Prenotazioni",
        es: "Buscar Reservas",
        fr: "Rechercher Des Réservations",
        de: "Buchungen Suchen",
        ru: "Поиск бронирований",
        zh: "搜索预订"
      },
    "all channels": {
        en: "ALL CHANNELS",
        it: "TUTTI I CANALI",
        es: "TODOS LOS CANALES",
        fr: "TOUTES LES CHAÎNES",
        de: "ALLE KANÄLE",
        ru: "ВСЕ КАНАЛЫ",
        zh: "所有频道"
    },
    "from": {
        en: "from",
        it: "da",
        es: "de",
        fr: "de",
        de: "aus",
        ru: "из",
        zh: "从"
    },
    "to": {
        en: "to",
        it: "a",
        es: "a",
        fr: "à",
        de: "zu",
        ru: "к",
        zh: "至"
    },
    "confirmed booking": {
        en: "confirmed booking",
        it: "prenotazione effettuata",
        es: "reserva hecha",
        fr: "réservation confirmée",
        de: "bestätigte buchung",
        ru: "подтвержденное бронирование",
        zh: "确认预订"
    },
    "arrival": {
        en: "arrival",
        it: "arrivo",
        es: "llegada",
        fr: "arrivées",
        de: "ankunft",
        ru: "прибытие",
        zh: "到达"
    },
    "departure": {
        en: "departure",
        it: "partenza",
        es: "partida",
        fr: "départ",
        de: "abfahrt",
        ru: "Вылет из",
        zh: "离开"
    },
    "existing": {
        en: "existing",
        it: "presenza",
        es: "presencia",
        fr: "présence",
        de: "gegenwart",
        ru: "существующий",
        zh: "现存的"
    },
    "deleted": {
        en: "Deleted",
        it: "Eliminate",
        es: "Eliminado",
        fr: "Supprimé",
        de: "Gelöscht",
        ru: "удален",
        zh: "已删除"
    }
  }