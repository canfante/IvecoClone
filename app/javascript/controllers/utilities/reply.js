//var Market_User = 'UA-xxxxxx-xxx';
var sPath = window.location.pathname;
var marketName = (sPath.split('/')[1]).toLowerCase(); 
var pageName = sPath.substring(sPath.lastIndexOf('/') + 1);
/*
if(typeof window.ga == 'undefined') { 
	var ga = function(a){ return true; }
	var _gaq = { 
		push: function(a) { 
			if(a.length == 4 && a[0].toLowerCase()=='_trackevent') 
				ga('send','event',a[1],a[2],a[3]); 
			else if(a.length == 2 && a[0].toLowerCase()=='_trackpageview') 
				ga('send','pageview',a[1]); 
			return true; 
		}
	}
}
*/


function FindBrand(clickBtn) {
    var refForm = $(clickBtn).parent().parent();
    var page_url = refForm.find("input[name='txtFindBrandPageUrl']")[0].value;
    var address = refForm.find("input[name='txtFindBrandAddress']")[0].value;
    var obj_brand = refForm.find("select[name='ddlBrand']")[0];
	var brand_option = "";
	if(typeof obj_brand !== "undefined")
		page_url = page_url + obj_brand.options[obj_brand.selectedIndex].value;
	else
		page_url = page_url + "truck";
	var pN = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
	if(pN.indexOf(".")>=0) pN = pN.substring(0,pN.indexOf("."));
    if (address != '')
        page_url = page_url + '&address=' + address + '&position=' + htmlEncode(pN);
    else
        page_url = page_url + '&position=' + htmlEncode(pN);
	clickBtn.href = page_url;
	return true;
}

function Search(PageUrl, SiteUrl, Scope) {
    var myK = document.getElementById('searchBox').value;
    if (Scope.toLowerCase() == "newivecositeareapress") {
        document.location.href= SiteUrl + PageUrl + '?s=' + Scope + '&k=(Title:' + myK + ' OR TextCenter:' + myK + ' OR Abstract:' + myK + ' OR PdfLink:' + myK + ')';
        //document.location.href = SiteUrl + PageUrl + '?k=(Title:' + myK + ' OR TextCenter:' + myK + ' OR Abstract:' + myK + ' OR PdfLink:' + myK + ')';
    }
    else {
		if( marketName == 'uk' 
		|| marketName == 'belgium-nl' 
		|| marketName == 'belgium-fr'
		|| marketName == 'norway'
		|| marketName == 'germany'
		|| marketName == 'netherlands'
		|| marketName == 'austria'
		|| marketName == 'switzerland-it'
		|| marketName == 'switzerland-fr'
		|| marketName == 'switzerland-de'
		|| marketName == 'brasil'
		|| marketName == 'denmark'
		|| marketName == 'russia'
		|| marketName == 'czech'
		|| marketName == 'slovakia'
		|| marketName == 'argentina'
		|| marketName == 'romania'
		|| marketName == 'southafrica'
		|| marketName == 'africa-mideast-en'
		|| marketName == 'africa-mideast-fr'
		|| marketName == 'bulgaria'
		|| marketName == 'turkey'
		|| marketName == 'portugal'
		|| marketName == 'venezuela'
		|| marketName == 'sweden'
		|| marketName == 'norway'
		|| marketName == 'finland'
		|| marketName == 'estonia'
		|| marketName == 'latvia'
		|| marketName == 'lithuania'
		|| marketName == 'serbia'
		|| marketName == 'croatia'
		|| marketName == 'ukraine'
		|| marketName == 'slovenia'
		|| marketName == 'kazakhstan'
		|| marketName == 'sea'
		|| marketName == 'southkorea'
		|| marketName == 'malaysia'
		|| marketName == 'indonesia-en'
		|| marketName == 'indonesia-id'
		|| marketName == 'myanmar'
		|| marketName == 'singapore'
		|| marketName == 'thailand-en'
		|| marketName == 'africa-mideast-ar')
			document.location.href = SiteUrl + PageUrl + '?k=TextCenter:' + myK + '&s=NewIvecoSite';
		else
			document.location.href = SiteUrl + PageUrl + '?k=TextCenter:' + myK;
        //document.location.href = SiteUrl + PageUrl + '?k=' + myK;
    }
}

function searchKeyPress(e, PageUrl, SiteUrl, Scope) {
    if (window.event)
        e = window.event;
    if (e.keyCode == 13)
        Search(PageUrl, SiteUrl, Scope);
}

function goConf(combo) {
    var vehicle_option = combo.options[combo.selectedIndex].value;
    if (vehicle_option != '0')
        window.location = vehicle_option;
}

function goRegEmailAlert() { document.location.href = document.getElementById('txtEmailAlertPageUrl').value + document.getElementById('txtEmailAlert').value + '%26reg_type=' + document.getElementById('txtEmailAlertReg_type').value;}

function goNewsLetter() { document.location.href = document.getElementById('txtNewsletterPageUrl').value + document.getElementById('txtEmailNewsletter').value;}

function gen_btn(objCls, idBtn, targetBtn, srcBtn, classBtn, labelBtn) {
    try {
        if (labelBtn != "" && labelBtn != "&#160;") {
            var myAnchor = document.createElement("a");
			myAnchor.href = srcBtn;
			myAnchor.target = targetBtn;
			//myAnchor.text = labelBtn;
			myAnchor.innerHTML = labelBtn;
			var str = classBtn.split(" ");
			for (i=0; i < str.length; i++) if(str[i] != '') myAnchor.classList.add(str[i]);
			if(idBtn != '') myAnchor.id = idBtn;
           document.getElementById(objCls).appendChild(myAnchor);
        }
    } catch (e) { }
}

function gen_Img(obj, src, alt, title) {
    try {
		
		var isThereIMG = false;
		var container = document.getElementById(obj);
		
		for(index = 0; index < container.childNodes.length; index++){
			node = container.childNodes[index];
			if (node && node.nodeType == 1 && node.nodeName == 'IMG'){
				isThereIMG = true;
				break;
			}
		}
		
		if(!isThereIMG){
			if (src != "" && src != "&#160;") {
				var myImg = document.createElement("img");
				myImg.src = parseImgSrc(src.replace(/^\s + |\s + $/gm, ''));
				myImg.alt = alt;
				myImg.title = title;
				document.getElementById(obj).appendChild(myImg);
			}
		}
		
    } catch (e) { }
}
function gen_CoverImg(obj, src, title) {
    try {
        if (src != "" && src != "&#160;") {
            var obj = document.getElementById(obj);
			obj.setAttribute('data-fancybox-href', parseImgSrc(src.replace(/^\s + |\s + $/gm, '')));
			obj.title = title;
        }
    } catch (e) { }
}

