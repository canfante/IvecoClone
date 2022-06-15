function cookieOpen() {
    if( typeof(CookieConsent) !== 'undefined') {
        CookieConsent.dialog.lastUpdatedText = "";
        switch(CookieConsent.dialog.userLanguage.toLowerCase()) {
            case 'it': //Italian
                CookieConsent.dialog.showDetailsText = 'Impostazioni e maggiori informazioni';
                CookieConsent.dialog.hideDetailsText = 'Impostazioni e maggiori informazioni';
                CookieConsent.dialog.multiAcceptText = 'Procedi';
                Cookiebot.dialog.cookiesOverviewText = 'Impostazioni sui Cookie';
                Cookiebot.dialog.aboutCookiesText = 'Informativa sui Cookie';
                break;
            case 'fr': //French
                CookieConsent.dialog.showDetailsText = 'Configuration et plus d\'informations';
                CookieConsent.dialog.hideDetailsText = 'Configuration et plus d\'informations';
                CookieConsent.dialog.multiAcceptText = 'Continuer';
                Cookiebot.dialog.cookiesOverviewText = 'ParamÃ¨tres des cookies';
                Cookiebot.dialog.aboutCookiesText = 'DÃ©claration relative aux cookies';
                break;
            case 'es': //Spanish
                CookieConsent.dialog.showDetailsText = 'ConfiguraciÃ³n y mÃ¡s informaciÃ³n';
                CookieConsent.dialog.hideDetailsText = 'ConfiguraciÃ³n y mÃ¡s informaciÃ³n';
                CookieConsent.dialog.multiAcceptText = 'Continuar';
                Cookiebot.dialog.cookiesOverviewText = 'ConfiguraciÃ³n de cookies';
                Cookiebot.dialog.aboutCookiesText = 'Aviso de cookies';
                break;
            case 'de': //German
                CookieConsent.dialog.showDetailsText = 'Einstellungen und weitere Informationen';
                CookieConsent.dialog.hideDetailsText = 'Einstellungen und weitere Informationen';
                CookieConsent.dialog.multiAcceptText = 'Weiter';
                Cookiebot.dialog.cookiesOverviewText = 'Cookie-Einstellungen';
                Cookiebot.dialog.aboutCookiesText = 'Cookie-ErklÃ¤rung';
                break;
            case 'nl': //Dutch (Netehrlands)
                CookieConsent.dialog.showDetailsText = 'Instellingen en meer informatie';
                CookieConsent.dialog.hideDetailsText = 'Instellingen en meer informatie';
                CookieConsent.dialog.multiAcceptText = 'Doorgaan';
                Cookiebot.dialog.cookiesOverviewText = 'Cookie-instellingen';
                Cookiebot.dialog.aboutCookiesText = 'Cookie-Einstellungen';
                break;
            case 'da': //Danish
                CookieConsent.dialog.showDetailsText = 'Indstillinger og flere oplysninger';
                CookieConsent.dialog.hideDetailsText = 'Indstillinger og flere oplysninger';
                CookieConsent.dialog.multiAcceptText = 'FortsÃ¦t';
                Cookiebot.dialog.cookiesOverviewText = 'Indstillinger til cookies';
                Cookiebot.dialog.aboutCookiesText = 'Besked om cookies';
                break;
            case 'pl': //Polish
                CookieConsent.dialog.showDetailsText = 'Ustawienia i wiÄ™cej informacji';
                CookieConsent.dialog.hideDetailsText = 'Ustawienia i wiÄ™cej informacji';
                CookieConsent.dialog.multiAcceptText = 'PrzejdÅº dalej';
                Cookiebot.dialog.cookiesOverviewText = 'Ustawienia plikÃ³w cookie';
                Cookiebot.dialog.aboutCookiesText = 'Informacja o plikach cookie';
                break;
            case 'sv': //Swedish
                CookieConsent.dialog.showDetailsText = 'InstÃ¤llningar och mer information';
                CookieConsent.dialog.hideDetailsText = 'InstÃ¤llningar och mer information';
                CookieConsent.dialog.multiAcceptText = 'FortsÃ¤tt';
                Cookiebot.dialog.cookiesOverviewText = 'CookieinstÃ¤llningar';
                Cookiebot.dialog.aboutCookiesText = 'Cookie Meddelande';
                break;
            case 'bg': //Bulgarian
                CookieConsent.dialog.showDetailsText = 'ĞĞ°ÑÑ‚Ñ€Ğ¾Ğ¹ĞºĞ¸ Ğ¸ Ğ´Ğ¾Ğ¿ÑŠĞ»Ğ½Ğ¸Ñ‚ĞµĞ»Ğ½Ğ° Ğ¸Ğ½Ñ„Ğ¾Ñ€Ğ¼Ğ°Ñ†Ğ¸Ñ';
                CookieConsent.dialog.hideDetailsText = 'ĞĞ°ÑÑ‚Ñ€Ğ¾Ğ¹ĞºĞ¸ Ğ¸ Ğ´Ğ¾Ğ¿ÑŠĞ»Ğ½Ğ¸Ñ‚ĞµĞ»Ğ½Ğ° Ğ¸Ğ½Ñ„Ğ¾Ñ€Ğ¼Ğ°Ñ†Ğ¸Ñ';
                CookieConsent.dialog.multiAcceptText = 'ĞŸÑ€Ğ¾Ğ´ÑŠĞ»Ğ¶Ğ¸';
                Cookiebot.dialog.cookiesOverviewText = 'ĞĞ°ÑÑ‚Ñ€Ğ¾Ğ¹ĞºĞ¸ Ğ½Ğ° Cookie';
                Cookiebot.dialog.aboutCookiesText = 'Ğ˜Ğ·Ğ²ĞµÑÑ‚Ğ¸Ğµ Ğ·Ğ° Cookie';
                break;
            case 'hr': //Croatian
                CookieConsent.dialog.showDetailsText = 'Postavke i viÅ¡e informacija';
                CookieConsent.dialog.hideDetailsText = 'Postavke i viÅ¡e informacija';
                CookieConsent.dialog.multiAcceptText = 'Nastavi';
                Cookiebot.dialog.cookiesOverviewText = 'Postavke kolaÄiÄ‡a';
                Cookiebot.dialog.aboutCookiesText = 'Obavijest o kolaÄiÄ‡ima';
                break;
            case 'cs': //Czech
                CookieConsent.dialog.showDetailsText = 'NastavenÃ­ a vÃ­ce informacÃ­';
                CookieConsent.dialog.hideDetailsText = 'NastavenÃ­ a vÃ­ce informacÃ­';
                CookieConsent.dialog.multiAcceptText = 'PokraÄovat';
                Cookiebot.dialog.cookiesOverviewText = 'NastavenÃ­ souborÅ¯ cookies';
                Cookiebot.dialog.aboutCookiesText = 'OznÃ¡menÃ­ o souborech cookies';
                break;
            case 'et': //Estonian
                CookieConsent.dialog.showDetailsText = 'Seaded ja lisainfo';
                CookieConsent.dialog.hideDetailsText = 'Seaded ja lisainfo';
                CookieConsent.dialog.multiAcceptText = 'JÃ¤tka';
                Cookiebot.dialog.cookiesOverviewText = 'KÃ¼psiste seaded';
                Cookiebot.dialog.aboutCookiesText = 'KÃ¼psiste teatis';
                break;
            case 'fi': //Finnish
                CookieConsent.dialog.showDetailsText = 'Asetukset ja lisÃ¤Ã¤ tietoa';
                CookieConsent.dialog.hideDetailsText = 'Asetukset ja lisÃ¤Ã¤ tietoa';
                CookieConsent.dialog.multiAcceptText = 'Jatka';
                Cookiebot.dialog.cookiesOverviewText = 'EvÃ¤steasetukset';
                Cookiebot.dialog.aboutCookiesText = 'EvÃ¤steilmoitus';
                break;
            case 'lv': //Latvian (Lettone)
                CookieConsent.dialog.showDetailsText = 'IestatÄ«jumi un plaÅ¡Äka informÄcija';
                CookieConsent.dialog.hideDetailsText = 'IestatÄ«jumi un plaÅ¡Äka informÄcija';
                CookieConsent.dialog.multiAcceptText = 'TurpinÄt';
                Cookiebot.dialog.cookiesOverviewText = 'SÄ«kdatÅ†u iestatÄ«jumi';
                Cookiebot.dialog.aboutCookiesText = 'PaziÅ†ojums par sÄ«kdatnÄ“m';
                break;
            case 'lt': //Lithuanian
                CookieConsent.dialog.showDetailsText = 'Nustatymai ir kita informacija';
                CookieConsent.dialog.hideDetailsText = 'Nustatymai ir kita informacija';
                CookieConsent.dialog.multiAcceptText = 'TÄ™sti';
                Cookiebot.dialog.cookiesOverviewText = 'SlapukÅ³ nustatymai';
                Cookiebot.dialog.aboutCookiesText = 'Pastaba apie slapukus';
                break;
            case 'nb': //Norvegian bokmal
                CookieConsent.dialog.showDetailsText = 'Innstillinger og mer informasjon';
                CookieConsent.dialog.hideDetailsText = 'Innstillinger og mer informasjon';
                CookieConsent.dialog.multiAcceptText = 'Fortsett';
                Cookiebot.dialog.cookiesOverviewText = 'Innstillinger for infromasjonskapsler';
                Cookiebot.dialog.aboutCookiesText = 'Merknad for informasjonskapsel';
                break;
            case 'pt': //Portuguese
                CookieConsent.dialog.showDetailsText = 'ConfiguraÃ§Ãµes e mais informaÃ§Ãµes';
                CookieConsent.dialog.hideDetailsText = 'ConfiguraÃ§Ãµes e mais informaÃ§Ãµes';
                CookieConsent.dialog.multiAcceptText = 'Prosseguir';
                Cookiebot.dialog.cookiesOverviewText = 'ConfiguraÃ§Ãµes de cookies';
                Cookiebot.dialog.aboutCookiesText = 'NotificaÃ§Ã£o de cookies';
                break;
            case 'ro': //Romanian
                CookieConsent.dialog.showDetailsText = 'SetÄƒri ÅŸi informaÅ£ii suplimentare';
                CookieConsent.dialog.hideDetailsText = 'SetÄƒri ÅŸi informaÅ£ii suplimentare';
                CookieConsent.dialog.multiAcceptText = 'Continuare';
                Cookiebot.dialog.cookiesOverviewText = 'SetÄƒri pentru module cookie';
                Cookiebot.dialog.aboutCookiesText = 'Notificare modul cookie';
                break;
            case 'sk': //Slovakia
                CookieConsent.dialog.showDetailsText = 'Nastavenia aÂ ÄalÅ¡ie informÃ¡cie';
                CookieConsent.dialog.hideDetailsText = 'Nastavenia aÂ ÄalÅ¡ie informÃ¡cie';
                CookieConsent.dialog.multiAcceptText = 'PokraÄovaÅ¥';
                Cookiebot.dialog.cookiesOverviewText = 'Nastavenia sÃºborov cookie';
                Cookiebot.dialog.aboutCookiesText = 'OznÃ¡menie oÂ pouÅ¾Ã­vanÃ­ sÃºborov cookie';
                break;
            case 'sl': //Slovenian
                CookieConsent.dialog.showDetailsText = 'Nastavitve in veÄ informacij';
                CookieConsent.dialog.hideDetailsText = 'Nastavitve in veÄ informacij';
                CookieConsent.dialog.multiAcceptText = 'Nadaljuj';
                Cookiebot.dialog.cookiesOverviewText = 'Nastavitve piÅ¡kotkov';
                Cookiebot.dialog.aboutCookiesText = 'Obvestilo o piÅ¡kotkih';
                break;
            case 'en': //English
                CookieConsent.dialog.showDetailsText = 'Settings and more information';
                CookieConsent.dialog.hideDetailsText = 'Settings and more information';
                CookieConsent.dialog.multiAcceptText = 'Agree and Proceed';
                Cookiebot.dialog.cookiesOverviewText = 'Cookie Settings';
                Cookiebot.dialog.aboutCookiesText = 'Cookie Notice';
                break;
            case 'ko': //Korean
                CookieConsent.dialog.showDetailsText = 'ì„¤ì • ë° ì¶”ê°€ ì •ë³´';
                CookieConsent.dialog.hideDetailsText = 'ì„¤ì • ë° ì¶”ê°€ ì •ë³´';
                CookieConsent.dialog.multiAcceptText = 'ê³„ì†í•˜ê¸°';
                Cookiebot.dialog.cookiesOverviewText = 'ì¿ í‚¤ ì„¤ì •';
                Cookiebot.dialog.aboutCookiesText = 'ì¿ í‚¤ ê³ ì§€';
                break;
            case 'zu': //Portuguese
                CookieConsent.dialog.showDetailsText = 'ConfiguraÃ§Ãµes e mais informaÃ§Ãµes';
                CookieConsent.dialog.hideDetailsText = 'ConfiguraÃ§Ãµes e mais informaÃ§Ãµes';
                CookieConsent.dialog.multiAcceptText = 'Prosseguir';
                Cookiebot.dialog.cookiesOverviewText = 'ConfiguraÃ§Ãµes de cookies';
                Cookiebot.dialog.aboutCookiesText = 'NotificaÃ§Ã£o de cookies';
                break;
            case 'tr': //Turkish
                CookieConsent.dialog.showDetailsText = 'Ayarlar';
                CookieConsent.dialog.hideDetailsText = 'Ayarlar';
                CookieConsent.dialog.multiAcceptText = 'OK';
                Cookiebot.dialog.cookiesOverviewText = 'Ã‡erez AyarlarÄ±';
                Cookiebot.dialog.aboutCookiesText = 'Ã‡erez Bildirimi';
                break;
            default: //Default
                CookieConsent.dialog.showDetailsText = 'Settings and more information';
                CookieConsent.dialog.hideDetailsText = 'Settings and more information';
                CookieConsent.dialog.multiAcceptText = 'Proceed';
                Cookiebot.dialog.cookiesOverviewText = 'Cookie Settings';
                Cookiebot.dialog.aboutCookiesText = 'Cookie Notice';

        }
    }
}

