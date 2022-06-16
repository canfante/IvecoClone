const { Application } = require("@hotwired/stimulus")
//= require jquery

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }

$(document).ready(function (){
    hello();
    main_page_functions();
    isMobile();
    kvkk();

    $('#exit').click(function() {
        $('.kvkk_info').fadeOut(400);
    });

    $('.first-level-menu > li:nth-child(2)').addClass('price-list');

    $(".price-list > .sub-menu-wrap > .sub-menu-inner > .second-level-menu").append('<li><a href="http://www.iveco.com/turkey/Documents/PriceList/Fiyat%20Listesi.pdf" target="_blank" rel="nofollow"><span>TAVSIYE EDILEN FIYAT LISTESI</span></a></li><li><a href="http://www.iveco.com/turkey/Documents/PriceList/Kamu%20Listesi.pdf" target="_blank" rel="nofollow"><span>KAMU ARAÇLARI</span></a></li>');

})

function kvkk() {
    $('.kvkk_info').fadeIn();
}

function main_page_functions(){
    //<![CDATA[
    var theForm = document.forms['aspnetForm'];
    if (!theForm) {
        theForm = document.aspnetForm;
    }
    function __doPostBack(eventTarget, eventArgument) {
        if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
            theForm.__EVENTTARGET.value = eventTarget;
            theForm.__EVENTARGUMENT.value = eventArgument;
            theForm.submit();
        }
    }
    //]]>

    //<![CDATA[
    var MSOWebPartPageFormName = 'aspnetForm';
    var g_presenceEnabled = true;
    var g_wsaEnabled = false;
    var g_wsaQoSEnabled = false;
    var g_wsaQoSDataPoints = [];
    var g_wsaLCID = 1033;
    var g_wsaListTemplateId = 850;
    var g_wsaSiteTemplateId = 'BLANKINTERNET#0';
    var _fV4UI = true;
    var _spPageContextInfo = {
        webServerRelativeUrl: "\u002fturkey",
        webAbsoluteUrl: "https:\u002f\u002fwww.iveco.com\u002fturkey",
        siteAbsoluteUrl: "https:\u002f\u002fwww.iveco.com\u002fturkey",
        serverRequestPath: "\u002fturkey\u002fpages\u002fhomepage.aspx",
        layoutsUrl: "_layouts\u002f15",
        webTitle: "Iveco Turkey",
        webTemplate: "53",
        tenantAppVersion: "0",
        isAppWeb: false,
        Has2019Era: true,
        webLogoUrl: "\u002f_layouts\u002fimages\u002ftitlegraphic.gif",
        webLanguage: 1033,
        currentLanguage: 1033,
        currentUICultureName: "en-US",
        currentCultureName: "en-US",
        clientServerTimeDelta: new Date("2022-06-05T19:42:46.1190716Z") - new Date(),
        siteClientTag: "155$$15.0.5233.1000",
        crossDomainPhotosEnabled: false,
        webUIVersion: 15,
        webPermMasks: {
            High: 16,
            Low: 196673
        },
        pageListId: "{a96acdff-b71a-40c5-9ebf-edc9cf2c76a3}",
        pageItemId: 152,
        pagePersonalizationScope: 1,
        alertsEnabled: true,
        siteServerRelativeUrl: "\u002fturkey",
        allowSilverlightPrompt: 'True'
    }; //]]>

    //<![CDATA[
    var L_Menu_BaseUrl="https://www.iveco.com/turkey";
    var L_Menu_LCID="1033";
    var L_Menu_SiteTheme="null";
    //]]>


    //<![CDATA[
    function WebForm_OnSubmit() {
        UpdateFormDigest('\u002fturkey', 1440000);if (typeof(_spFormOnSubmitWrapper) != 'undefined') {return _spFormOnSubmitWrapper();} else {return true;};
        return true;
    }
    //]]>
}

function isMobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

function hello(){
    alert("hello")
}

function InitPullToRefresh() {
    PullToRefresh.init({
        mainElement: 'body',
        onRefresh() {
            window.location.reload();
        }
    });
}