function parseImgSrc(img_src) { if (window.innerWidth <= 480) return img_src + '?width=1'; if (window.innerWidth <= 992) return img_src + '?width=600'; return img_src; }
function getCurrentDevice() { if (window.innerWidth <= 480) return "mobile"; if (window.innerWidth <= 992) return "tablet"; return "desktop";}
function getParameterByName(name) {
    var results = new RegExp("[\\?&]" + name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]") + "=([^&#]*)").exec(window.location.search);
    return (results == null) ? "" : decodeURIComponent(results[1].replace(/\ + /g, " ")).replace("TextCenter:", "");
}

function photoGallery_updateCounter() {
    $('.counter .selected').text($(".link-resolution input:checked").length);
    return false;
}

function photoGallery_downloadPictures() {
    var url = '';
    $("input[type='checkbox']:checked").each(function () {
        url += '|' + $(this).attr('data-url');
		if(typeof window.ga == 'undefined'){ 
			var ga = function(a){return true;}
			ga("send", "event", marketName + "-press-room-image", $('h1.box__title span').text().trim(), $(this).attr('data-url') + "-" + ($(this).parent().hasClass('lr') ? 'LR' : 'HR'));
		}
		else
			window.ga("send", "event", marketName + "-press-room-image", $('h1.box__title span').text().trim(), $(this).attr('data-url') + "-" + ($(this).parent().hasClass('lr') ? 'LR' : 'HR'));
    });
    if (url) {
		_spFormOnSubmitCalled = false;
        $("#imageUrls").val(url); $("form:first").submit();
        return false;
    }

}

/*Get Query String*/
function getQS(key, default_) {
    if (default_ == null) {
        default_ = "";
    }
    var search = unescape(location.search);
    if (search == "") {
        return default_;
    }
    search = search.substr(1);
    var params = search.split("&");
    for (var i = 0; i < params.length; i++) {
        var pairs = params[i].split("=");
        if (pairs[0] == key) {
            return pairs[1];
        }
    }
    return default_;
}
/*Get Query String*/

/*mail alert subscribe*/
function mailAlertSubscribeManager() {
    var mailValue = getQS('email', '');
    if (mailValue != '' && ($("input[name=email]").val() == '' || $("input[name=email]").val() == $("input[name=email]").attr('placeholder')))
        $("input[name=email]").val(mailValue);
    $("input[name=reg_type]").val(getQS('regtype', ''));
    if ($("#ctl00_PlaceHolderMain_hdn_error")[0].value != '') {
        $("input[name=check-code]").parent().addClass("has-error");
        //$("#inlineRadio1")[0].checked = true;
    }
    if ($(".text.send").length > 0){
		if(typeof window.ga == 'undefined') { 
			var ga = function(a){return true;} 
			ga("send", "pageview", marketName + "/mail-alert/ok");
		}
		else
			window.ga("send", "pageview", marketName + "/mail-alert/ok");
	}
    if ($(".text.nosend").length > 0){
		if(typeof window.ga == 'undefined') { 
			var ga = function(a){ return true; }
			ga("send", "event", marketName + "-mail-alert", "err-errore");
		}
		else
			window.ga("send", "event", marketName + "-mail-alert", "err-errore");
	}
}

function mailAlertUnSubscribeManager() {
    if ($("#ctl00_PlaceHolderMain_hdn_error")[0].value != '')
        $("input[name=check-code]").parent().addClass("has-error");
}

function submitMailAlert() {
    $("input[name=check-code]").parent().removeClass('has-error');
    $.ajax({
        cache: false, type: "GET", url: '../_layouts/15/Iveco/Captcha.aspx', data: 'IsToVerify=1&Captcha=' + $("input[name=check-code]").val(), success: function (data) {
            if ($.trim(data) == 'captcha_ok')
                document.forms[0].submit();
            else
                $("input[name=check-code]").parent().addClass('has-error');
        }
    });
}

function submitform() { 
	//$(".btn.btn-default.sendForm:visible, #form-contact .btn.btn-default.sendForm:visible, #layout-landing a.btn-landing2__form.sendForm").parent().html("<img src=\"/common/PublishingImages/ajax-loader.gif\" style=\"display:inline\">");
	document.forms[0].submit(); 
}

function trackTechSheets(path) { 
	if (path.indexOf("#") == -1) {
		if(typeof window.ga == 'undefined') { 
			var ga = function(a){ return true; }
			ga('send', 'pageview', marketName + '/download/sheet/product/' + pageName + '/' + path.substring(path.lastIndexOf('/') + 1)); 
		}
		else
			window.ga('send', 'pageview', marketName + '/download/sheet/product/' + pageName + '/' + path.substring(path.lastIndexOf('/') + 1)); 
	}
	return true; 
}

/*ghost page*/
function chkMoreInfoBoxStatus() {
    var checkBox1 = document.getElementById("hideMoreInfo").getElementsByTagName("input")[0];
    if (checkBox1.checked)
        document.getElementById("TableHomeParams").style.display = "block";
    else
        document.getElementById("TableHomeParams").style.display = "none";
}
/*P&S promotion*/
function chkPromoHomeBoxStatus() {
    var checkBox1 = document.getElementById("hideInSlideshow").getElementsByTagName("input")[0];
    if (checkBox1.checked)
        document.getElementById("TableHomePromoParams").style.display = "block";
    else
        document.getElementById("TableHomePromoParams").style.display = "none";
}
function changeHeaderType() {
    var myheaderType = document.getElementById("selectType").getElementsByTagName("select")[0];
    if (myheaderType.value == null || myheaderType.value == "") {
        myheaderType.children[0].selected = true
        myheaderType.value = myheaderType.children[0].value;
    }
    else if (myheaderType.value == "YouTube Video") {
        document.getElementById("typeVideo").style.display = "block";
        document.getElementById("typeImg").style.display = "none";
    }
    else {
        document.getElementById("typeVideo").style.display = "none";
        document.getElementById("typeImg").style.display = "block";
    }
}
/*ghost page*/

/* form validation */
function isValidField(myField) {
	//checkbox
	if ($(myField).attr('type') == "checkbox" && $(myField).attr('data-required') == "false") return true;
	else if ($(myField).attr('type') == "checkbox" && $(myField).attr('data-required') == "true") return myField.checked;
    else if ($(myField).attr('type') == "checkbox") return myField.checked;
	//other
    var val = $(myField).val();
    if ($(myField).attr('placeholder') != undefined && val == $(myField).attr('placeholder')) val = '';
    if ($(myField).attr('data-required') == "true" && val == '') return false;
    if ($(myField).attr('data-regex') != undefined && val.match(new RegExp($(myField).attr('data-regex'))) == null) return false;
	//radio
	if ($(myField).attr('type') == "radio")
	{
		$(myField.parentElement.parentElement.parentElement).find('.has-error').removeClass('has-error');
		//var $this = $(this);
		var $this = $(myField.parentElement.parentElement);
		var $requiredConsent = $this.find('input[type="radio"]').filter('[data-required="true"]');
		
		// case 1: all radio buttons must be checked, accepting or denying consent.
		if ( $this.find('input[type="radio"]').filter(':checked').length <= 0 ) {
			$this.addClass('has-error');
		}
		
		// case 2: if a radio button is marked as required, user must accept consent (deny is not an option).
		if ( $requiredConsent.length > 0 && $requiredConsent.filter(':checked').length <= 0 ) {
			$requiredConsent.closest('label').addClass('has-error');
		}
		
	}
    return true;
}

function checkErrorClass(myField) {
    if (isValidField(myField)) {
        $(myField).parents('.form-group').removeClass('has-error');
		$(myField).parents('.form-gdpr').removeClass('has-error');
    }
    else {
        $(myField).parents('.form-group').addClass('has-error');
		$(myField).parents('.form-gdpr').addClass('has-error');
    }
}

function formValidation() {
    $(".ivecoForm:not(.no-validate)").each(function () {
        $(this).find("input[type='checkbox'], select").change(function (e) { if (typeof e.originalEvent != "undefined") checkErrorClass(this); });
        $(this).find("input:not([type='checkbox']), textarea").blur(function (e) { if (typeof e.originalEvent != "undefined") checkErrorClass(this); });
        $(this).find('.sendForm').click(function () {
            var form = $(this).parents(".ivecoForm");
            form.find("input, select, textarea").each(function (i, item) { checkErrorClass(item); });
            //if (form.find('.form-group.has-error').length == 0 && form.find('.form-gdpr.has-error').length == 0) {
			if (form.find('.has-error').length == 0){
                if (form.is('.dealer')) {
                    var address = "&address=" + form.find('input[name="address"]').attr('value').replace(/ /g, '-');
                    var brand = "&brand=" + form.find('select option:selected').val();
                    if (!form.find('select option:selected').val() == "")
                        $(this).attr('href', $(this).attr('href') + address + brand);
                    else
                        $(this).attr('href', $(this).attr('href') + address);
                }
                else {
                    form.find("input, textarea").each(function (i, item) { if ($(item).attr('placeholder') != undefined && $(item).attr('value') == $(item).attr('placeholder')) $(item).attr('value', ''); });
                }
                return true;
            }
            else
                return false;
        });
        $(this).find('.sendForm').removeClass("noSubmit");
    });
}
/* form validation */

/* SEND form */
var baseUrlForSuccessMethod;
var calendarUrl;
function callback(formSelector, originalArguments){
    /*console.log('callback');
    console.log(formSelector);
    console.log(originalArguments);*/
	if(formSelector == '.myFormContainer')
		sendLead(originalArguments[1], originalArguments[2], originalArguments[3]);
	else if(formSelector == ".box.box--no-img.alert-bg--big.ivecoForm")
		document.forms[0].submit();
	else if(formSelector == '.box__content.ivecoForm') {
		$(".btn.btn-default.sendForm:visible, #form-contact .btn.btn-default.sendForm:visible, #layout-landing a.btn-landing2__form.sendForm").parent().html("<img src=\"/common/PublishingImages/ajax-loader.gif\" style=\"display:inline\">");
		submitform('post');
	}
	else if(formSelector == '#box-form')
		sendAndVerifyLead(originalArguments[1], originalArguments[2], originalArguments[3], originalArguments[4]);
	else if(formSelector == '.box__content.ivecoForm.newsletter')
		sendNewsletter();
	return false;
}

function validateGDPR(selector, success){
	populatePolicies(selector);
	callback(selector, arguments);
}

function validateGDPR(selector, baseUrl, readLead, success){
	populatePolicies(selector);
	callback(selector, arguments);
}

function populatePolicies(currentForm) {
		var GDPR_policies = '';// reset
		var policies_id = [];
		$(currentForm).find('.content-gdpr__policyitem:visible').each(function( index ){
			var $this = $(this);
			var currentId = '';
			var currentVal = '';
			//if ( index > 0 ) { GDPR_policies += '|'; }
			if ( $this.is('.content-gdpr__policyitem--checkbox') ) {
				currentId = $this.find('input[type="checkbox"]').attr('data-id');
				currentVal = $this.find('input[type="checkbox"]').is(':checked') ? 'true' : 'false' ;
			}
			if ( $this.is('.content-gdpr__policyitem--radio') ) {
				currentId = $this.find('input[type="radio"]').attr('data-id');
				currentVal = $this.find('input[type="radio"]').filter(':checked').val();
			}
			GDPR_policies += '|' + currentId +','+ currentVal;
			/*if(policies_id.length >0) {
				var l = policies_id.length;
				var t = true;
				for(var i = 0; i < l;  i++){
					if(policies_id[i] == currentId){
						t = false;
						break;
					}
				}
				if(t){
					policies_id.push(currentId);
					GDPR_policies += '|' + currentId +','+ currentVal;
				}
			}
			else {				
				policies_id.push(currentId);
				GDPR_policies += currentId +','+ currentVal;
			}*/
		});
		$(currentForm).find('input[name="hdn_GDPR_policies"]').val(GDPR_policies);
		
	};

function sendLead(baseUrl, readLead, success) {
    baseUrlForSuccessMethod = baseUrl;
    if (checkIsPosted() == false) {		
        var values = readLead();
		$(".start_box .btn.btn-default.sendForm:visible, #form-contact .btn.btn-default.sendForm:visible, #layout-landing a.btn-landing2__form.sendForm").parent().html("<img src=\"/common/PublishingImages/ajax-loader.gif\" style=\"display:inline\">");
		var s_type = $('.hdn_crmsendmode, #hdn_crmsendmode').val();
		if(s_type == 'CRMRUSSIA' || baseUrl.toLowerCase() =="/russia")
			{
				var url = baseUrl + '/_layouts/15/Iveco/SaveLeadRussia.aspx?dummy=' + (+new Date());
				$.post(url, values, success);
		}
        else {
			if (s_type == 'BOOKING' || s_type == 'ASAP') {
				var url = baseUrl + '/_layouts/15/Iveco/SaveJob.aspx?dummy=' + (+new Date());
				$.post(url, values, success);
			}
			else{
				var url = baseUrl + '/_layouts/15/Iveco/SaveLead.aspx?dummy=' + (+new Date());
				$.post(url, values, success);
			}
        }
    }
}
function checkIsPosted() {
    if (typeof jQuery.data(this, "disabledOnSubmit") == 'undefined') {
        jQuery.data(this, "disabledOnSubmit", { submited: true });
        return false;
    }
    else {
        return true;
    }
}
function reloadCaptcha() {
    var obj = $("img.reloadCaptcha")[0];
    var src = obj.src;
    var pos = src.indexOf('?');
    if (pos >= 0)
        src = src.substr(0, pos);
    obj.src = src + '?v=' + new Date().getTime();
    return false;
}
function submitform(value) {
    if (value == 'post') {
		if($('#id_post').length) {
			document.getElementById('id_post').disabled = true;
			$(".btn.btn-default.sendForm:visible, #form-contact .btn.btn-default.sendForm:visible, #layout-landing a.btn-landing2__form.sendForm").parent().html("<img src=\"/common/PublishingImages/ajax-loader.gif\" style=\"display:inline\">");
		}
	}
    document.getElementById('id_action').value = value;
    document.forms[0].submit();
}
function errorform(id, msg) {
    rewriteInputs = false;
    document.getElementById(id).focus();
    alert(msg);
}
function generalError(msg) {
    rewriteInputs = false;
    document.getElementById('id_box').style.display = 'none';
    alert(msg);
}
function setTimeZoneCookies() {
    if (document.cookie.indexOf("TimeZoneOffset=") == -1) {
        document.cookie = "TimeZoneOffset=" +
           (new Date()).getTimezoneOffset();
        if (document.cookie)
            document.location.reload(true);
    }
}
function htmlEncode(value) {
    if (!value)
        return '';
    else
        return $('<div/>').text(value).html();
}
function htmlDecode(value) {
    if (!value)
        return '';
    else
        return $('<div/>').html(value).text();

}
function checkIsPosted() {
    if (typeof jQuery.data(this, "disabledOnSubmit") == 'undefined') {
        jQuery.data(this, "disabledOnSubmit", { submited: true });
        return false;
    }
    else {
        return true;
    }
}
/* Manage Catalog */
function manageCatalogSelect(selectedOption, catalogType, eventType) {
    var optionVal = $(selectedOption).val();
	var optionText = $(selectedOption).find("option:selected").text();
	if (optionVal == "null" || optionVal == "-") return false;
	
	if(typeof eventType == "undefined") eventType = '0';
	if (eventType == '0') {
		var brName = optionVal.substring(optionVal.lastIndexOf('/') + 1);
		if(marketName == 'uk' || marketName == 'belgium-nl' || marketName == 'belgium-fr' || marketName == 'netherlands' 
		|| marketName == 'sweden' || marketName == 'finland' || marketName == 'norway' || marketName == 'denmark' || marketName == 'france'
		|| marketName == 'germany' || marketName == 'poland' || marketName == 'spain' || marketName == 'italy'){
			if(typeof dataLayer != "undefined"){ 
				dataLayer.push({ 'event':'brochure', 'brochureLink': optionVal, 'brochureModel': brName }); 
			}
		}
		if(typeof window.ga == 'undefined') { 
			var ga = function(a){ return true; }
			ga('send', 'pageview', '' + marketName + '/download/catalog/product/' + pageName + '/' + brName + '');
		}			
		else
			window.ga('send', 'pageview', '' + marketName + '/download/catalog/product/' + pageName + '/' + brName + '');
		window.location = optionVal;
    }
    else
		$("#catUrl").val(optionVal + '||' + catalogType + '||' + optionText);
}
/* End Manage Catalog */
function requestCatalog(parCatalogURL) {
    var params = parCatalogURL.split('||');
    var catalogURL = params[0];
    var catalogType = params[1];
    var catalogName = params[2];
    if (isiPad) window.location = catalogURL; else window.open(catalogURL, '_blank');
    $.ajax({
        type: 'post',
        url: 'http://p5trc.emv2.com/D2UTF8',
        data: {
            emv_tag: '2A80080001ED0643',
            emv_ref: '27GpDzoZs67HIRpUiZPY_TGlbeCrnoF5h-nP3zgf1-kSBB38Ax4gbbZKK4XD4yn0/paK75OX36ScAy2xG5GW4LQ',
            COUNTRY_FIELD: 'ITALIA',
            NEWSLETTER_FIELD: 'YES',
            SOURCE_FIELD: 'CATALOGO DAILY',
            PRIVACY_FIELD: 'YES',
            EMAIL_FIELD: $("#EMAIL_FIELD").val(),
            FIRSTNAME_FIELD: $("#FIRSTNAME_FIELD").val(),
            LASTNAME_FIELD: $("#LASTNAME_FIELD").val()
        }
    });
    $("#FIRSTNAME_FIELD").val("");
    $("#LASTNAME_FIELD").val("");
    $("#EMAIL_FIELD").val("");
    $("#PRIVACY_FIELD")[0].checked = false;
    $(".close").click();
	if(typeof window.ga == 'undefined') { 
		var ga = function(a){ return true; }
		ga('send', 'event', '' + marketName + '-download-catalog', catalogType + '-' + catalogName, pageName + '');
	}
	else
		window.ga('send', 'event', '' + marketName + '-download-catalog', catalogType + '-' + catalogName, pageName + '');
    if (typeof _elq != "undefined") _elq.trackEvent(catalogURL);
    return false;
}
function readMoreInfoC1() {
    var values = {};
    values["Nome"] = htmlEncode($("#id_nome").val());
    values["Cognome"] = htmlEncode($("#id_cognome").val());
    values["CompanyName"] = htmlEncode($("#id_ragione").val());
    values["Telefono"] = htmlEncode($("#id_telefono").val());
    values["Email"] = htmlEncode($("#id_email").val());
    values["LeadMSN"] = htmlEncode($("#id_leadMSN").val());
    values["Indirizzo"] = htmlEncode($("#id_via").val());
    values["Numero"] = htmlEncode($("#id_numero").val());
    values["Cap"] = htmlEncode($("#id_cap").val());
    values["Citta"] = htmlEncode($("#id_citta").val());
    values["Fax"] = htmlEncode($("#id_fax").val());
    values["Commenti"] = htmlEncode($("#id_commenti").val());
    values["InitReportDetail"] = htmlEncode($("#hdn_initreportdetail").val());
    values["InitReportSource"] = htmlEncode($("#hdn_initreportsource").val());
    values["Promo"] = htmlEncode($("#hdn_promo").val());
    values["PromoSource"] = htmlEncode($("#hdn_promosource").val());
    values["CustomerLanguage"] = htmlEncode($("#hdn_crmlanguage").val());
    values["Nazione"] = htmlEncode($("#hdn_crmcountry").val());
    values["Brand"] = htmlEncode($("#hdn_brand").val());
    values["Data"] = htmlEncode($("#hdn_data").val());
    values["To"] = htmlEncode($("#hdn_to").val());
    values["Cc"] = htmlEncode($("#hdn_cc").val());
    values["SendMode"] = htmlEncode($("#hdn_sendmode").val());
    values["TitleLead"] = htmlEncode($("#hdn_titlelead").val());
    values["Canale"] = htmlEncode($("#hdn_canale").val());
    values["Privacy"] = "true";
	//AdditionalField
	values["AdditionalField1"] = htmlEncode($("#txt_add_field_1_html").val());
	values["AdditionalField2"] = htmlEncode($("#txt_add_field_2_html").val());
	values["AdditionalField3"] = htmlEncode($("#txt_add_field_3_html").val());
	values["AdditionalField4"] = htmlEncode($("#txt_add_field_4_html").val());
	values["AdditionalField5"] = htmlEncode($("#txt_add_field_5_html").val());
	values["AdditionalField6"] = htmlEncode($("#txt_add_field_6_html").val());
	//FlagPrivacy
	if ($("div.ivecoForm #FlagPrivacy2").length >= 1) values["FlagPrivacy2"] = $($("div.ivecoForm #FlagPrivacy2")[0]).prop('checked');
	if ($("div.ivecoForm #FlagPrivacy3").length >= 1) values["FlagPrivacy3"] = $($("div.ivecoForm #FlagPrivacy3")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField4").length >= 1) values["AdditionalField4"] = $($("div.ivecoForm #AdditionalField4")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField5").length >= 1) values["AdditionalField5"] = $($("div.ivecoForm #AdditionalField5")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField6").length >= 1) values["AdditionalField6"] = $($("div.ivecoForm #AdditionalField6")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']").length == 2) values["FlagPrivacy2"] = "true";
	/*GDPR*/
	values["hdn_GDPR_version"] = htmlEncode($("#hdn_GDPR_version").val());
	values["hdn_GDPR_policies"] = htmlEncode($("#hdn_GDPR_policies").val());
    return values;
}
function readContactUsed() {
    var values = {};
    values["Nome"] = htmlEncode($("#firstName").val());
    values["Cognome"] = htmlEncode($("#lastName").val());
    values["Telefono"] = htmlEncode($("#telephone").val());
    values["CompanyName"] = htmlEncode($("#company").val());
    values["Email"] = htmlEncode($("#eMail").val());
    values["InitReportDetail"] = htmlEncode($("#hdn_initreportdetail").val());
    values["InitReportSource"] = htmlEncode($("#hdn_initreportsource").val());
    values["Promo"] = htmlEncode($("#hdn_promo").val());
    values["PromoSource"] = htmlEncode($("#hdn_promosource").val());
    values["CustomerLanguage"] = htmlEncode($("#hdn_crmlanguage").val());
    values["Nazione"] = htmlEncode($("#hdn_crmcountry").val());
    values["Brand"] = htmlEncode($("#hdn_brand").val());
    values["Data"] = htmlEncode($("#hdn_data").val());
    values["To"] = htmlEncode($("#hdn_to").val());
    values["Cc"] = htmlEncode($("#hdn_cc").val());
    values["SendMode"] = htmlEncode($("#hdn_sendmode").val());
    values["TitleLead"] = htmlEncode($("#hdn_titlelead").val());
    values["Canale"] = htmlEncode($("#hdn_canale").val());
    values["Privacy"] = "true";
    //AdditionalField
	values["AdditionalField1"] = htmlEncode($("#txt_add_field_1_html").val());
	values["AdditionalField2"] = htmlEncode($("#txt_add_field_2_html").val());
	values["AdditionalField3"] = htmlEncode($("#txt_add_field_3_html").val());
	values["AdditionalField4"] = htmlEncode($("#txt_add_field_4_html").val());
	values["AdditionalField5"] = htmlEncode($("#txt_add_field_5_html").val());
	values["AdditionalField6"] = htmlEncode($("#txt_add_field_6_html").val());
	//FlagPrivacy
	if ($("div.ivecoForm #FlagPrivacy2").length >= 1) values["FlagPrivacy2"] = $($("div.ivecoForm #FlagPrivacy2")[0]).prop('checked');
	if ($("div.ivecoForm #FlagPrivacy3").length >= 1) values["FlagPrivacy3"] = $($("div.ivecoForm #FlagPrivacy3")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField4").length >= 1) values["AdditionalField4"] = $($("div.ivecoForm #AdditionalField4")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField5").length >= 1) values["AdditionalField5"] = $($("div.ivecoForm #AdditionalField5")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField6").length >= 1) values["AdditionalField6"] = $($("div.ivecoForm #AdditionalField6")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']").length == 2) values["FlagPrivacy2"] = "true";
	/*GDPR*/
	values["hdn_GDPR_version"] = htmlEncode($("#hdn_GDPR_version").val());
	values["hdn_GDPR_policies"] = htmlEncode($("#hdn_GDPR_policies").val());
    return values;
}
function readMoreInfoMobile() {
    var values = {};
    values["Nome"] = htmlEncode($("#txt_name_html").val());
    values["Cognome"] = htmlEncode($("#txt_surname_html").val());
    values["Email"] = htmlEncode($("#txt_email_html").val());
    values["Telefono"] = htmlEncode($("#txt_phone_html").val());
    values["InitReportDetail"] = htmlEncode($("#hdn_initreportdetail").val());
    values["InitReportSource"] = htmlEncode($("#hdn_initreportsource").val());
    values["Promo"] = htmlEncode($("#hdn_promo").val());
    values["PromoSource"] = htmlEncode($("#hdn_promosource").val());
    values["CustomerLanguage"] = htmlEncode($("#hdn_crmlanguage").val());
    values["Nazione"] = htmlEncode($("#hdn_crmcountry").val());
    values["Brand"] = htmlEncode($("#hdn_brand").val());
    values["Data"] = htmlEncode($("#hdn_data").val());
    values["To"] = htmlEncode($("#hdn_to").val());
    values["Cc"] = htmlEncode($("#hdn_cc").val());
    values["SendMode"] = htmlEncode($("#hdn_sendmode").val());
    values["TitleLead"] = htmlEncode($("#hdn_titlelead").val());
    values["Canale"] = htmlEncode($("#hdn_canale").val());
    values["Privacy"] = "true";
    if (getQS('utm_term', '') != undefined)
        values["StockSearchedModel"] = getQS('utm_term', '');
	//AdditionalField
	values["AdditionalField1"] = htmlEncode($("#txt_add_field_1_html").val());
	values["AdditionalField2"] = htmlEncode($("#txt_add_field_2_html").val());
	values["AdditionalField3"] = htmlEncode($("#txt_add_field_3_html").val());
	values["AdditionalField4"] = htmlEncode($("#txt_add_field_4_html").val());
	values["AdditionalField5"] = htmlEncode($("#txt_add_field_5_html").val());
	values["AdditionalField6"] = htmlEncode($("#txt_add_field_6_html").val());
	//FlagPrivacy
	if ($("div.ivecoForm #FlagPrivacy2").length >= 1) values["FlagPrivacy2"] = $($("div.ivecoForm #FlagPrivacy2")[0]).prop('checked');
	if ($("div.ivecoForm #FlagPrivacy3").length >= 1) values["FlagPrivacy3"] = $($("div.ivecoForm #FlagPrivacy3")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField4").length >= 1) values["AdditionalField4"] = $($("div.ivecoForm #AdditionalField4")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField5").length >= 1) values["AdditionalField5"] = $($("div.ivecoForm #AdditionalField5")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField6").length >= 1) values["AdditionalField6"] = $($("div.ivecoForm #AdditionalField6")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']").length == 2) values["FlagPrivacy2"] = "true";
	/*GDPR*/
	values["hdn_GDPR_version"] = htmlEncode($("#hdn_GDPR_version").val());
	values["hdn_GDPR_policies"] = htmlEncode($("#hdn_GDPR_policies").val());
    return values;
}
function readMoreInfo() {
	var myForm = $("aside.myFormContainer a.sendForm:visible").parents("aside.myFormContainer");
    var values = {};
	values["Nome"] = htmlEncode(myForm.find(".txt_name_html").val());
	values["Cognome"] = htmlEncode(myForm.find(".txt_surname_html").val());
	values["Telefono"] = htmlEncode(myForm.find(".txt_phone_html").val());
	values["CompanyName"] = htmlEncode(myForm.find(".txt_company_html").val());
	values["Indirizzo"] = htmlEncode(myForm.find(".txt_address_html").val());
	values["Cap"] = htmlEncode(myForm.find(".txt_zip_html").val());
	values["Citta"] = htmlEncode(myForm.find(".txt_citta_html").val());
	values["Commenti"] = htmlEncode(myForm.find(".txt_comment_html").val());
	values["Email"] = htmlEncode(myForm.find(".txt_email_html").val());
    values["InitReportDetail"] = htmlEncode(myForm.find(".hdn_initreportdetail").val());
	values["InitReportSource"] = htmlEncode(myForm.find(".hdn_initreportsource").val());
	values["Promo"] = htmlEncode(myForm.find(".hdn_promo").val());
	values["PromoSource"] = htmlEncode(myForm.find(".hdn_promosource").val());
	values["CustomerLanguage"] = htmlEncode(myForm.find(".hdn_crmlanguage").val());
	values["Nazione"] = htmlEncode(myForm.find(".hdn_crmcountry").val());
	values["Brand"] = htmlEncode(myForm.find(".hdn_brand").val());
	values["Data"] = htmlEncode(myForm.find(".hdn_data").val());
	values["To"] = htmlEncode(myForm.find(".hdn_to").val());
	values["Cc"] = htmlEncode(myForm.find(".hdn_cc").val());
	values["SendMode"] = htmlEncode(myForm.find(".hdn_sendmode").val());
	values["TitleLead"] = htmlEncode(myForm.find(".hdn_titlelead").val());
	values["Canale"] = htmlEncode(myForm.find(".hdn_canale").val());
	values["Privacy"] = "true";
//AdditionalField
	values["AdditionalField1"] = htmlEncode($("#txt_add_field_1_html").val());
	values["AdditionalField2"] = htmlEncode($("#txt_add_field_2_html").val());
	values["AdditionalField3"] = htmlEncode($("#txt_add_field_3_html").val());
	values["AdditionalField4"] = htmlEncode($("#txt_add_field_4_html").val());
	values["AdditionalField1"] = htmlEncode(myForm.find(".txt_add_field_1_html").val());
	values["AdditionalField5"] = htmlEncode($("#txt_add_field_5_html").val());
	values["AdditionalField6"] = htmlEncode($("#txt_add_field_6_html").val());
	//FlagPrivacy
	if ($("div.ivecoForm #FlagPrivacy2").length >= 1) values["FlagPrivacy2"] = $($("div.ivecoForm #FlagPrivacy2")[0]).prop('checked');
	if ($("div.ivecoForm #FlagPrivacy3").length >= 1) values["FlagPrivacy3"] = $($("div.ivecoForm #FlagPrivacy3")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField4").length >= 1) values["AdditionalField4"] = $($("div.ivecoForm #AdditionalField4")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField5").length >= 1) values["AdditionalField5"] = $($("div.ivecoForm #AdditionalField5")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField6").length >= 1) values["AdditionalField6"] = $($("div.ivecoForm #AdditionalField6")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']").length == 2) values["FlagPrivacy2"] = "true";
	/*GDPR*/
	values["hdn_GDPR_version"] = htmlEncode($(".hdn_GDPR_version").val());
	values["hdn_GDPR_policies"] = htmlEncode($(".hdn_GDPR_policies").val());
    return values;
}
function readMoreInfoLanding() {
	var myForm = $(".btn-landing2__form.sendForm").parents("div.landing2--form__body");
    var values = {};
	values["Nome"] = htmlEncode(myForm.find(".txt_name_html").val());
	values["Cognome"] = htmlEncode(myForm.find(".txt_surname_html").val());
	values["Telefono"] = htmlEncode(myForm.find(".txt_phone_html").val());
	values["CompanyName"] = htmlEncode(myForm.find(".txt_company_html").val());
	values["Indirizzo"] = htmlEncode(myForm.find(".txt_address_html").val());
	values["Cap"] = htmlEncode(myForm.find(".txt_zip_html").val());
	values["Citta"] = htmlEncode(myForm.find(".txt_citta_html").val());
	values["Commenti"] = htmlEncode(myForm.find(".txt_comment_html").val());
	values["Email"] = htmlEncode(myForm.find(".txt_email_html").val());
	values["InitReportDetail"] = htmlEncode(myForm.find(".hdn_initreportdetail").val());
	values["InitReportSource"] = htmlEncode(myForm.find(".hdn_initreportsource").val());
	values["Promo"] = htmlEncode(myForm.find(".hdn_promo").val());
	values["PromoSource"] = htmlEncode(myForm.find(".hdn_promosource").val());
	values["CustomerLanguage"] = htmlEncode(myForm.find(".hdn_crmlanguage").val());
	values["Nazione"] = htmlEncode(myForm.find(".hdn_crmcountry").val());
	values["Brand"] = htmlEncode(myForm.find(".hdn_brand").val());
	values["To"] = htmlEncode(myForm.find(".hdn_to").val());
	values["Cc"] = htmlEncode(myForm.find(".hdn_cc").val());
	values["SendMode"] = htmlEncode(myForm.find(".hdn_sendmode").val());
	values["TitleLead"] = htmlEncode(myForm.find(".hdn_titlelead").val());
	values["Canale"] = htmlEncode(myForm.find(".hdn_canale").val());
	values["Privacy"] = "true";
	if (myForm.find("input[type='checkbox']").length == 2) values["FlagPrivacy2"] = "true";
    values["StockSearchedModel"] = getQS('utm_term', '');
	//AdditionalField
	values["AdditionalField1"] = htmlEncode(myForm.find(".txt_add_field_1_html").val());
	values["AdditionalField2"] = htmlEncode(myForm.find(".txt_add_field_2_html").val());
	values["AdditionalField3"] = htmlEncode(myForm.find(".txt_add_field_3_html").val());
	values["AdditionalField4"] = htmlEncode(myForm.find(".txt_add_field_4_html").val());
	values["AdditionalField5"] = htmlEncode(myForm.find(".txt_add_field_5_html").val());
	values["AdditionalField6"] = htmlEncode(myForm.find(".txt_add_field_6_html").val());
	/*GDPR*/
	values["hdn_GDPR_version"] = htmlEncode($(".hdn_GDPR_version").val());
	values["hdn_GDPR_policies"] = htmlEncode($(".hdn_GDPR_policies").val());
    return values;
}
function readProntaConsegna() {
    var values = {};
    values["Nome"] = htmlEncode($("#ctl00_PlaceHolderMainPageBody_frm_nome").val());
    values["Cognome"] = htmlEncode($("#ctl00_PlaceHolderMainPageBody_frm_cognome").val());
    values["Telefono"] = htmlEncode($("#ctl00_PlaceHolderMainPageBody_txtPhone").val());
    values["CompanyName"] = htmlEncode($("#ctl00_PlaceHolderMainPageBody_frm_textDataCompanyName").val());
    values["Indirizzo"] = htmlEncode($("#ctl00_PlaceHolderMainPageBody_frm_textIndirizzo").val());
    values["Cap"] = htmlEncode($("#ctl00_PlaceHolderMainPageBody_frm_textDataPostCode").val());
    values["Citta"] = htmlEncode($("#ctl00_PlaceHolderMainPageBody_frm_textCitta").val());
    values["Commenti"] = htmlEncode($("#ctl00_PlaceHolderMainPageBody_frm_textDataComment").val());
    values["Email"] = htmlEncode($("#ctl00_PlaceHolderMainPageBody_frm_email").val());
    values["InitReportDetail"] = htmlEncode($("#hdn_initreportdetail").val());
    values["InitReportSource"] = htmlEncode($("#hdn_initreportsource").val());
    values["Veicolo"] = htmlEncode($("#hdn_veicolo").val());
    values["Versione"] = htmlEncode($("#hdn_versione").val());
    values["Ptt"] = htmlEncode($("#hdn_ptt").val());
    values["Ruota"] = htmlEncode($("#hdn_ruota").val());
    values["Alimentazione"] = htmlEncode($("#hdn_alimentazione").val());
    values["Sospensioni"] = htmlEncode($("#hdn_sospensioni").val());
    values["Potenza"] = htmlEncode($("#hdn_potenza").val());
    values["Promo"] = htmlEncode($("#hdn_promo").val());
    values["PromoSource"] = htmlEncode($("#hdn_promosource").val());
    values["CustomerLanguage"] = htmlEncode($("#hdn_crmlanguage").val());
    values["Nazione"] = htmlEncode($("#hdn_crmcountry").val());
    values["Brand"] = htmlEncode($("#hdn_brand").val());
    values["Data"] = htmlEncode($("#hdn_data").val());
    values["TitleLead"] = htmlEncode($("#hdn_titlelead").val());
    values["Canale"] = htmlEncode($("#hdn_canale").val());
    values["Cabina"] = htmlEncode($("#hdn_cabina").val());
    values["Privacy"] = "true";
	//AdditionalField
	values["AdditionalField1"] = htmlEncode($("#txt_add_field_1_html").val());
	values["AdditionalField2"] = htmlEncode($("#txt_add_field_2_html").val());
	values["AdditionalField3"] = htmlEncode($("#txt_add_field_3_html").val());
	values["AdditionalField4"] = htmlEncode($("#txt_add_field_4_html").val());
	values["AdditionalField5"] = htmlEncode($("#txt_add_field_5_html").val());
	values["AdditionalField6"] = htmlEncode($("#txt_add_field_6_html").val());
	//FlagPrivacy
	if ($("div.ivecoForm #FlagPrivacy2").length >= 1) values["FlagPrivacy2"] = $($("div.ivecoForm #FlagPrivacy2")[0]).prop('checked');
	if ($("div.ivecoForm #FlagPrivacy3").length >= 1) values["FlagPrivacy3"] = $($("div.ivecoForm #FlagPrivacy3")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField4").length >= 1) values["AdditionalField4"] = $($("div.ivecoForm #AdditionalField4")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField5").length >= 1) values["AdditionalField5"] = $($("div.ivecoForm #AdditionalField5")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField6").length >= 1) values["AdditionalField6"] = $($("div.ivecoForm #AdditionalField6")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']").length == 2) values["FlagPrivacy2"] = "true";
	/*GDPR*/
	values["hdn_GDPR_version"] = htmlEncode($("#hdn_GDPR_version").val());
	values["hdn_GDPR_policies"] = htmlEncode($("#hdn_GDPR_policies").val());
    return values;
}
function readMoreInfoConfigurators() {
    var myForm = $("aside.myFormContainer a.sendForm:visible").parents("aside.myFormContainer");
    var values = {};
    values["Nome"] = htmlEncode(myForm.find(".txt_name_html").val());
    values["Cognome"] = htmlEncode(myForm.find(".txt_surname_html").val());
    values["Telefono"] = htmlEncode(myForm.find(".txt_phone_html").val());
    values["CompanyName"] = htmlEncode(myForm.find(".txt_company_html").val());
    values["Indirizzo"] = htmlEncode(myForm.find(".txt_address_html").val());
    values["Cap"] = htmlEncode(myForm.find(".txt_zip_html").val());
    values["Citta"] = htmlEncode(myForm.find(".txt_citta_html").val());
    values["Commenti"] = htmlEncode(myForm.find(".txt_comment_html").val());
    values["Email"] = htmlEncode(myForm.find(".txt_email_html").val());
    values["InitReportDetail"] = '';

    if ($(".missionConfiguratorPage").length > 0) //Mission Configurator
    {
        var arScelte = IVECO.missionConfigurator.getArScelte();
        var stepMission = IVECO.missionConfigurator.getStepMission();
        values["InitReportDetail"] = arScelte[stepMission];
        values["ModelloInteresse"] = '';
        $(".cc-summary-recap .row :nth-child(2)").each(function () { values["ModelloInteresse"] += $(this).text() + ';'; });
        if (values["ModelloInteresse"].length > 0)
            values["ModelloInteresse"] = values["ModelloInteresse"].substring(0, values["ModelloInteresse"].length - 1);
    }
    else //Configurator and Stock Availability
    {
        $(".configurator__suggestions .configurator__suggestion__code").each(function (i, item) { values["InitReportDetail"] += $(item).text() + ','; });
        if (values["InitReportDetail"].length > 0)
            values["InitReportDetail"] = values["InitReportDetail"].substring(0, values["InitReportDetail"].length - 1);

        values["ModelloInteresse"] = '';
        $(".cc-summary-recap .row :nth-child(2)").each(function () { values["ModelloInteresse"] += $(this).text() + ';'; });
        if (values["ModelloInteresse"].length > 0)
            values["ModelloInteresse"] = values["ModelloInteresse"].substring(0, values["ModelloInteresse"].length - 1);

        values["LDP"] = "";
        values["Gamma"] = "";
        values["Comm_Segm"] = "";
        var whereList = IVECO.configurator.getWhereList();
        var arAttrs = IVECO.configurator.getArAttrs();
        if (jQuery.inArray("LDP", arAttrs) != -1) {
            $.each(whereList.items, function (i, item) { values["LDP"] += item.LDP + "|"; values["Gamma"] += item.Gamma + "|"; values["Comm_Segm"] += item.Comm_Segm + "|"; });
            if (values["LDP"].length > 0)
                values["LDP"] = values["LDP"].substring(0, values["LDP"].length - 1).replace(/null/g, "");
            if (values["Gamma"].length > 0)
                values["Gamma"] = values["Gamma"].substring(0, values["Gamma"].length - 1).replace(/null/g, "");
            if (values["Comm_Segm"].length > 0)
                values["Comm_Segm"] = values["Comm_Segm"].substring(0, values["Comm_Segm"].length - 1).replace(/null/g, "");
        }
    }
    values["InitReportSource"] = htmlEncode(myForm.find(".hdn_initreportsource").val());
    values["Promo"] = htmlEncode(myForm.find(".hdn_promo").val());
    values["PromoSource"] = htmlEncode(myForm.find(".hdn_promosource").val());
    values["CustomerLanguage"] = htmlEncode(myForm.find(".hdn_crmlanguage").val());
    values["Nazione"] = htmlEncode(myForm.find(".hdn_crmcountry").val());
    values["Brand"] = htmlEncode(myForm.find(".hdn_brand").val());
    values["Data"] = htmlEncode(myForm.find(".hdn_data").val());
    values["To"] = htmlEncode(myForm.find(".hdn_to").val());
    values["Cc"] = htmlEncode(myForm.find(".hdn_cc").val());
    values["SendMode"] = htmlEncode(myForm.find(".hdn_sendmode").val());
    values["TitleLead"] = htmlEncode(myForm.find(".hdn_titlelead").val());
    values["Canale"] = htmlEncode(myForm.find(".hdn_canale").val());
    values["Privacy"] = "true";
	//AdditionalField
	values["AdditionalField1"] = htmlEncode($("#txt_add_field_1_html").val());
	values["AdditionalField2"] = htmlEncode($("#txt_add_field_2_html").val());
	values["AdditionalField3"] = htmlEncode($("#txt_add_field_3_html").val());
	values["AdditionalField4"] = htmlEncode($("#txt_add_field_4_html").val());
	values["AdditionalField5"] = htmlEncode($("#txt_add_field_5_html").val());
	values["AdditionalField6"] = htmlEncode($("#txt_add_field_6_html").val());
	//FlagPrivacy
	if ($("div.ivecoForm #FlagPrivacy2").length >= 1) values["FlagPrivacy2"] = $($("div.ivecoForm #FlagPrivacy2")[0]).prop('checked');
	if ($("div.ivecoForm #FlagPrivacy3").length >= 1) values["FlagPrivacy3"] = $($("div.ivecoForm #FlagPrivacy3")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField4").length >= 1) values["AdditionalField4"] = $($("div.ivecoForm #AdditionalField4")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField5").length >= 1) values["AdditionalField5"] = $($("div.ivecoForm #AdditionalField5")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField6").length >= 1) values["AdditionalField6"] = $($("div.ivecoForm #AdditionalField6")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']").length == 2) values["FlagPrivacy2"] = "true";
	/*GDPR*/
	values["hdn_GDPR_version"] = htmlEncode($(".hdn_GDPR_version").val());
	values["hdn_GDPR_policies"] = htmlEncode($(".hdn_GDPR_policies").val());
    return values;
}
function getLeadType(lType) {
	if(lType.indexOf("moreinformation") != -1) return 'moreinformation';
	else if(lType.indexOf("stock") != -1)	return 'stock';
	else if(lType.indexOf("mission") != -1) return 'mission';
	//else if(lType.indexOf("trovaveicolo") != -1) return 'trovaveicolo';
	else if(lType.indexOf("trovaveicolo") != -1) return 'configurator';
	else if(lType.indexOf("promo") != -1) return 'promo';
	else if(lType.indexOf("landing") != -1) return 'landing';
	else if(lType.indexOf("contactusused_") != -1 || lType.indexOf("contactusused") != -1) return 'contactusused';
	else if(lType.indexOf("contactus") != -1) return 'contactus';
	else if(lType.indexOf("contactpopup") != -1) return 'contactpopup';
	else return lType;
}
function getMarket(lType) {
	if(lType.indexOf("moreinformation") != -1) return lType.replace('moreinformation','');
	else if(lType.indexOf("stock") != -1)	return lType.replace('stock','');
	else if(lType.indexOf("mission") != -1) return lType.replace('mission','');
	else if(lType.indexOf("trovaveicolo") != -1) return lType.replace('trovaveicolo','');
	else if(lType.indexOf("promo") != -1) return lType.replace('promo','');
	else if(lType.indexOf("landing") != -1) return lType.replace('landing','');
	else if(lType.indexOf("contactusused_") != -1) return lType.replace('contactusused_','');
	else if(lType.indexOf("contactusused") != -1) return lType.replace('contactusused','');
	else if(lType.indexOf("contactus") != -1) return lType.replace('contactus','');
	else if(lType.indexOf("contactpopup") != -1) return lType.replace('contactpopup','');
	else return lType;
}
function hideLead(data) {
    var obj = $(data);
    var result = obj.find('#status').text();
    var newbox;
	var lType = $("#hdn_titlelead, .hdn_titlelead").val().toLowerCase();
	if (typeof(dataLayer) != "undefined"){
		var dlLeadType = getLeadType(lType);
		var dlMarket = getMarket(lType);		
		dataLayer.push({
			'event' : 'formSubmit',
			'formName' : dlLeadType,
			'market' : dlMarket,
			'formStatus' : ($.trim(result) == 'OK' || $.trim(data) == 'OK') ? 'Submit' : 'Error'
		});
	}
    if ($.trim(result) == 'OK' || $.trim(data) == 'OK') {
        newbox = $('.success_box:first');
		if (lType.indexOf("stock") != -1) {
			if(typeof window.ga == 'undefined') { 
				var ga = function(a){ return true; }
				ga("send", "pageview", marketName + "-pconsegna/" + IVECO.configurator.getVehicle() + "/quote/ok");
			}
			else
				window.ga("send", "pageview", marketName + "-pconsegna/" + IVECO.configurator.getVehicle() + "/quote/ok");
		}
		else if (lType.indexOf("mission") != -1) {
			if(typeof window.ga == 'undefined') { 
				var ga = function(a){ return true; }
				ga("send", "pageview", marketName + "-mission/" + IVECO.missionConfigurator.getVehicle() + "/quote/ok");
			}
			else
				window.ga("send", "pageview", marketName + "-mission/" + IVECO.missionConfigurator.getVehicle() + "/quote/ok");
		}
		else if (lType.indexOf("trovaveicolo") != -1) {
			if(typeof window.ga == 'undefined') { 
				var ga = function(a){ return true; }
				ga("send", "pageview", marketName + "-config/" + IVECO.configurator.getVehicle() + "/quote/ok");
			}
			else
				window.ga("send", "pageview", marketName + "-config/" + IVECO.configurator.getVehicle() + "/quote/ok");
		}
        else if (lType.indexOf("landing") !=-1){
			dataLayer.push({'event': 'INVIO_FORM_LEAD','order_id': obj.find('#idSharepoint').text().trim(),'filledFormIndex': getCurrentDevice() + ' - Above the fold'});
			dataLayer.push({'event': 'VirtualPageview','virtualPageURL': '/' + pageName.substring(0,pageName.lastIndexOf(".")) + '/form-submission','virtualPageTitle': 'Step 1 - Contact Information'});
		}
		else {
			if(typeof window.ga == 'undefined') { 
				var ga = function(a){ return true; }
				ga("send", "pageview", marketName + "/form-info/" + pageName + "/ok");
			}
			else	
				window.ga("send", "pageview", marketName + "/form-info/" + pageName + "/ok");
		}


		/*script facebook*/
		if(marketName == 'italy' && typeof window._fbq !== 'undefined' && typeof window._fbq.push !== 'undefined'){
			window._fbq = window._fbq || [];
			//window._fbq.push(['track', '6027366590176', {'value':'0.00','currency':'EUR'}]);
			window._fbq.push(['track', '629981317051676', {'value':'0.00','currency':'EUR'}]);
			//console.log(['track', '6027366590176', {'value':'0.00','currency':'EUR'}]);
		}
    }
    else {
        newbox = $('.error_box:first');
		if (lType.indexOf("stock") != -1) {
			if(typeof window.ga == 'undefined') { 
				var ga = function(a){ return true; }
				ga("send", "event", marketName + "-config", "quote-" + IVECO.configurator.getVehicle(), "err-errore");
			}
			else
				window.ga("send", "event", marketName + "-config", "quote-" + IVECO.configurator.getVehicle(), "err-errore");
		}
		else if (lType.indexOf("mission") != -1) {
			if(typeof window.ga == 'undefined') { 
				var ga = function(a){ return true; }
				ga("send", "event", marketName + "-mission", IVECO.missionConfigurator.getVehicle() + "/" + pageName, "err-errore");
			}
			else
				window.ga("send", "event", marketName + "-mission", IVECO.missionConfigurator.getVehicle() + "/" + pageName, "err-errore");
		}
		else if (lType.indexOf("trovaveicolo") != -1) {
			if(typeof window.ga == 'undefined') { 
				var ga = function(a){ return true; }
				ga("send", "event", marketName + "-pconsegna", "quote-" + IVECO.configurator.getVehicle(), "err-errore");
			}
			else
				window.ga("send", "event", marketName + "-pconsegna", "quote-" + IVECO.configurator.getVehicle(), "err-errore");
		}
        else if (lType.indexOf("landing") !=-1){
			//TBD
		}
		else {
			if(typeof window.ga == 'undefined') { 
				var ga = function(a){ return true; }
				ga("send", "event", marketName + "-form-info", pageName, "err-errore");
			}
			else
				window.ga("send", "event", marketName + "-form-info", pageName, "err-errore");
		}
    }
	if($('#layout-landing').length==0)
		$('.start_box').html(newbox.html());
	else
	{
		$('.start_box').addClass("hidden");
		newbox.removeClass("hidden");
	}

    if (typeof jQuery.data(this, "disabledOnSubmit") != 'undefined')
        jQuery.removeData(this, "disabledOnSubmit");
}
function handleClose(hash) {
    hideLead('OK');
    if ($('.hdn_urlnext, #hdn_urlnext').val() != undefined)
        window.location.href = $('#hdn_urlnext').val();
    hash.w.remove();
    hash.o.remove();
}
function closeLead(data) {
    var obj = $(data);
    var result = obj.find('#status').text();
    if ($.trim(result) == 'OK' || $.trim(data) == 'OK') {
		if ($('.hdn_urlnext, #hdn_urlnext').val() != undefined)
			window.location.href = $('.hdn_urlnext, #hdn_urlnext').val();
		hideLead(data);
    }
	if ($.trim(result) == 'KO' || $.trim(data) == 'KO') {
		/*if ($('.hdn_urlnext, #hdn_urlnext').val() != undefined) window.location.href = $('.hdn_urlnext, #hdn_urlnext').val(); */
		hideLead(data);
	}
}
function readMoreInfoA1() {
    var values = {};
    values["Nome"] = htmlEncode($("#id_nome").val());
    values["Cognome"] = htmlEncode($("#id_cognome").val());
    values["Telefono"] = htmlEncode($("#id_telefono").val());
    values["Email"] = htmlEncode($("#id_email").val());
    values["InitReportDetail"] = htmlEncode($("#hdn_initreportdetail").val());
    values["InitReportSource"] = htmlEncode($("#hdn_initreportsource").val());
    values["Promo"] = htmlEncode($("#hdn_promo").val());
    values["PromoSource"] = htmlEncode($("#hdn_promosource").val());
    values["CustomerLanguage"] = htmlEncode($("#hdn_crmlanguage").val());
    values["Nazione"] = htmlEncode($("#hdn_crmcountry").val());
    values["Brand"] = htmlEncode($("#hdn_brand").val());
    values["Data"] = htmlEncode($("#hdn_data").val());
    values["To"] = htmlEncode($("#hdn_to").val());
    values["Cc"] = htmlEncode($("#hdn_cc").val());
    values["SendMode"] = htmlEncode($("#hdn_sendmode").val());
    values["TitleLead"] = htmlEncode($("#hdn_titlelead").val());
    values["Canale"] = htmlEncode($("#hdn_canale").val());
	//AdditionalField
	values["AdditionalField1"] = htmlEncode($("#txt_add_field_1_html").val());
	values["AdditionalField2"] = htmlEncode($("#txt_add_field_2_html").val());
	values["AdditionalField3"] = htmlEncode($("#txt_add_field_3_html").val());
	values["AdditionalField4"] = htmlEncode($("#txt_add_field_4_html").val());
	values["AdditionalField5"] = htmlEncode($("#txt_add_field_5_html").val());
	values["AdditionalField6"] = htmlEncode($("#txt_add_field_6_html").val());	
    values["Privacy"] = "true";
    if ($("div.ivecoForm #FlagPrivacy2").length >= 1) values["FlagPrivacy2"] = $($("div.ivecoForm #FlagPrivacy2")[0]).prop('checked');
	if ($("div.ivecoForm #FlagPrivacy3").length >= 1) values["FlagPrivacy3"] = $($("div.ivecoForm #FlagPrivacy3")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField4").length >= 1) values["AdditionalField4"] = $($("div.ivecoForm #AdditionalField4")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField5").length >= 1) values["AdditionalField5"] = $($("div.ivecoForm #AdditionalField5")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField6").length >= 1) values["AdditionalField6"] = $($("div.ivecoForm #AdditionalField6")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']").length == 2) values["FlagPrivacy2"] = "true";
	/*GDPR*/
	values["hdn_GDPR_version"] = htmlEncode($("#hdn_GDPR_version").val());
	values["hdn_GDPR_policies"] = htmlEncode($("#hdn_GDPR_policies").val());
    return values;
}
function readMoreInfoA2() {
    var values = {};
    values["Nome"] = htmlEncode($("#id_nome").val());
    values["Cognome"] = htmlEncode($("#id_cognome").val());
    values["Telefono"] = htmlEncode($("#id_telefono").val());
    values["Email"] = htmlEncode($("#id_email").val());
    values["CompanyName"] = htmlEncode($("#id_ragione").val());
    values["Indirizzo"] = htmlEncode($("#id_via").val());
    values["Cap"] = htmlEncode($("#id_cap").val());
    values["Citta"] = htmlEncode($("#id_citta").val());
    values["Commenti"] = htmlEncode($("#id_commenti").val());
    values["InitReportDetail"] = htmlEncode($("#hdn_initreportdetail").val());
    values["InitReportSource"] = htmlEncode($("#hdn_initreportsource").val());
    values["Promo"] = htmlEncode($("#hdn_promo").val());
    values["PromoSource"] = htmlEncode($("#hdn_promosource").val());
    values["CustomerLanguage"] = htmlEncode($("#hdn_crmlanguage").val());
    values["Nazione"] = htmlEncode($("#hdn_crmcountry").val());
    values["Brand"] = htmlEncode($("#hdn_brand").val());
    values["Data"] = htmlEncode($("#hdn_data").val());
    values["To"] = htmlEncode($("#hdn_to").val());
    values["Cc"] = htmlEncode($("#hdn_cc").val());
    values["SendMode"] = htmlEncode($("#hdn_sendmode").val());
    values["TitleLead"] = htmlEncode($("#hdn_titlelead").val());
    values["Canale"] = htmlEncode($("#hdn_canale").val());
    values["Privacy"] = "true";
	//AdditionalField
	values["AdditionalField1"] = htmlEncode($("#txt_add_field_1_html").val());
	values["AdditionalField2"] = htmlEncode($("#txt_add_field_2_html").val());
	values["AdditionalField3"] = htmlEncode($("#txt_add_field_3_html").val());
	values["AdditionalField4"] = htmlEncode($("#txt_add_field_4_html").val());
	values["AdditionalField5"] = htmlEncode($("#txt_add_field_5_html").val());
	values["AdditionalField6"] = htmlEncode($("#txt_add_field_6_html").val());	
    if ($("div.ivecoForm #FlagPrivacy2").length >= 1) values["FlagPrivacy2"] = $($("div.ivecoForm #FlagPrivacy2")[0]).prop('checked');
	if ($("div.ivecoForm #FlagPrivacy3").length >= 1) values["FlagPrivacy3"] = $($("div.ivecoForm #FlagPrivacy3")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField4").length >= 1) values["AdditionalField4"] = $($("div.ivecoForm #AdditionalField4")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField5").length >= 1) values["AdditionalField5"] = $($("div.ivecoForm #AdditionalField5")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField6").length >= 1) values["AdditionalField6"] = $($("div.ivecoForm #AdditionalField6")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']").length == 2) values["FlagPrivacy2"] = "true";
	/*GDPR*/
	values["hdn_GDPR_version"] = htmlEncode($("#hdn_GDPR_version").val());
	values["hdn_GDPR_policies"] = htmlEncode($("#hdn_GDPR_policies").val());
    return values;
}
function readMoreInfoA3() {
    var values = {};
    values["Nome"] = htmlEncode($("#id_nome").val());
    values["Cognome"] = htmlEncode($("#id_cognome").val());
    values["Telefono"] = htmlEncode($("#id_telefono").val());
    values["Email"] = htmlEncode($("#id_email").val());
    values["InitReportDetail"] = htmlEncode($("#hdn_initreportdetail").val());
    values["InitReportSource"] = htmlEncode($("#hdn_initreportsource").val());
    values["Promo"] = htmlEncode($("#hdn_promo").val());
    values["PromoSource"] = htmlEncode($("#hdn_promosource").val());
    values["CustomerLanguage"] = htmlEncode($("#hdn_crmlanguage").val());
    values["Nazione"] = htmlEncode($("#hdn_crmcountry").val());
    values["Brand"] = htmlEncode($("#hdn_brand").val());
    values["Data"] = htmlEncode($("#hdn_data").val());
    values["To"] = htmlEncode($("#hdn_to").val());
    values["Cc"] = htmlEncode($("#hdn_cc").val());
    values["SendMode"] = htmlEncode($("#hdn_sendmode").val());
    values["TitleLead"] = htmlEncode($("#hdn_titlelead").val());
    values["Canale"] = htmlEncode($("#hdn_canale").val());
	//AdditionalField
	//values["AdditionalField1"] = htmlEncode($("#txt_add_field_1_html").val());
	values["AdditionalField1"] = htmlEncode($("#id_country").val());
	values["AdditionalField2"] = htmlEncode($("#txt_add_field_2_html").val());
	values["AdditionalField3"] = htmlEncode($("#txt_add_field_3_html").val());
	values["AdditionalField4"] = htmlEncode($("#txt_add_field_4_html").val());
	values["AdditionalField5"] = htmlEncode($("#txt_add_field_5_html").val());
	values["AdditionalField6"] = htmlEncode($("#txt_add_field_6_html").val());	
    values["Privacy"] = "true";
    if ($("div.ivecoForm #FlagPrivacy2").length >= 1) values["FlagPrivacy2"] = $($("div.ivecoForm #FlagPrivacy2")[0]).prop('checked');
	if ($("div.ivecoForm #FlagPrivacy3").length >= 1) values["FlagPrivacy3"] = $($("div.ivecoForm #FlagPrivacy3")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField4").length >= 1) values["AdditionalField4"] = $($("div.ivecoForm #AdditionalField4")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField5").length >= 1) values["AdditionalField5"] = $($("div.ivecoForm #AdditionalField5")[0]).prop('checked');
	//183601 - Form checkbox data not saving in the list issue
	if ($("div.ivecoForm input[type='checkbox']#AdditionalField6").length >= 1) values["AdditionalField6"] = $($("div.ivecoForm #AdditionalField6")[0]).prop('checked');
	if ($("div.ivecoForm input[type='checkbox']").length == 2) values["FlagPrivacy2"] = "true";
	/*GDPR*/
	values["hdn_GDPR_version"] = htmlEncode($("#hdn_GDPR_version").val());
	values["hdn_GDPR_policies"] = htmlEncode($("#hdn_GDPR_policies").val());
    return values;
}
function saveLead(url, values) {
    $.post(url, values,
        function (data) {
            var obj = $(data);
            var result = obj.find('#status').text();
            if ($.trim(result) == 'OK') {
                var feed = $('#hdn_feedbackOK').val();
                $('#lbl_message').text(feed);
                $("#lbl_message").removeAttr("style")
                $('#ph_form').remove();
            }
            else {
                var errMsg = obj.find('#errMsg').text();
                $('#lbl_message').text(errMsg);
                $("#lbl_message").removeAttr("style")
            }
        }
    );
    return false;
}
function OpenPopup(u, w, h) {
    var l = Math.floor((screen.width - w) / 2);
    var t = Math.floor((screen.height - h) / 2);
    window.open(u, "", "width=" + w + ",height=" + h + ",top=" + t + ",left=" + l + ", scrollbars=yes");
    return false;
}
function rDoAjax(url, params, dest) {
    var date = new Date();

    if (!params)
        params = {};

    params.ts = date.getTime();

    $.ajax({
        url: url,
        data: params,
        type: 'GET',
        success: function (data) {
            $('#' + dest).html(data);
        },
        error: function (req, descr, ex) {
            $('#' + dest).html('error');
        }
    });
}
function checkNumber(input) {
    while (input.value.length > 0 && !input.value.match(/^[0-9]+$/))
        input.value = input.value.substring(0, input.value.length - 1);
}
function CountryGo(option) {
    if (option.selectedIndex != '0') {
        window.location = option[option.selectedIndex].value;
    }

}
function Navigate(url) {
    window.location = url + '?email=' + $(".fi_reg_nwl").val();
    return false;
}
function reloadImg(id) {
    var obj = document.getElementById(id);
    var src = obj.src;
    var pos = src.indexOf('?');
    if (pos >= 0) {
        src = src.substr(0, pos);
    }
    var date = new Date();
    obj.src = src + '?v=' + date.getTime();
    return false;
}
function sendAndVerifyLead(a, b, c, d) {
    $("#txtCodVer").parent(".form-group").removeClass('has-error');
	$("#txtCodVer").parent(".form-gdpr").removeClass('has-error');
    $.ajax({
        cache: false, 
		type: "GET",
		url: '/common/pages/recaptcha.aspx',
		data: 'IsToVerify=1&ReCaptcha=' + $('.g-recaptcha-response').val() + '&Market=' + a,
		success: function (data) {
            if ($.trim(data) == 'captcha_ok')
                sendLead(a,c,d);
			else
				grecaptcha.reset()
        }
    });
}
function internationalContactMarketChange(sel, ContactAjaxPage, xslPath) {
    //var ContactAjaxPage = '<asp:Literal runat="server" Text="<% $SPUrl:~site/_layouts/15/Iveco/AreaPressInternationalContacts.aspx %>" />';
    //var xslPath = '<asp:Literal runat="server" Text="<% $SPUrl:~SiteCollection/StyleLibrary/Xsl Style Sheets/xslFiles/IvecoInternationalContacts.xsl%>" />';
    $.ajax({ cache: false, type: "GET", url: ContactAjaxPage, data: "xslPath=" + xslPath + "&Market=" + sel.value, success: function (data) { $('#divRetContact').html(data); } });
}
function loadContactsTechSheet(sel, tap, xp, ip) { if (sel.value != "-") { $.ajax({ cache: false, type: "GET", url: tap, data: "xslPath=" + xp + "&IconPath=" + ip + "&Category=" + sel.value, success: function (data) { $('#TechAjaxRet').html(data); } }); } }
function rDoAjaxPromo(cat, subCat) {
	var loader = $("#PromLoader"), dest = $("#PromTarget");
    loader.height(522).show();
    var params = {};
    params.ts = +new Date();
	params.category = cat;
	params.subCategory = subCat;
    dest.hide();
	
	var urlService = "../_layouts/15/Iveco/PromList.aspx";
	if($('.partsPromoTabs').length > 0 )	
		urlService = "../_layouts/15/Iveco/PromPartsAndServiceList.aspx";
	
    $.ajax({
        //url: '../_layouts/15/Iveco/PromList.aspx',
		url: urlService,
        data: params,
        type: 'GET',
        success: function (data) {
            loader.hide();
            dest.empty().html(data);
            dest.find("input").click(function () {
                var subCat = "";
				var _thatID = $(this).attr("name").replace("tab_","");
                $("#filters input[checked='checked']").each(function () { 
					if(_thatID != $(this).attr("name").replace("tab_",""))
						subCat += $(this).attr("name").replace("tab_","") + "|"; 
				});
                if ($(this).prop('checked')) subCat += _thatID;
                rDoAjaxPromo($(".rich-tabs__nav .active a").attr("href").replace("#",""),subCat);
            });
            if (params.subCategory != undefined && params.subCategory != "") {
                var arr = params.subCategory.split("|");
                for (var i = 0; i < arr.length; i++) $("#filters input[name='tab_" + arr[i] + "']").attr('checked', true);
            }
			setGridItemHeight();
			dest.find("img").load(setGridItemHeight);
            dest.show();
        },
        error: function (req, descr, ex) {
            loader.hide();
            dest.html('error').show();
        }
    });
}
function handleMobileMoreContent() { if ($('.more-content-mobile').length) $('.more-content-desktop').addClass('hidden-xs'); if ($('.text-center-mobile').length) $('.text-center-desktop').addClass('hidden-xs');}
function syncPromoTab(){
	if ($(".rich-tabs__nav").length == 0) return;
	$(window).on('resize',setGridItemHeight);
	var promoTab = getQS('pos', 1) - 1;
	if(isNaN(promoTab)) promoTab = 0;
	var count = $(".rich-tabs__nav li").length;
	if (promoTab < 0 || promoTab >= count) promoTab = 0;
	$(".rich-tabs__nav li").click(function () {
		var _that = $(this);
		if(typeof window.ga == 'undefined') { 
			var ga = function(a){ return true; }
			ga('send', 'pageview', '' + marketName + "/promo/tab/" + _that.find("span").text() + '');
		}
		else
			window.ga('send', 'pageview', '' + marketName + "/promo/tab/" + _that.find("span").text() + '');
		$(".rich-tabs__nav li").removeClass("active");
		_that.addClass("active");
		$("select.form-control option:eq("+_that.index()+")").attr('selected', 'selected');
		rDoAjaxPromo(_that.find("a").attr("href").replace("#",""),"");
	}).eq(promoTab).click();
}
function setGridItemHeight(){
	var $list = $('.js-offers-grid-list');
	if($list.length==0) return;
	var $items = $list.children('li');
	$items.css('height', 'auto').css('opacity',1);
	var perRow = Math.floor($list.width() / $items.width());
	if (perRow == null || perRow < 2) return;
	for (var i = 0, j = $items.length; i < j; i += perRow) {
		var maxHeight = 0, $row = $items.slice(i, i + perRow);
		$row.each(function () {
			var itemHeight = parseInt($(this).outerHeight());
			if (itemHeight > maxHeight) maxHeight = itemHeight;
		});
		$row.css('height', maxHeight);
	};
	
}
var globalData;
var globalTargetOffsetTop;
function showCalendar(calendarUrl, data) {
	/*globalTargetOffsetTop = $('#layout-landing').length ? $('.landing-contact-box').offset().top : $('.internal-main-wrap').offset().top;$.ajax({ type: "GET", url: calendarUrl, contentType: "text/xml; charset=utf-8", dataType: "text", success: onCalendarSuccess, failure: onCalendarFailure});globalData = data;*/
}
function onCalendarSuccess(response) {
	
}
$(document).ready(function () {
	$(".trakker-config-box #mySelect").change(function(){
		if ($(this).val()!='') { window.location.href=$(this).val(); }
	});
	$(".trakker-configurator-HP #mySelect").change(function(){
		if ($(this).val()!='') { window.location.href=$(this).val(); }
	});
    formValidation();
    handleMobileMoreContent();
	syncPromoTab();
	if(typeof $(".fancybox").fancybox != "undefined"){
		$(".fancybox").fancybox({ type :'iframe', iframe: { preload: false }});
	}
	PopupAndContactUsManager();
	if(document.location.host == "auth.iveco.com"
	|| document.location.host == "auth.cert.iveco.com"
	||document.location.host == "auth.rwd.iveco.com") {
		EditIvecoSingleContent();
		EditIvecoContent();
		ManageIvecoDDLButton();
		EditIvecoDoubleContent();
	}
	if(getQS("cookienotice") === "yes") cookieNoticeOpen();
});
var intervalCookiebot = setInterval(function(){ if(document.getElementById('CybotCookiebotDialogBodyButtonDetails') != null) cookiebotCustomTab(); }, 500);

function cookiebotCustomTab() {
	if( typeof(CookieConsent) !== 'undefined') {
		CookieConsent.dialog.lastUpdatedText = "";
		switch(CookieConsent.dialog.userLanguage.toLowerCase()) {
			case 'be': 
			case 'bg':
			case 'cs':
			case 'da':
			case 'de':
			case 'es':
			case 'et':
			case 'it':
			case 'fi':
			case 'fr':
			case 'hr':
			case 'lt':
			case 'lv':
			case 'nb':
			case 'nl':
			case 'pl':
			case 'pt':
			case 'ro':
			case 'sk':
			case 'sl':
			case 'sv': //sv-se
			case 'uk': //en-uk	
			case 'en':
			case 'ko':
				var pass = 0;								
				window.addEventListener('CookiebotOnDialogDisplay', function (e) {
					CookieConsent.dialog.showDetailPane('about');
				});
				$('#CybotCookiebotDialogBodyButtonDetails').click(function(){
					CookieConsent.dialog.showDetailPane('about');
				});		
				$('#CybotCookiebotDialogDetailBodyContentTabsOverview').click(function(){
					if( typeof(CookieConsent) !== 'undefined' && Cookiebot.consent.stamp == 0 && pass == 0) {
						pass = 1;
						$('#CybotCookiebotDialogBodyLevelButtonPreferences').trigger('click');
						$('#CybotCookiebotDialogBodyLevelButtonStatistics').trigger('click');
						$('#CybotCookiebotDialogBodyLevelButtonMarketing').trigger('click');
						CookieConsent.dialog.showDetailPane('overview');
					}
				});
				break;
		}
	}
	clearInterval(intervalCookiebot);
}
function openPopUpForm(url) {
	if(typeof $(".various").fancybox != "undefined") {
		if(url != '') {
			$(".various").attr('href', url);
			$(".various").fancybox({
				maxWidth	: 800,
				maxHeight	: 420,
				fitToView	: false,
				width		: '80%',
				height		: '80%',
				autoSize	: false,
				autoScale	: true,
				closeClick	: false,
				openEffect	: 'none',
				closeEffect	: 'none'
			});
			$(".various").trigger( "click" );
		}
	}
}

function EditIvecoContent(){
	if($('#rbCtaList').length > 0) {
		if($('#rbCtaList_0')[0].checked == true){$('.divbtn').hide();$('#txtCtaLabel').hide();$('.divbtnurl').hide();$('#txtCtaUrl').hide();$('.divbtntarget').hide();$('#ddlCtaTarget').hide();$('#ddlCtaPosition').hide();$('.divbtnid').hide();$('#txtCtaId').hide();$('.divbtncss').hide();$('#txtCtaCss').hide();}
		if($('#rbCtaList_1')[0].checked == true){$('.divbtn').show();$('#txtCtaLabel').show();$('.divbtnurl').hide();$('#txtCtaUrl').hide();$('.divbtntarget').hide();$('#ddlCtaTarget').hide();$('#ddlCtaPosition').hide();$('.divbtnid').show();$('#txtCtaId').show();$('.divbtncss').show();$('#txtCtaCss').show();}
		if($('#rbCtaList_2')[0].checked == true){$('.divbtn').show();$('#txtCtaLabel').show();$('.divbtnurl').show();$('#txtCtaUrl').show();$('.divbtntarget').show();$('#ddlCtaTarget').show();$('#ddlCtaPosition').show();$('.divbtnid').show();$('#txtCtaId').show();$('.divbtncss').show();$('#txtCtaCss').show();}
		if($('#rbCtaList_0').length > 0){$('#rbCtaList_0').on('click', function(){if($('#rbCtaList_0')[0].checked == true){$('.divbtn').hide();$('#txtCtaLabel').hide();$('.divbtnurl').hide();$('#txtCtaUrl').hide();$('.divbtntarget').hide();$('#ddlCtaTarget').hide();$('#ddlCtaPosition').hide();$('.divbtnid').hide();$('#txtCtaId').hide();$('.divbtncss').hide();$('#txtCtaCss').hide();}});}
		if($('#rbCtaList_1').length > 0){ $('#rbCtaList_1').on('click', function(){if($('#rbCtaList_1')[0].checked == true){$('.divbtn').show();$('#txtCtaLabel').show();$('.divbtnurl').hide();$('#txtCtaUrl').hide();$('.divbtntarget').hide();$('#ddlCtaTarget').hide();$('#ddlCtaPosition').hide();$('.divbtnid').show();$('#txtCtaId').show();$('.divbtncss').show();$('#txtCtaCss').show();}});}
		if($('#rbCtaList_2').length > 0){ $('#rbCtaList_2').on('click', function(){if($('#rbCtaList_2')[0].checked == true) {$('.divbtn').show();$('#txtCtaLabel').show();$('.divbtnurl').show();$('#txtCtaUrl').show();$('.divbtntarget').show();$('#ddlCtaTarget').show();$('#ddlCtaPosition').show();$('.divbtnid').show();$('#txtCtaId').show();$('.divbtncss').show();$('#txtCtaCss').show();}});}
	}
	
	$('#baseButtonPanel').show();
	
	if($('#rbCtaList_firstButton').length > 0) {
		if($('#rbCtaList_firstButton_0')[0].checked == true){$('#firstCustomButtondivbtn').hide();$('#firstCustomButtontxtCtaLabel').hide();$('#firstCustomButtondivbtnurl').hide();$('#firstCustomButtontxtCtaUrl').hide();$('#firstCustomButtondivbtntarget').hide();$('#firstCustomButtonddlCtaTarget').hide();$('#firstCustomButtondivbtnid').hide();$('#firstCustomButtontxtCtaId').hide();$('#firstCustomButtondivbtncss').hide();$('#firstCustomButtontxtCtaCss').hide();$('#firstCustomButtondivbtnpromo').hide();$('#firstCustomButtonddlCtaPromo').hide();}
		if($('#rbCtaList_firstButton_1')[0].checked == true){$('#firstCustomButtondivbtn').show();$('#firstCustomButtontxtCtaLabel').show();$('#firstCustomButtondivbtnurl').hide();$('#firstCustomButtontxtCtaUrl').hide();$('#firstCustomButtondivbtntarget').hide();$('#firstCustomButtonddlCtaTarget').hide();$('#firstCustomButtondivbtnid').show();$('#firstCustomButtontxtCtaId').show();$('#firstCustomButtondivbtncss').show();$('#firstCustomButtontxtCtaCss').show();$('#firstCustomButtondivbtnpromo').hide();$('#firstCustomButtonddlCtaPromo').hide();}
		if($('#rbCtaList_firstButton_2')[0].checked == true){$('#firstCustomButtondivbtn').show();$('#firstCustomButtontxtCtaLabel').show();$('#firstCustomButtondivbtnurl').show();$('#firstCustomButtontxtCtaUrl').show();$('#firstCustomButtondivbtntarget').show();$('#firstCustomButtonddlCtaTarget').show();$('#firstCustomButtondivbtnid').show();$('#firstCustomButtontxtCtaId').show();$('#firstCustomButtondivbtncss').show();$('#firstCustomButtontxtCtaCss').show();$('#firstCustomButtondivbtnpromo').show();$('#firstCustomButtonddlCtaPromo').show();}
		if($('#rbCtaList_firstButton_3')[0].checked == true){$('#firstCustomButtondivbtn').show();$('#firstCustomButtontxtCtaLabel').show();$('#firstCustomButtondivbtnurl').show();$('#firstCustomButtontxtCtaUrl').show();$('#firstCustomButtondivbtntarget').show();$('#firstCustomButtonddlCtaTarget').show();$('#firstCustomButtondivbtnid').show();$('#firstCustomButtontxtCtaId').show();$('#firstCustomButtondivbtncss').show();$('#firstCustomButtontxtCtaCss').show();$('#firstCustomButtondivbtnpromo').hide();$('#firstCustomButtonddlCtaPromo').hide();}
		if($('#rbCtaList_firstButton_0').length > 0){$('#rbCtaList_firstButton_0').on('click', function(){if($('#rbCtaList_firstButton_0')[0].checked == true){$('#firstCustomButtondivbtn').hide();$('#firstCustomButtontxtCtaLabel').hide();$('#firstCustomButtondivbtnurl').hide();$('#firstCustomButtontxtCtaUrl').hide();$('#firstCustomButtondivbtntarget').hide();$('#firstCustomButtonddlCtaTarget').hide();$('#firstCustomButtondivbtnid').hide();$('#firstCustomButtontxtCtaId').hide();$('#firstCustomButtondivbtncss').hide();$('#firstCustomButtontxtCtaCss').hide();$('#firstCustomButtondivbtnpromo').hide();$('#firstCustomButtonddlCtaPromo').hide();}});}
		if($('#rbCtaList_firstButton_1').length > 0){ $('#rbCtaList_firstButton_1').on('click', function(){if($('#rbCtaList_firstButton_1')[0].checked == true){$('#firstCustomButtondivbtn').show();$('#firstCustomButtontxtCtaLabel').show();$('#firstCustomButtondivbtnurl').hide();$('#firstCustomButtontxtCtaUrl').hide();$('#firstCustomButtondivbtntarget').hide();$('#firstCustomButtonddlCtaTarget').hide();$('#firstCustomButtondivbtnid').show();$('#firstCustomButtontxtCtaId').show();$('#firstCustomButtondivbtncss').show();$('#firstCustomButtontxtCtaCss').show();$('#firstCustomButtondivbtnpromo').hide();$('#firstCustomButtonddlCtaPromo').hide();}});}
		if($('#rbCtaList_firstButton_2').length > 0){ $('#rbCtaList_firstButton_2').on('click', function(){if($('#rbCtaList_firstButton_2')[0].checked == true){$('#firstCustomButtondivbtn').show();$('#firstCustomButtontxtCtaLabel').show();$('#firstCustomButtondivbtnurl').show();$('#firstCustomButtontxtCtaUrl').show();$('#firstCustomButtondivbtntarget').show();$('#firstCustomButtonddlCtaTarget').show();$('#firstCustomButtondivbtnid').show();$('#firstCustomButtontxtCtaId').show();$('#firstCustomButtondivbtncss').show();$('#firstCustomButtontxtCtaCss').show();$('#firstCustomButtondivbtnpromo').show();$('#firstCustomButtonddlCtaPromo').show();}});}
		if($('#rbCtaList_firstButton_3').length > 0){ $('#rbCtaList_firstButton_3').on('click', function(){if($('#rbCtaList_firstButton_3')[0].checked == true) {$('#firstCustomButtondivbtn').show();$('#firstCustomButtontxtCtaLabel').show();$('#firstCustomButtondivbtnurl').show();$('#firstCustomButtontxtCtaUrl').show();$('#firstCustomButtondivbtntarget').show();$('#firstCustomButtonddlCtaTarget').show();$('#firstCustomButtondivbtnid').show();$('#firstCustomButtontxtCtaId').show();$('#firstCustomButtondivbtncss').show();$('#firstCustomButtontxtCtaCss').show();$('#firstCustomButtondivbtnpromo').hide();$('#firstCustomButtonddlCtaPromo').hide();}});}
	}
	
	if($('#rbCtaList_secondButton').length > 0) {
		if($('#rbCtaList_secondButton_0')[0].checked == true){$('#secondCustomButtondivbtn').hide();$('#secondCustomButtontxtCtaLabel').hide();$('#secondCustomButtondivbtnurl').hide();$('#secondCustomButtontxtCtaUrl').hide();$('#secondCustomButtondivbtntarget').hide();$('#secondCustomButtonddlCtaTarget').hide();$('#secondCustomButtondivbtnid').hide();$('#secondCustomButtontxtCtaId').hide();$('#secondCustomButtondivbtncss').hide();$('#secondCustomButtontxtCtaCss').hide();$('#secondCustomButtondivbtnpromo').hide();$('#secondCustomButtonddlCtaPromo').hide();}
		if($('#rbCtaList_secondButton_1')[0].checked == true){$('#secondCustomButtondivbtn').show();$('#secondCustomButtontxtCtaLabel').show();$('#secondCustomButtondivbtnurl').hide();$('#secondCustomButtontxtCtaUrl').hide();$('#secondCustomButtondivbtntarget').hide();$('#secondCustomButtonddlCtaTarget').hide();$('#secondCustomButtondivbtnid').show();$('#secondCustomButtontxtCtaId').show();$('#secondCustomButtondivbtncss').show();$('#secondCustomButtontxtCtaCss').show();$('#secondCustomButtondivbtnpromo').hide();$('#secondCustomButtonddlCtaPromo').hide();}
		if($('#rbCtaList_secondButton_2')[0].checked == true){$('#secondCustomButtondivbtn').show();$('#secondCustomButtontxtCtaLabel').show();$('#secondCustomButtondivbtnurl').show();$('#secondCustomButtontxtCtaUrl').show();$('#secondCustomButtondivbtntarget').show();$('#secondCustomButtonddlCtaTarget').show();$('#secondCustomButtondivbtnid').show();$('#secondCustomButtontxtCtaId').show();$('#secondCustomButtondivbtncss').show();$('#secondCustomButtontxtCtaCss').show();$('#secondCustomButtondivbtnpromo').show();$('#secondCustomButtonddlCtaPromo').show();}
		if($('#rbCtaList_secondButton_3')[0].checked == true){$('#secondCustomButtondivbtn').show();$('#secondCustomButtontxtCtaLabel').show();$('#secondCustomButtondivbtnurl').show();$('#secondCustomButtontxtCtaUrl').show();$('#secondCustomButtondivbtntarget').show();$('#secondCustomButtonddlCtaTarget').show();$('#secondCustomButtondivbtnid').show();$('#secondCustomButtontxtCtaId').show();$('#secondCustomButtondivbtncss').show();$('#secondCustomButtontxtCtaCss').show();$('#secondCustomButtondivbtnpromo').hide();$('#secondCustomButtonddlCtaPromo').hide();}
		if($('#rbCtaList_secondButton_0').length > 0){$('#rbCtaList_secondButton_0').on('click', function(){if($('#rbCtaList_secondButton_0')[0].checked == true){$('#secondCustomButtondivbtn').hide();$('#secondCustomButtontxtCtaLabel').hide();$('#secondCustomButtondivbtnurl').hide();$('#secondCustomButtontxtCtaUrl').hide();$('#secondCustomButtondivbtntarget').hide();$('#secondCustomButtonddlCtaTarget').hide();$('#secondCustomButtondivbtnid').hide();$('#secondCustomButtontxtCtaId').hide();$('#secondCustomButtondivbtncss').hide();$('#secondCustomButtontxtCtaCss').hide();$('#secondCustomButtondivbtnpromo').hide();$('#secondCustomButtonddlCtaPromo').hide();}});}
		if($('#rbCtaList_secondButton_1').length > 0){$('#rbCtaList_secondButton_1').on('click', function(){if($('#rbCtaList_secondButton_1')[0].checked == true){$('#secondCustomButtondivbtn').show();$('#secondCustomButtontxtCtaLabel').show();$('#secondCustomButtondivbtnurl').hide();$('#secondCustomButtontxtCtaUrl').hide();$('#secondCustomButtondivbtntarget').hide();$('#secondCustomButtonddlCtaTarget').hide();$('#secondCustomButtondivbtnid').show();$('#secondCustomButtontxtCtaId').show();$('#secondCustomButtondivbtncss').show();$('#secondCustomButtontxtCtaCss').show();$('#secondCustomButtondivbtnpromo').hide();$('#secondCustomButtonddlCtaPromo').hide();}});}
		if($('#rbCtaList_secondButton_2').length > 0){$('#rbCtaList_secondButton_2').on('click', function(){if($('#rbCtaList_secondButton_2')[0].checked == true){$('#secondCustomButtondivbtn').show();$('#secondCustomButtontxtCtaLabel').show();$('#secondCustomButtondivbtnurl').show();$('#secondCustomButtontxtCtaUrl').show();$('#secondCustomButtondivbtntarget').show();$('#secondCustomButtonddlCtaTarget').show();$('#secondCustomButtondivbtnid').show();$('#secondCustomButtontxtCtaId').show();$('#secondCustomButtondivbtncss').show();$('#secondCustomButtontxtCtaCss').show();$('#secondCustomButtondivbtnpromo').show();$('#secondCustomButtonddlCtaPromo').show();}});}
		if($('#rbCtaList_secondButton_3').length > 0){$('#rbCtaList_secondButton_3').on('click', function(){if($('#rbCtaList_secondButton_3')[0].checked == true){$('#secondCustomButtondivbtn').show();$('#secondCustomButtontxtCtaLabel').show();$('#secondCustomButtondivbtnurl').show();$('#secondCustomButtontxtCtaUrl').show();$('#secondCustomButtondivbtntarget').show();$('#secondCustomButtonddlCtaTarget').show();$('#secondCustomButtondivbtnid').show();$('#secondCustomButtontxtCtaId').show();$('#secondCustomButtondivbtncss').show();$('#secondCustomButtontxtCtaCss').show();$('#secondCustomButtondivbtnpromo').hide();$('#secondCustomButtonddlCtaPromo').hide();}});}
	}
	
	if($('#rbCtaList_thirdButton').length > 0) {
		if($('#rbCtaList_thirdButton_0')[0].checked == true){$('#thirdCustomButtondivbtn').hide();$('#thirdCustomButtontxtCtaLabel').hide();$('#thirdCustomButtondivbtnurl').hide();$('#thirdCustomButtontxtCtaUrl').hide();$('#thirdCustomButtondivbtntarget').hide();$('#thirdCustomButtonddlCtaTarget').hide();$('#thirdCustomButtondivbtnid').hide();$('#thirdCustomButtontxtCtaId').hide();$('#thirdCustomButtondivbtncss').hide();$('#thirdCustomButtontxtCtaCss').hide();$('#thirdCustomButtondivbtnpromo').hide();$('#thirdCustomButtonddlCtaPromo').hide();}
		if($('#rbCtaList_thirdButton_1')[0].checked == true){$('#thirdCustomButtondivbtn').show();$('#thirdCustomButtontxtCtaLabel').show();$('#thirdCustomButtondivbtnurl').hide();$('#thirdCustomButtontxtCtaUrl').hide();$('#thirdCustomButtondivbtntarget').hide();$('#thirdCustomButtonddlCtaTarget').hide();$('#thirdCustomButtondivbtnid').show();$('#thirdCustomButtontxtCtaId').show();$('#thirdCustomButtondivbtncss').show();$('#thirdCustomButtontxtCtaCss').show();$('#thirdCustomButtondivbtnpromo').hide();$('#thirdCustomButtonddlCtaPromo').hide();}
		if($('#rbCtaList_thirdButton_2')[0].checked == true){$('#thirdCustomButtondivbtn').show();$('#thirdCustomButtontxtCtaLabel').show();$('#thirdCustomButtondivbtnurl').show();$('#thirdCustomButtontxtCtaUrl').show();$('#thirdCustomButtondivbtntarget').show();$('#thirdCustomButtonddlCtaTarget').show();$('#thirdCustomButtondivbtnid').show();$('#thirdCustomButtontxtCtaId').show();$('#thirdCustomButtondivbtncss').show();$('#thirdCustomButtontxtCtaCss').show();$('#thirdCustomButtondivbtnpromo').show();$('#thirdCustomButtonddlCtaPromo').show();}
		if($('#rbCtaList_thirdButton_3')[0].checked == true){$('#thirdCustomButtondivbtn').show();$('#thirdCustomButtontxtCtaLabel').show();$('#thirdCustomButtondivbtnurl').show();$('#thirdCustomButtontxtCtaUrl').show();$('#thirdCustomButtondivbtntarget').show();$('#thirdCustomButtonddlCtaTarget').show();$('#thirdCustomButtondivbtnid').show();$('#thirdCustomButtontxtCtaId').show();$('#thirdCustomButtondivbtncss').show();$('#thirdCustomButtontxtCtaCss').show();$('#thirdCustomButtondivbtnpromo').hide();$('#thirdCustomButtonddlCtaPromo').hide();}
		if($('#rbCtaList_thirdButton_0').length > 0){$('#rbCtaList_thirdButton_0').on('click', function(){if($('#rbCtaList_thirdButton_0')[0].checked == true){$('#thirdCustomButtondivbtn').hide();$('#thirdCustomButtontxtCtaLabel').hide();$('#thirdCustomButtondivbtnurl').hide();$('#thirdCustomButtontxtCtaUrl').hide();$('#thirdCustomButtondivbtntarget').hide();$('#thirdCustomButtonddlCtaTarget').hide();$('#thirdCustomButtondivbtnid').hide();$('#thirdCustomButtontxtCtaId').hide();$('#thirdCustomButtondivbtncss').hide();$('#thirdCustomButtontxtCtaCss').hide();$('#thirdCustomButtondivbtnpromo').hide();$('#thirdCustomButtonddlCtaPromo').hide();}});}
		if($('#rbCtaList_thirdButton_1').length > 0){$('#rbCtaList_thirdButton_1').on('click', function(){if($('#rbCtaList_thirdButton_1')[0].checked == true){$('#thirdCustomButtondivbtn').show();$('#thirdCustomButtontxtCtaLabel').show();$('#thirdCustomButtondivbtnurl').hide();$('#thirdCustomButtontxtCtaUrl').hide();$('#thirdCustomButtondivbtntarget').hide();$('#thirdCustomButtonddlCtaTarget').hide();$('#thirdCustomButtondivbtnid').show();$('#thirdCustomButtontxtCtaId').show();$('#thirdCustomButtondivbtncss').show();$('#thirdCustomButtontxtCtaCss').show();$('#thirdCustomButtondivbtnpromo').hide();$('#thirdCustomButtonddlCtaPromo').hide();}});}
		if($('#rbCtaList_thirdButton_2').length > 0){$('#rbCtaList_thirdButton_2').on('click', function(){if($('#rbCtaList_thirdButton_2')[0].checked == true){$('#thirdCustomButtondivbtn').show();$('#thirdCustomButtontxtCtaLabel').show();$('#thirdCustomButtondivbtnurl').show();$('#thirdCustomButtontxtCtaUrl').show();$('#thirdCustomButtondivbtntarget').show();$('#thirdCustomButtonddlCtaTarget').show();$('#thirdCustomButtondivbtnid').show();$('#thirdCustomButtontxtCtaId').show();$('#thirdCustomButtondivbtncss').show();$('#thirdCustomButtontxtCtaCss').show();$('#thirdCustomButtondivbtnpromo').show();$('#thirdCustomButtonddlCtaPromo').show();}});}
		if($('#rbCtaList_thirdButton_3').length > 0){$('#rbCtaList_thirdButton_3').on('click', function(){if($('#rbCtaList_thirdButton_3')[0].checked == true){$('#thirdCustomButtondivbtn').show();$('#thirdCustomButtontxtCtaLabel').show();$('#thirdCustomButtondivbtnurl').show();$('#thirdCustomButtontxtCtaUrl').show();$('#thirdCustomButtondivbtntarget').show();$('#thirdCustomButtonddlCtaTarget').show();$('#thirdCustomButtondivbtnid').show();$('#thirdCustomButtontxtCtaId').show();$('#thirdCustomButtondivbtncss').show();$('#thirdCustomButtontxtCtaCss').show();$('#thirdCustomButtondivbtnpromo').hide();$('#thirdCustomButtonddlCtaPromo').hide();}});}
	}
	
	if($('#rbCtaList_fourthButton').length > 0) {
		if($('#rbCtaList_fourthButton_0')[0].checked == true){$('#fourthCustomButtondivbtn').hide();$('#fourthCustomButtontxtCtaLabel').hide();$('#fourthCustomButtondivbtnurl').hide();$('#fourthCustomButtontxtCtaUrl').hide();$('#fourthCustomButtondivbtntarget').hide();$('#fourthCustomButtonddlCtaTarget').hide();$('#fourthCustomButtondivbtnid').hide();$('#fourthCustomButtontxtCtaId').hide();$('#fourthCustomButtondivbtncss').hide();$('#fourthCustomButtontxtCtaCss').hide();$('#fourthCustomButtondivbtnpromo').hide();$('#fourthCustomButtonddlCtaPromo').hide();}
		if($('#rbCtaList_fourthButton_1')[0].checked == true){$('#fourthCustomButtondivbtn').show();$('#fourthCustomButtontxtCtaLabel').show();$('#fourthCustomButtondivbtnurl').hide();$('#fourthCustomButtontxtCtaUrl').hide();$('#fourthCustomButtondivbtntarget').hide();$('#fourthCustomButtonddlCtaTarget').hide();$('#fourthCustomButtondivbtnid').show();$('#fourthCustomButtontxtCtaId').show();$('#fourthCustomButtondivbtncss').show();$('#fourthCustomButtontxtCtaCss').show();$('#fourthCustomButtondivbtnpromo').hide();$('#fourthCustomButtonddlCtaPromo').hide();}
		if($('#rbCtaList_fourthButton_2')[0].checked == true){$('#fourthCustomButtondivbtn').show();$('#fourthCustomButtontxtCtaLabel').show();$('#fourthCustomButtondivbtnurl').show();$('#fourthCustomButtontxtCtaUrl').show();$('#fourthCustomButtondivbtntarget').show();$('#fourthCustomButtonddlCtaTarget').show();$('#fourthCustomButtondivbtnid').show();$('#fourthCustomButtontxtCtaId').show();$('#fourthCustomButtondivbtncss').show();$('#fourthCustomButtontxtCtaCss').show();$('#fourthCustomButtondivbtnpromo').show();$('#fourthCustomButtonddlCtaPromo').show();}
		if($('#rbCtaList_fourthButton_3')[0].checked == true){$('#fourthCustomButtondivbtn').show();$('#fourthCustomButtontxtCtaLabel').show();$('#fourthCustomButtondivbtnurl').show();$('#fourthCustomButtontxtCtaUrl').show();$('#fourthCustomButtondivbtntarget').show();$('#fourthCustomButtonddlCtaTarget').show();$('#fourthCustomButtondivbtnid').show();$('#fourthCustomButtontxtCtaId').show();$('#fourthCustomButtondivbtncss').show();$('#fourthCustomButtontxtCtaCss').show();$('#fourthCustomButtondivbtnpromo').hide();$('#fourthCustomButtonddlCtaPromo').hide();}
		if($('#rbCtaList_fourthButton_0').length > 0){$('#rbCtaList_fourthButton_0').on('click', function(){if($('#rbCtaList_fourthButton_0')[0].checked == true){$('#fourthCustomButtondivbtn').hide();$('#fourthCustomButtontxtCtaLabel').hide();$('#fourthCustomButtondivbtnurl').hide();$('#fourthCustomButtontxtCtaUrl').hide();$('#fourthCustomButtondivbtntarget').hide();$('#fourthCustomButtonddlCtaTarget').hide();$('#fourthCustomButtondivbtnid').hide();$('#fourthCustomButtontxtCtaId').hide();$('#fourthCustomButtondivbtncss').hide();$('#fourthCustomButtontxtCtaCss').hide();$('#fourthCustomButtondivbtnpromo').hide();$('#fourthCustomButtonddlCtaPromo').hide();}});}
		if($('#rbCtaList_fourthButton_1').length > 0){$('#rbCtaList_fourthButton_1').on('click', function(){if($('#rbCtaList_fourthButton_1')[0].checked == true){$('#fourthCustomButtondivbtn').show();$('#fourthCustomButtontxtCtaLabel').show();$('#fourthCustomButtondivbtnurl').hide();$('#fourthCustomButtontxtCtaUrl').hide();$('#fourthCustomButtondivbtntarget').hide();$('#fourthCustomButtonddlCtaTarget').hide();$('#fourthCustomButtondivbtnid').show();$('#fourthCustomButtontxtCtaId').show();$('#fourthCustomButtondivbtncss').show();$('#fourthCustomButtontxtCtaCss').show();$('#fourthCustomButtondivbtnpromo').hide();$('#fourthCustomButtonddlCtaPromo').hide();}});}
		if($('#rbCtaList_fourthButton_2').length > 0){$('#rbCtaList_fourthButton_2').on('click', function(){if($('#rbCtaList_fourthButton_2')[0].checked == true){$('#fourthCustomButtondivbtn').show();$('#fourthCustomButtontxtCtaLabel').show();$('#fourthCustomButtondivbtnurl').show();$('#fourthCustomButtontxtCtaUrl').show();$('#fourthCustomButtondivbtntarget').show();$('#fourthCustomButtonddlCtaTarget').show();$('#fourthCustomButtondivbtnid').show();$('#fourthCustomButtontxtCtaId').show();$('#fourthCustomButtondivbtncss').show();$('#fourthCustomButtontxtCtaCss').show();$('#fourthCustomButtondivbtnpromo').show();$('#fourthCustomButtonddlCtaPromo').show();}});}
		if($('#rbCtaList_fourthButton_3').length > 0){$('#rbCtaList_fourthButton_3').on('click', function(){if($('#rbCtaList_fourthButton_3')[0].checked == true){$('#fourthCustomButtondivbtn').show();$('#fourthCustomButtontxtCtaLabel').show();$('#fourthCustomButtondivbtnurl').show();$('#fourthCustomButtontxtCtaUrl').show();$('#fourthCustomButtondivbtntarget').show();$('#fourthCustomButtonddlCtaTarget').show();$('#fourthCustomButtondivbtnid').show();$('#fourthCustomButtontxtCtaId').show();$('#fourthCustomButtondivbtncss').show();$('#fourthCustomButtontxtCtaCss').show();$('#fourthCustomButtondivbtnpromo').hide();$('#fourthCustomButtonddlCtaPromo').hide();}});}
    }
}

function ManageIvecoDDLButton() {
	if($('#ddlButtonSelection').length > 0) {
		if($('#ddlButtonSelection_0')[0].checked == true){$('.divbtn').hide();$('#txtCtaLabel').hide();$('.divbtnurl').hide();$('#txtCtaUrl').hide();$('.divbtntarget').hide();$('#ddlCtaTarget').hide();$('.divbtnid').hide();$('#txtCtaId').hide();$('.divbtncss').hide();$('#txtCtaCss').hide();}
		if($('#ddlButtonSelection_1')[0].checked == true){$('.divbtn').show();$('#txtCtaLabel').show();$('.divbtnurl').hide();$('#txtCtaUrl').hide();$('.divbtntarget').hide();$('#ddlCtaTarget').hide();$('.divbtnid').show();$('#txtCtaId').show();$('.divbtncss').show();$('#txtCtaCss').show();}
		if($('#ddlButtonSelection_2')[0].checked == true){$('.divbtn').show();$('#txtCtaLabel').show();$('.divbtnurl').show();$('#txtCtaUrl').show();$('.divbtntarget').show();$('#ddlCtaTarget').show();$('.divbtnid').show();$('#txtCtaId').show();$('.divbtncss').show();$('#txtCtaCss').show();}
	}
}

function EditIvecoSingleContent() {
	if($('#firstCustomButtonPanel').length > 0 || $('#secondCustomButtonPanel').length > 0) {
	    var acc = document.getElementsByClassName("accordion");
		var i;
		for (i = 0; i < acc.length; i++) {
			acc[i].onclick = function(){
				this.classList.toggle("active");
				var panel = this.nextElementSibling;
				if (panel.style.display === "block") {
					panel.style.display = "none";
				} else {
					panel.style.display = "block";
				}
			}
		}
	}
}

function EditIvecoDoubleContent(){
	if($('#rbCtaListSx').length > 0 && $('#rbCtaListDx').length > 0) {
		var acc = document.getElementsByClassName("accordion");
		var i;
		for (i = 0; i < acc.length; i++) {
			acc[i].onclick = function(){
				this.classList.toggle("active");
				var panel = this.nextElementSibling;
				if (panel.style.display === "block") {
					panel.style.display = "none";
				} else {
					panel.style.display = "block";
				}
			}
		}
	}
	if($('#rbCtaListSx').length > 0) {
		if($('#rbCtaListSx_0')[0].checked == true){$('.divbtnsx').hide();$('#txtCtaLabelSx').hide();$('.divbtnurlsx').hide();$('#txtCtaUrlSx').hide();$('.divbtntargetsx').hide();$('#ddlCtaTargetSx').hide();$('.divbtnidsx').hide();$('#txtCtaIdSx').hide();$('.divbtncsssx').hide();$('#txtCtaCssSx').hide();}
		if($('#rbCtaListSx_1')[0].checked == true){$('.divbtnsx').show();$('#txtCtaLabelSx').show();$('.divbtnurlsx').hide();$('#txtCtaUrlSx').hide();$('.divbtntargetsx').hide();$('#ddlCtaTargetSx').hide();$('.divbtnidsx').show();$('#txtCtaIdSx').show();$('.divbtncsssx').show();$('#txtCtaCssSx').show();}
		if($('#rbCtaListSx_2')[0].checked == true){$('.divbtnsx').show();$('#txtCtaLabelSx').show();$('.divbtnurlsx').show();$('#txtCtaUrlSx').show();$('.divbtntargetsx').show();$('#ddlCtaTargetSx').show();$('.divbtnidsx').show();$('#txtCtaIdSx').show();$('.divbtncsssx').show();$('#txtCtaCssSx').show();}
		if($('#rbCtaListSx_0').length > 0){$('#rbCtaListSx_0').on('click', function(){if($('#rbCtaListSx_0')[0].checked == true){$('.divbtnsx').hide();$('#txtCtaLabelSx').hide();$('.divbtnurlsx').hide();$('#txtCtaUrlSx').hide();$('.divbtntargetsx').hide();$('#ddlCtaTargetSx').hide();$('.divbtnidsx').hide();$('#txtCtaIdSx').hide();$('.divbtncsssx').hide();$('#txtCtaCssSx').hide();}});}
		if($('#rbCtaListSx_1').length > 0){ $('#rbCtaListSx_1').on('click', function(){if($('#rbCtaListSx_1')[0].checked == true){$('.divbtnsx').show();$('#txtCtaLabelSx').show();$('.divbtnurlsx').hide();$('#txtCtaUrlSx').hide();$('.divbtntargetsx').hide();$('#ddlCtaTargetSx').hide();$('.divbtnidsx').show();$('#txtCtaIdSx').show();$('.divbtncsssx').show();$('#txtCtaCssSx').show();}});}
		if($('#rbCtaListSx_2').length > 0){ $('#rbCtaListSx_2').on('click', function(){if($('#rbCtaListSx_2')[0].checked == true) {$('.divbtnsx').show();$('#txtCtaLabelSx').show();$('.divbtnurlsx').show();$('#txtCtaUrlSx').show();$('.divbtntargetsx').show();$('#ddlCtaTargetSx').show();$('.divbtnidsx').show();$('#txtCtaIdSx').show();$('.divbtncsssx').show();$('#txtCtaCssSx').show();}});}
	}
	if($('#rbCtaListDx').length > 0) {
		if($('#rbCtaListDx_0')[0].checked == true){$('.divbtndx').hide();$('#txtCtaLabelDx').hide();$('.divbtnurldx').hide();$('#txtCtaUrlDx').hide();$('.divbtntargetdx').hide();$('#ddlCtaTargetDx').hide();$('.divbtniddx').hide();$('#txtCtaIdDx').hide();$('.divbtncssdx').hide();$('#txtCtaCssDx').hide();}
		if($('#rbCtaListDx_1')[0].checked == true){$('.divbtndx').show();$('#txtCtaLabelDx').show();$('.divbtnurldx').hide();$('#txtCtaUrlDx').hide();$('.divbtntargetdx').hide();$('#ddlCtaTargetDx').hide();$('.divbtniddx').show();$('#txtCtaIdDx').show();$('.divbtncssdx').show();$('#txtCtaCssDx').show();}
		if($('#rbCtaListDx_2')[0].checked == true){$('.divbtndx').show();$('#txtCtaLabelDx').show();$('.divbtnurldx').show();$('#txtCtaUrlDx').show();$('.divbtntargetdx').show();$('#ddlCtaTargetDx').show();$('.divbtniddx').show();$('#txtCtaIdDx').show();$('.divbtncssdx').show();$('#txtCtaCssDx').show();}
		if($('#rbCtaListDx_0').length > 0){$('#rbCtaListDx_0').on('click', function(){if($('#rbCtaListDx_0')[0].checked == true){$('.divbtndx').hide();$('#txtCtaLabelDx').hide();$('.divbtnurldx').hide();$('#txtCtaUrlDx').hide();$('.divbtntargetdx').hide();$('#ddlCtaTargetDx').hide();$('.divbtniddx').hide();$('#txtCtaIdDx').hide();$('.divbtncssdx').hide();$('#txtCtaCssDx').hide();}});}
		if($('#rbCtaListDx_1').length > 0){ $('#rbCtaListDx_1').on('click', function(){if($('#rbCtaListDx_1')[0].checked == true){$('.divbtndx').show();$('#txtCtaLabelDx').show();$('.divbtnurldx').hide();$('#txtCtaUrlDx').hide();$('.divbtntargetdx').hide();$('#ddlCtaTargetDx').hide();$('.divbtniddx').show();$('#txtCtaIdDx').show();$('.divbtncssdx').show();$('#txtCtaCssDx').show();}});}
		if($('#rbCtaListDx_2').length > 0){ $('#rbCtaListDx_2').on('click', function(){if($('#rbCtaListDx_2')[0].checked == true) {$('.divbtndx').show();$('#txtCtaLabelDx').show();$('.divbtnurldx').show();$('#txtCtaUrlDx').show();$('.divbtntargetdx').show();$('#ddlCtaTargetDx').show();$('.divbtniddx').show();$('#txtCtaIdDx').show();$('.divbtncssdx').show();$('#txtCtaCssDx').show();}});}
	}
}

function responsiveOnChange(obj) {
	var myOpt = obj.options[obj.selectedIndex];
	var target = myOpt.attributes['target'].value;
	var value = myOpt.attributes['value'].value;
	if(target == '_blank') window.open(value);
	else if(target == 'POPUP'){
		var w = myOpt.attributes['pheight'].value;
		var h = myOpt.attributes['pwidth'].value;
		var l = Math.floor((screen.width - w) / 2);
		var t = Math.floor((screen.height - h) / 2);
		window.open(value, "", "width=" + w + ",height=" + h + ",top=" + t + ",left=" + l + ",scrollbars=yes");
	}
	else
		window.location.href = value;
    return false;
}

function DailyClubSub(){
	if($(".has-error").length > 0) return false;
	var temp = getQS('source');
	if(temp != null && temp[0] != undefined) $("#SRC_ARRIVAL_FIELD")[0].value = decodeURIComponent(temp[0]);
	var now = new Date();
	$("#DATEJOIN_FIELD")[0].value = now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
	$("#DATEJOIN_DAILYCLUB_FIELD")[0].value = $("#DATEJOIN_FIELD")[0].value;
	//$(".form input.datetime").each(function(){ if(this.value!=''){var valuesTable=this.value.split('/'); this.value=valuesTable[1]+'/'+valuesTable[0]+'/'+valuesTable[2];}});
	$("#emvForm").attr("action","http://p5trc.emv2.com/D2UTF8");
	$("#emvForm").submit();
	//$(".form input.datetime").each(function(){ if(this.value!=''){var valuesTable=this.value.split('/'); this.value=valuesTable[1]+'/'+valuesTable[0]+'/'+valuesTable[2];}});
}

function PopupAndContactUsManager(){
	if($(".DisableLeadContactUs").length > 0 && $(".btn.btn-default.sendForm").length > 0) 
		$(".btn.btn-default.sendForm").removeAttr("onclick").attr("href","javascript:void(0)").unbind('click'); 
}

function sendPhonePopUp(baseUrl, readLead, success) {
	baseUrlForSuccessMethod = baseUrl;
	if(isValidField($(".container-banner-number-russia").find(".box-inserimento-number")) && $('.contenitore-inserimento-number-par').find('input[type=checkbox]')[0].checked) {
		if (checkIsPosted() == false) {	
			var values = readLead();
			$(".contenitore-inserimento-number").html("<img src=\"/common/PublishingImages/ajax-loader.gif\" style=\"display:inline\">");
			var s_type = $('.hdn_crmsendmode, #hdn_crmsendmode').val();
			var url = baseUrl + '/_layouts/15/Iveco/SaveContactPopUp.aspx?type=1&dummy=' + (+new Date());
			$.post(url, values, success);
		}
	}
}

function readPhonePopUp() {
	var myForm = $(".container-banner-number-russia");
	var values = {};
	values["TitleLead"] = htmlEncode($("#hdn_titlelead").val());
	values["Telefono"] = htmlEncode(myForm.find(".box-inserimento-number").val());
	values["Privacy"] = "true";
	/*GDPR*/
	values["hdn_GDPR_version"] = htmlEncode($("#hdn_GDPR_version").val());
	values["hdn_GDPR_policies"] = htmlEncode($("#hdn_GDPR_policies").val());
	return values;
}

function closeLeadPopUp(data) {
    var obj = $(data);
    var result = obj.find('#status').text();
    if ($.trim(result) == 'OK' || $.trim(data) == 'OK') {
		hideLeadPopUp(data);
    }
	if ($.trim(result) == 'KO' || $.trim(data) == 'KO') {
		hideLeadPopUp(data);
	}
}

function hideLeadPopUp(data) {
    var obj = $(data);
    var result = obj.find('#status').text();
    var newbox;
	var lType = $("#hdn_titlelead, .hdn_titlelead").val().toLowerCase();	
	if (typeof(dataLayer) != "undefined"){
		var dlLeadType = getLeadType(lType);
		var dlMarket = getMarket(lType);
		dataLayer.push({
			'event' : 'formSubmit',
			'formName' : dlLeadType,
			'market' : dlMarket,
			'formStatus' : ($.trim(result) == 'OK' || $.trim(data) == 'OK') ? 'Submit' : 'Error'
		});
	}
    if ($.trim(result) == 'OK' || $.trim(data) == 'OK') {
		$('.contenitore-inserimento-number').hide();
		$('.par1').hide();
		$('.box-message-send').show();
		if(typeof window.ga == 'undefined') { 
			var ga = function(a){ return true; }
			ga("send", "pageview", marketName + "/form-info/" + pageName + "/ok");
		}
		else
			window.ga("send", "pageview", marketName + "/form-info/" + pageName + "/ok");
    }
    else {
		$('.contenitore-inserimento-number').hide();
		$('.par1').hide();
		$('.russia-ko').show();
		if(typeof window.ga == 'undefined') { 
			var ga = function(a){ return true; }
			ga("send", "event", marketName + "-form-info", pageName, "err-errore");
		}
		else
			window.ga("send", "event", marketName + "-form-info", pageName, "err-errore");
    }
    if (typeof jQuery.data(this, "disabledOnSubmit") != 'undefined')
        jQuery.removeData(this, "disabledOnSubmit");
}


/* CONCORSO ABARTH */
			
function verifyConcorso(a, b, c, d) {
    $("#txtCodVer").parent(".form-group").removeClass('has-error');
	$("#txtCodVer").parent(".form-gdpr").removeClass('has-error');
   
}
			
function sendConsenso(success) {
	$.ajax({
        cache: false, 
		type: "GET",
		url: '/common/pages/recaptcha.aspx',
		data: 'IsToVerify=1&ReCaptcha=' + $('.g-recaptcha-response').val() + '&Market=italy',
		success: function (data) {
            if ($.trim(data) == 'captcha_ok')
				applyConsenso(closeConsenso);
			else{
				grecaptcha.reset();
				applyConsenso(closeConsenso);
				//var errori = ["Captcha"];
				//CONCORSO.showErrorModal(errori);
			}
        }
    });
}

function applyConsenso(success) {
	var errors = CONCORSO.validateForm(true);
	if (errors.length) {
		CONCORSO.showErrorModal(errors);
		grecaptcha.reset();
	}	
	
	if ($("#codice").val() != '') $("input[name=codice]").parent().removeClass('has-error'); else $("input[name=codice]").parent().addClass('has-error');
	if ($("#nome").val() != '') $("input[name=nome]").parent().removeClass('has-error'); else $("input[name=nome]").parent().addClass('has-error');
	if ($("#cognome").val() != '') $("input[name=cognome]").parent().removeClass('has-error'); else $("input[name=cognome]").parent().addClass('has-error');
	if ($("#data_nascita").val() != '') $("input[name=data_nascita]").parent().removeClass('has-error'); else $("input[name=data_nascita]").parent().addClass('has-error');
	if ($("#piva_cf").val() != '') $("input[name=piva_cf]").parent().removeClass('has-error'); else $("input[name=piva_cf]").parent().addClass('has-error');
	if ($("#email").val() != '') $("input[name=email]").parent().removeClass('has-error'); else $("input[name=email]").parent().addClass('has-error');
	if ($("#phone").val() != '') $("input[name=phone]").parent().removeClass('has-error'); else $("input[name=phone]").parent().addClass('has-error');
	if (document.getElementById('privacy-agree').checked) $("input[name=privacy-agree]").parent().parent().parent().removeClass('has-error'); else $("input[name=privacy-agree]").parent().parent().parent().addClass('has-error');
	
	if ($("#codice").val() != '' && $("#nome").val() != '' && $("#cognome").val() != '' && $("#data_nascita").val() != '' && $("#piva_cf").val() != '' && $("#email").val() != '' && $("#phone").val() != '' && document.getElementById('privacy-agree').checked && !errors.length)
	{
		var url = "/" + window.location.pathname.split('/')[1] + '/_layouts/15/Iveco/SaveConcorsoAbarth.aspx?dummy=' + (+new Date());
		$.post(url, readConcorso(), success);
	}
}

function readConcorso() {
	var values = {};
	values["codice"] = $("#codice").val();
	values["nome"] = $("#nome").val();
	values["cognome"] = $("#cognome").val();
	values["data_nascita"] = $("#data_nascita").val();
	values["piva_cf"] = $("#piva_cf").val();
	values["email"] = $("#email").val();
	values["phone"] = $("#phone").val();
	values["privacy-agree"] = 'true';
	values["url"] = window.location.href;
	return values;
}

function closeConsenso(data) {
	var obj = $(data);
	var result = obj.find('#status').text();
	var errorType = obj.find('#errMsg').html();

	if ($.trim(result) == 'Error Captcha')
		grecaptcha.reset();
	else if ($.trim(result) == 'OK')
		CONCORSO.showThankyouModal();
	else {
		printErrorModal(errorType);
		grecaptcha.reset();
	}
}

function printErrorModal(errorType){
	$("#error-modal-body").remove();
	var formHTML = '<div class="modal-body" id="error-modal-body">' + errorType;
	formHTML +='<div class="thankyou-modal-actions">';
	formHTML +='<button type="button" class="btn btn-primary btn-lg" data-dismiss="modal">Chiudi</button>';
	formHTML +='</div></div>';
	$(formHTML).appendTo("#reply-error-body");
	$('#error-modal-reply').modal({backdrop: 'static'}).modal('show');
	return false;
}

/*
//COLLAPSABLE ELEMENTS
$( function(){
	// initialize collapsibles:
    var coll = document.getElementsByClassName("collassabile");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
           content.style.display = "block";
        }
    });
    } 
});
*/