window.addEventListener('CookiebotOnDialogInit', function (e) { cookieOpen(); });

function cookieNoticeOpen() {
    if( typeof(CookieConsent.dialog) !== 'undefined' && CookieConsent.dialog !== null) {
        if($('.CybotCookiebotDialogBodyLinkExpanded').length === 0) {
            if($(CookieConsent).length == 0) {
                if($("#CybotCookiebotDialogDetailBodyContentTextAbout").length == 0) CookieConsent.dialog.init();
                CookieConsent.dialog.showDetailPane('about');
                $('#CybotCookiebotDialogBodyButtonDetails').trigger('click');
            }
            else {
                CookieConsent.dialog.show();
                CookieConsent.dialog.showDetailPane('about');
                $('#CybotCookiebotDialogBodyButtonDetails').trigger('click');
            }
        }
        else if(CookieConsent.dialog.visible == false) {
            CookieConsent.dialog.show();
            window.addEventListener('CookiebotOnDialogDisplay', function (e) {
                CookieConsent.dialog.showDetailPane('about');
            });
        }
        else {
            CookieConsent.dialog.showDetailPane('about');
        }
    }
    else {
        CookieConsent.renew();
        window.addEventListener('CookiebotOnDialogDisplay', function (e) {
            CookieConsent.dialog.showDetailPane('about');
        });
    }
}