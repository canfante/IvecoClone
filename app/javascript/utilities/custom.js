if (typeof IVECO === "undefined") {

	var IVECO = {};

}


function imgPreloader(list, target, loaderElement, avoidTimeout){

	var loader = loaderElement,

		tot = list.length,

		counter = 0,

		timer=null;

	if(tot==0){// || (tot==1 && (list[0] != "" || list[0] != undefined || list[0] != null)))

		loader == undefined ? null : loader.removeClass('loading');

		var event = jQuery.Event('allImagesLoaded');

		event.sources = list;

		target == null && target == undefined ? null : target.trigger(event).off('allImagesLoaded');

		return list;

	}

	avoidTimeout== null ||avoidTimeout==undefined?avoidTimeout=false:null;

	loader == undefined ? null : loader.addClass('loading');



	// setNewSrc = false,

		timer =

		setTimeout(function(){

			clearTimeout(timer);

			if(counter!=tot && avoidTimeout==false){

				loader == undefined ? null : loader.removeClass('loading');

				var event = jQuery.Event('allImagesLoaded');

				event.sources = list;

				target == null && target == undefined ? null : target.trigger(event).off('allImagesLoaded');

			}

		},1000*tot);

	if(list.jquery){

		setNewSrc = true;

		var listBk = [];

		list.each(function(){

			listBk.push(this.src);

		});

		list = listBk;

	}



	var cache = [];



	for(path in list){

		var newPath = list[path]+'?'+Math.random()*999999;

		list[path] = newPath;

		jQuery('<img/>')

			.css( {'width':'auto'})

			.attr('src', newPath)

			.load(function(){

				cache.push(jQuery(this));

				counter++;

				jQuery(this).width();

				jQuery(this).height();

				if(counter==tot && timer!=undefined){

					clearTimeout(timer);

					timer = undefined;

					loader == undefined ? null : loader.removeClass('loading');

					var event = jQuery.Event('allImagesLoaded');

					event.sources = list;

					target == null && target == undefined ? null : target.trigger(event).off('allImagesLoaded');

				}

			});

	}

	return list;

}

IVECO.Utils = {
	/**
	 * @method  getUrlParam Get a parameter's name from a query string
	 * @param  {String} paramName Parameter's name to look for in query string
	 * @return {Boolean}
	 */
	getUrlParam: function(paramName) {

		"use strict";

		var oRegex = new RegExp('[\?&]' + paramName + '=([^&]+)', 'i'),

			oMatch = oRegex.exec(document.location.search);

		if (oMatch && oMatch.length > 1) {

			// return !!decodeURIComponent(oMatch[1]);
			return decodeURIComponent(oMatch[1]);

		} else {

			// return !!"";
			return false;

		}

	}
};
/*------------------------------------*\
	$COOKIES POLICY
\*------------------------------------*/

IVECO.cookiesPolicy = (function(){
	
	"use strict";
	
	var self = {},
		config,
		_showOverlay,
		_closeOverlay,
		_init;
	
	config = function(){
		
		self.overlay = $('.cookies-overlay');
		
		self.close = self.overlay.find('.close');
		
	};
	
	_showOverlay = function(){
		
		if( !localStorage.getItem('cookiesConsent') ){
			
			self.overlay.removeClass('hidden');
			
		}
		
	};
	
	_closeOverlay = function(){
		
		self.close.click(function(){
			
			self.overlay.fadeOut();
			
			localStorage.setItem('cookiesConsent', 'Y');
			
		});
		
	};
	
	_init = function(){
		
		config();
		_showOverlay();
		_closeOverlay();
		
	};
	
	return {
		
		initialize: _init
		
	};
	
}());

/*------------------------------------*\
	$HEADER
\*------------------------------------*/

IVECO.header = (function(){
	
	"use strict";
	
	var self = {},
		config,
		_handleTab,
		_handleSubMenu,
		_handleNavBarCollapsing,
		_handleResponsive,
		_handleSelectMenu,
		_handleTPMyIveco,
		_init;
	
	config = function(){
		
		self.navType = $('.main-header__nav-type');
		
		self.navContent = $('.main-nav');
		
		self.mainNav = $('.main-header__main-navigation, .main-header__tools-navigation');
		
		self.interactionArea = $('.main-header__interaction-area');
		
		
		self.firstLevelMenu = self.mainNav.find('.first-level-menu');
		
		self.openSecondLevel = self.firstLevelMenu.find('> li.has-sub-menu > a');
		
		self.secondLevelMenuWrap = self.firstLevelMenu.find('.sub-menu-wrap');
		
		
		self.secondLevelMenu = self.mainNav.find('.second-level-menu');
		
		self.openThirdLevel = self.secondLevelMenu.find('> li.has-sub-menu > a');
		
		self.thirdLevelMenu = self.mainNav.find('.third-level-menu-wrap');
		
		self.selectMenu = $('.select-menu__select-wrap');
		
		self.tpmiTrigger = self.interactionArea.find('.js-main-header__tp-myiveco__trigger');
		self.tpmiPopover = self.interactionArea.find('.js-main-header__tp-myiveco__popover');
		
	};
	
	_handleNavBarCollapsing = function(){
		
		self.interactionArea.on('show.bs.collapse', function () {
			$('html').addClass('no-scroll');
		});
		
		self.interactionArea.on('hidden.bs.collapse', function () {
			$('html').removeClass('no-scroll');
		});
		
	};
	
	_handleTab = function(){
		
		self.navType.find('a').click(function(){
			
			var el = $(this),
				elIndex = el.parent().index();
			
			self.navType.find('li').removeClass('active');
			
			el.parent().addClass('active');
			
			
			self.navContent.removeClass('active');
			
			self.navContent.eq(elIndex).addClass('active');
			
		});
		
	};
	
	/* _handleSubMenu = function(){
		
		self.openSecondLevel.click(function(e){
			
			e.preventDefault();
			
			var $this = $(this),
				$targetParent = $this.parent('li');
			
			$targetParent.toggleClass('active');
			
		})
		
	}; */
	
	_handleSubMenu = function(){
		
		//all'hover della voce "Prodotti" deve comparire anche il menu' di terzo livello
		
		if( Modernizr.mq('(min-width: 992px)')){
			
			var firstActiveItem = self.secondLevelMenu.find('> li.hover'); //sezione attiva
			
			self.firstLevelMenu.find('> li').hover(
				
				function() { //mouseenter
					
					if(firstActiveItem.length > 0){
						
						//
						
					}else{
						
						self.secondLevelMenu.find('> li').first().addClass('hover');
						
					}
					
				},
				
				function() { //mouseleave
					
					if(firstActiveItem.length > 0){
						
						//reset:
						
						self.secondLevelMenu.find('> li').removeClass('hover');
						
						firstActiveItem.addClass('hover');
						
					}
					
				}
			);
			
			self.secondLevelMenu.find('> li').hover(
				
				function(){
					
					self.secondLevelMenu.find('> li').removeClass('hover');
					
					$(this).addClass('hover');
					
				}
			);
			
		}
		
		if( Modernizr.mq('(max-width: 991px)')){
			
			self.openSecondLevel.click(function(e){
				
				var $this = $(this),
					$targetSecondLevelMenuWrap = $this.next('.sub-menu-wrap'),
					$header = $('header'),
					clickedOffsetTop,
					headerScrollTop,
					newPosition,
					animationOne,
					animationTwo,
					animationThree;
				
				e.preventDefault();
				
				
				animationOne = self.secondLevelMenuWrap.not($targetSecondLevelMenuWrap).slideUp();
				
				animationTwo = $targetSecondLevelMenuWrap.slideToggle();
				
				
				self.openSecondLevel.not($this).removeClass('active');
				
				$this.toggleClass('active');
				
				
				self.openThirdLevel.removeClass('active');
				
				animationThree = self.thirdLevelMenu.slideUp();
				
				
				$.when(animationOne, animationTwo, animationThree).done(function() {
					
					clickedOffsetTop = $this.offset().top;
					
					headerScrollTop = $('header').scrollTop();
					
					newPosition = clickedOffsetTop + headerScrollTop;
					
					console.log(newPosition);
					
					$header.animate({
						
						scrollTop: newPosition
						
					}, 600);
					
				});
				
			});
			
			self.openThirdLevel.click(function(e){
				
				
				var $this = $(this),
					$targetThirdLevelMenu = $this.next('.third-level-menu-wrap'),
					$header = $('header'),
					clickedOffsetTop,
					headerScrollTop,
					newPosition,
					animationOne,
					animationTwo,
					animationThree;
				
				e.preventDefault();
				
				
				animationOne = self.thirdLevelMenu.not($targetThirdLevelMenu).slideUp();
				
				animationTwo = $targetThirdLevelMenu.slideToggle();
				
				
				self.openThirdLevel.not($this).removeClass('active');
				
				$this.toggleClass('active');
				
				
				$.when(animationOne, animationTwo).done(function() {
					
					clickedOffsetTop = $this.offset().top;
					
					headerScrollTop = $('header').scrollTop();
					
					newPosition = clickedOffsetTop + headerScrollTop;
					
					console.log(newPosition);
					
					$header.animate({
						
						scrollTop: newPosition
						
					}, 600);
					
				});
				
			});
			
		}
		
	};
	
	_handleResponsive = function(){
		
		config();
		
		//reset
		self.openSecondLevel.removeClass('active').off('click');
		
		self.secondLevelMenuWrap.removeAttr('style');
		
		
		self.openThirdLevel.removeClass('active').off('click');
		
		self.thirdLevelMenu.removeAttr('style');
		
		
		//reinit
		_handleSubMenu();
		
	};
	
	/**
	 * @since 29-11-2016
	 * @desc When page scrolls down, make the product menu sticky; this menu is visible only for xs and sm devices.
	 */
	_handleSelectMenu = function(){
		
		var beginFixing = self.selectMenu.offset().top - $('.main-header').height();
		
		self.selectMenu.affix({
			offset: {
				top: beginFixing
				
			}
		})
		
	};
	
	/**
	 * handle MyIVECO touchpoint
	 * @since february 2019
	 * @requires popover
	 */
	_handleTPMyIveco = function(){
		
		self.tpmiTrigger.popover({
			//container: 'body',
			content: self.tpmiPopover.html(),
			html: true,
			placement: 'auto top'//,
			//viewport: { selector: '#main-header__interaction-area', padding: '0' }
		});
		
		$('body').on('click', function(event){
				
			if ( $('.popover').length ) {
				
				if ( !$(event.target).closest('.main-header__tp-myiveco').length ) {
					
					self.tpmiTrigger.click();
					
				}
				
			}
			
		});
		
	};
	
	_init = function(){
		
		config();
		
		//_handleNavBarCollapsing();
		
		_handleTab();
		
		_handleSubMenu();
		
		if ( $('.select-menu__select-wrap').length ) {
			
			_handleSelectMenu();
			
		}
		
		if ( $('.js-main-header__tp-myiveco__trigger').length ) {
			
			_handleTPMyIveco();
			
		}
		
	};
	
	return {
		
		initialize: _init,
		handleResponsive: _handleResponsive
	};
	
}());

/*------------------------------------*\
	$PAGE-NAVIGATION
\*------------------------------------*/

IVECO.pageNavigation = (function(){
	
	"use strict";
	
	var self = {},
		
		_config,
		
		_toggleNav,
		
		_init;
	
	_config = function(){
		
		self.$pageNavToggleBtn = $('.page-navigation__toggle-btn');
		
		self.$pageNav = $('.page-navigation__nav');
		
	};
	
	_toggleNav = function(){
		
		self.$pageNavToggleBtn.click(function(){
			
			self.$pageNav.slideToggle(function(){
				
				self.$pageNavToggleBtn.toggleClass('opened', $(this).is(':visible'));
				
			});
			
		});
		
	};
	
	_init = function(){
		
		_config();
		
		_toggleNav();
		
	};
	
	return {
		
		initialize: _init
		
	};
	
}());

/*------------------------------------*\
	$BOXES-ACCORDION-ON-MOBILE
\*------------------------------------*/

IVECO.boxes = (function(){
	
	"use strict";
	
	var self = {},
		config,
		_handleAccordion,
		_handleResponsive,
		_init;
	
	config = function(){
		
		self.boxesWrap = $('.boxes-secondary');
		self.box = self.boxesWrap.find('.box');
		self.boxTitle = self.boxesWrap.find('.box__title');
		self.boxContent = self.boxesWrap.find('.box__content');
		
	};
	
	_handleAccordion = function(){
		
		if( Modernizr.mq('(max-width: 992px)')){
			
			self.boxTitle.click(function(e){
				
				var $this = $(this),
					$targetBoxContent = $this.next('.box__content');
				
				e.preventDefault();
				
				
				self.boxContent.not($targetBoxContent).slideUp();
				
				$targetBoxContent.slideToggle();
				
				
				self.box.find('.slider').slick('setPosition'); // Manually refresh positioning of slick
				
				
				self.boxTitle.not($this).removeClass('active');
				
				$this.toggleClass('active');
				
			});
			
		}
		
	};
	
	_handleResponsive = function(){
		
		config();
		
		//reset
		self.boxTitle.removeClass('active').off('click');
		
		self.boxContent.removeAttr('style');
		
		//reinit
		_handleAccordion();
		
	};
	
	_init = function(){
		
		config();
		_handleAccordion();
		
	};
	
	return {
		
		initialize: _init,
		handleResponsive: _handleResponsive
		
	};
	
}());


/*------------------------------------*\
	$BOXES-MATCH-HEIGHT
\*------------------------------------*/
IVECO.matchBoxesHeight = (function(){
	
	"use strict";
	
	var self = {},
		config,
		_matchHeight,
		_init;
	
	
	config = function(){
		
		self.equalHeightBoxWrap = $('.equal-height-row');
		/* self.box = self.equalHeightBoxWrap.find('.box__content');
		self.boxDotted =  self.equalHeightBoxWrap.find('.divider-line--dotted');
		self.title = self.equalHeightBoxWrap.find('.box__title'); */
		
	};
	
	_matchHeight = function(){
		
		self.equalHeightBoxWrap.each(function(){
			
			var $row = $(this);
			
			if ($row.find('.box__content').length > 1) { //se in una riga "equal-height-row" e' presente piu' di un box (es. in hp) allora occorre allineare i box tra di loro. e' sufficiente questo, e non vanno allineate eventuali colonne interne ai box.
			
				$row.find('.box__content').matchHeight();
				$row.find('.box__title').matchHeight();
				$row.find('.equal-height-box').addClass('js-flattened');
				
			} else if ($row.find('.box__content').length == 1) { //se in una riga "equal-height-row" e' presente solo un box allora occorre allineare le eventuali colonne all'interno.
				
				$row.find('.divider-line--dotted').matchHeight();
				
			}
			
		});
		
		/**
		 * equal height even outside .row.boxes-secondary
		 * @since 2018-03-07
		 */
		
		$('.equal-height-box').not('.js-flattened').closest('.row').each(function(){
			
			var $this = $(this);
			
			if ( !$this.hasClass('boxes-secondary') ) {
				
				//console.log('to be parsed for equal height');
				$this.find('.equal-height-box').children('.box').matchHeight();
				$this.children('.col-sm-12').children('.col-sm-4').wrapAll('<div class="row js-row"></div>');// To nest a column inside another column, bootstrap requires a wrapping .row (to avoid further lateral padding)
				
			} else {
				//console.log('already parsed for equal height');
			}
			
		});
		
	};
	
	_init = function(){
		
		config();
		_matchHeight();
		
	};
	
	return {
		
		initialize: _init
		
	};
}());


/*------------------------------------*\
	$TECHNICAL-SHEET-CASCADE
\*------------------------------------*/

IVECO.technicalSheet = (function(){
	
	"use strict";
	
	var self = {},
		config,
		_handleTypeChange,
		_handleModelChange,
		_enableModel,
		_disableModel,
		_enableDownload,
		_disableDownload,
		_resetInterface,
		_init;
	
	config = function(){
		
		self.type = $('.technical-sheet__step--type');
		self.typeSelect = self.type.find('select');
		
		self.model = $('.technical-sheet__step--model');
		self.modelSelect = self.model.find('select');
		
		self.download = $('.technical-sheet__step--download');
		self.downloadBtn = $('.technical-sheet__step--download').find('a');
		
	};
	
	_handleTypeChange = function(){
		
		self.typeSelect.change(function(){
			
			var $this = $(this),
				type = $this.val();
			
			if(type != '-'){
				_enableModel(type);
				_disableDownload();
			}else{
				_disableModel();
				_disableDownload();
			}
			
		});
		
	};
	
	_handleModelChange = function(){
		
		self.modelSelect.change(function(){
			
			var $this = $(this),
				url = $this.val();
			
			if(url != '-'){
				_enableDownload(url);
			}else{
				_disableDownload();
			}
			
		});
		
	};
	
	_enableModel = function(type){
		
		self.model.addClass('active');
		
		self.modelSelect.addClass('hidden');
		
		$('select[name="'+type+'"]').val('-').removeAttr('disabled').removeClass('hidden');
		
	};
	
	_disableModel = function(){
		self.model.removeClass('active');
		self.modelSelect.val('-').attr({'disabled': 'disabled'});
	};
	
	_enableDownload = function(url){
		
		self.downloadBtn.attr({'href': url});
		self.download.addClass('active');
		
	};
	
	_disableDownload = function(){
		self.download.removeClass('active');
	};
	
	_resetInterface = function(){
		self.typeSelect.val('-');
		_disableModel();
		_disableDownload();
	};
	
	_init = function(){
		
		config();
		_resetInterface();
		_handleTypeChange();
		_handleModelChange();
		
	};
	
	return {
		
		initialize: _init
		
	};
	
}());




$(function(){
	
	var ismobile = null;
	var prev_ismobile = null;
	
	$( window ).resize(function() {
		
			
		ismobile = $( window ).width() < 1024;
		if(ismobile == prev_ismobile)
				return;
			prev_ismobile = ismobile;
			
		$('.item').each(function(){

			var $items = $(this).find('.press-list__item');

			var num_col = ismobile ? 3 : 4;
			
			$(this).find('.press-list__item--wrap').each(function(){
				
				var children = $(this).children();
				
				children.detach();
				
				children.insertBefore(this);
				$(this).remove();
			});
		
			for(var i = 0; i < $items.length ; i += num_col){
				$items.slice(i,i+num_col).wrapAll('<div class="press-list__item--wrap"></div>');
			}
		});
	});
});


IVECO.pressList = (function(){
	"use strict";

var width = $( window ).width();

	var _init,
		_handleAccordion,
		_handleItemHeight;
	
	_handleAccordion = function(){
		
		$('.readmore--container').click(function() {
			var windowWidth = $(window).width();
			if ($(this).parent('.press-list__item').hasClass('active')) {
				if(windowWidth < 768){
					$(this).parent('.press-list__item').removeClass('active');
				}
			}else {
				if(windowWidth < 768){
					$(this).parent('.press-list__item').removeAttr('style');
				}
				$('.press-list__item').removeClass('active');
				if(windowWidth < 768){
			$(this).parent('.press-list__item').toggleClass('active');
				}
			}
		});

		// $('.press-list__item').click(function() {
		// 	var windowWidth = $(window).width();
		// 	if ($(this).hasClass('active')) {
		// 		if(windowWidth < 768){
		// 			$(this).removeClass('active');
		// 		}
		// 	}else {
		// 		if(windowWidth < 768){
		// 			$(this).removeAttr('style');
		// 		}
		// 		$('.press-list__item').removeClass('active');
		// 		if(windowWidth < 768){
		// 			$(this).toggleClass('active');
		// 		}
		// 	}
		// });
		
	};

	_handleItemHeight = function(){

		var newItemHeight = -1;
		$('.press-list__item').each(function() {
		    if ($(this).height() > newItemHeight)
		        newItemHeight = $(this).height();
		});

		$('.press-list__item').each(function() {
			$('.press-list__item').css('height', 'auto');
			// $('.press-list__item').height(newItemHeight);
		  $('.press-list__item').addClass('resized');
		});

		$('.press-list__item .btn-default').addClass('resized');
		$('.press-list__item .btn--tools').addClass('resized');

		if(!Modernizr.touch) {
		$(window).resize(function() {
      if(this.resizeTO) clearTimeout(this.resizeTO);
			if($( window ).width() > 768)
				return;
      this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
      }, 200);
	    });
		}else {
			$(window).on('orientationchange',function() {
				if($( window ).width() > 768)
					return;
				setTimeout(function() {
					$(this).trigger('resizeEnd');
				}, 300);
			});
		}
	
		
	    $(window).bind('resizeEnd', function() {
		    
		    
		    
		    // funziona da mobile a desktop, ma non da desktop a mobile
		    var width = $( window ).width();
		    if(width > 768){
			    return;
		}
			
      

		    
        var newItemHeight = -1;
        $('.press-list__item').each(function() {
        	$(this).removeAttr('style');
        	$(this).css('height', 'auto');
            if ($(this).height() > newItemHeight) {
              newItemHeight = $(this).height();
            }
        });

        $('.press-list__item').each(function() {
        	$('.press-list__item').css('height', 'auto');
          $('.press-list__item').height(newItemHeight);
          $('.press-list__item').addClass('resized');
        });

        $('.press-list__item .btn-default').addClass('resized');
        $('.press-list__item .btn--tools').addClass('resized');

        // var windowWidth = $(window).width();
        // console.log('width: ', windowWidth);
        // console.log('new height: ', newItemHeight);
		});
	};
	
	_init = function(){
		_handleAccordion();
		_handleItemHeight();
	};
	
	return {
		initialize: _init	
	};
	
}());


/*------------------------------------*\
	$PHOTOGALLERY-AREA-PRESS
\*------------------------------------*/

 IVECO.photogallery = (function(){
	
	"use strict";
	
	var _init,
		_handleItemHeight,
		_handleResize,
		_handleMasonry,
		_handleGallery;
	
	_handleItemHeight = function(){
		
		var newItemHeight = -1;
		
		$('.photo-list__item').each(function() {
			$(this).css('height', 'auto');
			if ($(this).height() > newItemHeight){
				newItemHeight = $(this).height();
			}
		});
		
		$('.photo-list__item').each(function() {
			$(this).css('height', 'auto');
			$(this).height(newItemHeight);
		});
		
	};
	
	_handleResize = function(){
		
		$(window).resize(function() {
			if(this.resizeTO){
				clearTimeout(this.resizeTO);
			}
			this.resizeTO = setTimeout(function() {
				$(this).trigger('resizeEnd');
			}, 300);
		});
		
		$(window).bind('resizeEnd', function() {
			
			_handleItemHeight();
			
		});
	};

    _handleMasonry = function() {

        if ($('.photo-grid').length) {
            $('.photo-grid').masonry({
                gutter: 10,
                columnWidth: 233,
                itemSelector: '.grid-item'
            });
        }

        $('#more-photos-btn').on('click', function(e) {
            e.preventDefault();
            var items = $('.more-photos-content').find('.grid-item');
            $('.photo-grid').append(items).masonry('appended', items);
            $(this).fadeOut();
        });

    };

    _handleGallery = function() {

        $('.fancybox').fancybox({
            beforeShow: function() {
                var dida = this.element.find('.dida').html();
                this.title = dida;
            },
            helpers: {
                title: {
                    type: 'inside',
                    position: 'bottom'
                }
            },
            nextEffect: 'fade',
            prevEffect: 'fade'
        });

    };

	_init = function(){
		
		_handleItemHeight();
		
		_handleResize();
		
		_handleMasonry();
		
		_handleGallery();
		
	};
	
	return {
		initialize: _init
	};
	
}());


/* IVECO.readmore = (function(){
    "use strict";

    var _init,
        _setItem,
        _toggleMore,
        _compactClass = 'is-compact', 
        $target = $('.js-box-view-more'),
        _revealHint = $target.data('hint-reveal') || 'read more',
        _compactHint = $target.data('hint-compact') || 'read less';

    _toggleMore = function(event){

        var _toggledText;

        if($target.hasClass(_compactClass)){
            _toggledText = _compactHint;
        } else {
            _toggledText = _revealHint;
        };

        $target.toggleClass(_compactClass);
        $target.find('.js-box-view-more-cta').attr('title', _toggledText).find('span').text(_toggledText);

        event.preventDefault();

    };

    _setItem = function(){

        var _vmSkeleton = '<a href="#" title="'+_revealHint+'" class="box-view-more__cta js-box-view-more-cta"><span>'+_revealHint+'</span></a>'

        $target.append(_vmSkeleton);
        $target.addClass(_compactClass);

        $('.js-box-view-more-cta').on('click', _toggleMore);

    };

    _init = function(){
        _setItem();
    };

    return {
        initialize: _init
    };

}()); */


/*------------------------------------*\
	$HISTORY
\*------------------------------------*/

IVECO.history = (function() {

    "use strict";

    var _init,
        _handleAccordion;

    _handleAccordion = function() {

        var yearIsOpen = false;
        var slideTime = 400;

        $.fn.scrollToMe = function(options) {

            var options = (options || {});

            return this.each(function(idx, domEl) {
                var offsetTop = ($(this).offset().top + (options.offset || 0));
                var duration = (!isNaN(options.duration) ? options.duration : 300);
                var ease = (typeof(ease) === 'string' ? ease : 'easeOutExpo');
                $('html,body').animate({
                    scrollTop: offsetTop
                }, duration, ease);
            });
        };

        $('.year-btn-bullet').click(function() {

            if (yearIsOpen === false) {
                $(this).closest('.years-row').addClass('years-is-open');
                yearIsOpen = true;
                $(this).scrollToMe({
                    offset: -60
                });
            } else if (yearIsOpen === true) {
                if ($(this).closest('.years-row').hasClass('years-is-open')) {
                    $(this).closest('.years-row').removeClass('years-is-open');
                    yearIsOpen = false;
                } else {
                    $('.years-row').removeClass('years-is-open');
                    $(this).closest('.years-row').addClass('years-is-open');
                    yearIsOpen = true;
                    $(this).scrollToMe({
                        offset: -60
                    });
                }
            }

        });

    };

    _init = function() {

        _handleAccordion();

    };

    return {
        initialize: _init
    };

}());

/*------------------------------------*\
$CONTACT
\*------------------------------------*/

IVECO.contactFaq = (function(){
	"use strict";

	var _init,
	_handleAccordion;

	_handleAccordion = function(){

		$('[data-toggle="popover"]').popover({ trigger: 'hover' });

		$('.contact__accordion--toggle').click(function() {
			$(this).next().slideToggle('fast');
			$(".contact__accordion--content").not($(this).next()).slideUp('fast');
		});

	};

	_init = function(){

		_handleAccordion();

	};

	return {

		initialize: _init

	};

}());


IVECO.contactSelect = (function(){
	"use strict";

	var _init,
	_handleSelect;

	_handleSelect = function() {

		$('#grant_type_id').change(function() {
		$('div.number').hide();
		$('#number' + $(this).val()).show();
		}).change(); // Invoke it now

};

_init = function(){

	_handleSelect();

};

return {

	initialize: _init

};

}());

/*------------------------------------*\
$PAGINATION
\*------------------------------------*/

IVECO.pagination = (function(){
	"use strict";

	var _init,
	_handlePagination;

	_handlePagination = function(){

		// bind 'slid' function
		$('#myCarousel').bind('slid.bs.carousel', function() {

			// remove active class
			$('.pagination .active').removeClass('active');

			// get index of currently active item
			var inx = $('#myCarousel .item.active').index();

			// select currently active item and add active class
			$('.pagination li:eq(' + (inx + 1) + ')').addClass('active');

		});


		$('.carousel').carousel({
			interval: false,
			pause: false,
			wrap: false
		});


		// sync pagination and lightbox

		// find last photo list item and add last class
		$(".photo-list--page").each(function(){
				var last = $(this).children(':last');
				last.addClass('last');
		}); 

		// find correct anchors and add lastItem class
		$('.last .fancybox').addClass('lastItem');


		// find last photo list item and add first class
		$(".photo-list--page").each(function(){
				var first = $(this).children(':first');
				first.addClass('first');
		}); 

		// find correct anchors and add firstItem class
		$('.first .fancybox').addClass('firstItem');


		$(".fancybox").fancybox({
			loop : false,
			afterLoad: function(current, previous) {

				var target = $( this.element );

				if (previous) {


					if ( target.is( '.fancybox.lastItem' ) ) {

						if (current.index < previous.index) {
							$('#myCarousel').carousel('prev');
						}
					}

					if ( target.is( '.fancybox.firstItem' ) ) {

						if (current.index > previous.index) {
							$('#myCarousel').carousel('next');
						}

					}

				}
		    }
		});

		// end sync pagination and lightbox


	};

	_init = function(){

		_handlePagination();

	};

	return {

		initialize: _init

	};

}());

/*------------------------------------*\
	$SMOOTH SCROLLING
\*------------------------------------*/

IVECO.smoothScrolling = (function(){
	
	"use strict";
	
	var self = {},
		config,
		_scrollPage,
		_init;
	
	config = function(){
		
		self.anchorLink = $('a[href*=#]:not([href=#])').not('.fancybox').not('[data-toggle]');
		
	};
	
	_scrollPage = function(){
		
		self.anchorLink.click(function() {
			
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				
				var target = $(this.hash),
					targetOffsetTop,
					scrollTopNum;
				
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				
				targetOffsetTop = target.offset().top;
				
				/**
				 * quando abbiamo il menu panino, lo scrolltop deve tenere conto:
				 * - dei 50px di altezza della barra fixed (50px)
				 * - dell'eventuale menu di pagina (select-menu__select-wrap)
				 * quando è presente, bisogna tenere conto anche del menu della pagina prodotto (js-nav-product)
				 */
				scrollTopNum = Modernizr.mq('(max-width: 991px)') ?
					(targetOffsetTop - 50 - $('.select-menu__select-wrap').height() - $('.js-nav-product').height()) :
					(targetOffsetTop - $('.js-nav-product').height());
				
				if (target.length) {
					
					$('html,body').animate({
						scrollTop: scrollTopNum
					}, 1000);
					
					return false;
				}
				
			}
		});
		
	};
	
	_init = function(){
		
		config();
		_scrollPage();
		
	};
	
	return {
		
		initialize: _init
		
	};
	
}());


/*------------------------------------*\
	$READ-MORE
\*------------------------------------*/

IVECO.readMore = (function(){
	
	"use strict";
	
	var self = {},
		config,
		_toggleContent,
		_init;
	
	config = function(){
		
		self.btn = $('.read-more');
		self.btnOpen = $('.ricambi-read-more');
		self.btnClose = $('.ricambi-riduci');
		self.content = $('.more-content');
		
	};
	
	_toggleContent = function(){
		
		self.btn.click(function() {
			self.btnOpen.toggle(400);
			self.btnClose.toggle(400);
			self.content.toggle(400);
		});
		
	};
	
	_init = function(){
		
		config();
		_toggleContent();
		
	};
	
	return {
		
		initialize: _init
		
	};
}());


/*------------------------------------*\
	$LANDING (v1 - old)
\*------------------------------------*/

(function landingPage(){

    if($('.js-landing-content-item').length){

        function setLandingContentItemHeight(){

            var maxHeight = 0;

            $('.js-landing-content-item').each(function(){
                var itemHeight = parseInt($(this).outerHeight());
                if(itemHeight > maxHeight ) maxHeight = itemHeight;
            });

            $('.js-landing-content-item').css( 'height', maxHeight );

        };

        $(window).on('resize',function(){

            if($('.js-landing-content-item').first().css('float') == 'left'){

                setLandingContentItemHeight();

            } else {

               $('.js-landing-content-item').css('height', 'auto');

            }

        });

    };

    $('document').ready(function(){    

        if($('.js-landing-content-info').length){

            var $contentInfoClone = $('.js-landing-content-info').clone();

            $contentInfoClone.insertAfter($('.js-landing-content-item').first()).addClass('xs-clone');

        };

    });
	
	
})();

/*------------------------------------*\
	$SLIDER
\*------------------------------------*/

if (typeof IVECO === "undefined") {

	var IVECO = {};

}

/**
 * slider v1
 */
IVECO.slider = (function(){
	
	"use strict";
	
	var self = {},
		config,
		_initSlider,
		_handleResponsive,
		//hasScrolled = false,
		_installEventHandlers,
		_init;
	
	config = function(){
		
		self.sliderWrap = $('.slider');
		
	};
	
	_initSlider = function(){
		
		self.sliderWrap.each(function(index, el){
			
			var slider = $(el),
				isAutoplayRequired =  slider.hasClass('slider--autoplay') ? true : false,
				isAdaptiveHeightRequired = slider.hasClass('slider--adaptiveHeight') ? true : false,
				isRtl = $('html').attr('dir') === 'rtl';
			
			$(el).slick({
				arrows: false,
				autoplay: isAutoplayRequired,
				fade: true,
				dots: true,
				adaptiveHeight: isAdaptiveHeightRequired,
				rtl: isRtl
			});
			
		});
		
		// disable autoplay when user clicks a dot (to choose a slide)
		$(document).on('click', '.slick-dots > li', function(){
			
			$(this).closest('.slider').slick('slickSetOption', 'autoplay', false, false);
			
		});
		
	};
	
	_handleResponsive = function(){
		//alert('responsive!');
		$.fn.matchHeight._update();
		
	};
	
	_installEventHandlers = function(){
		
		$(window).on('scroll', _.debounce(function(){
			
			// stop autoplay when user scrolls down the page (to avoid page changing its total height when each slide has a differente height)
			
			//if ( !hasScrolled ) {
				
				if ( $('.visual-intro__content.slider--autoplay').hasClass('slick-initialized') ) {
					
					$('.visual-intro__content.slider--autoplay.slick-initialized').slick('slickPause');
					
					//hasScrolled = true;
					
				}
				
			//}
			
		}, 200));
		
	};
	
	_init = function(){
		
		config();
		_initSlider();
		_installEventHandlers();
		$.fn.matchHeight._update();
	};
	
	return {
		
		initialize: _init,
		handleResponsive: _handleResponsive
		
	};
	
}());

/*------------------------------------*\
	$HERO
\*------------------------------------*/

if (typeof IVECO === "undefined") {

	var IVECO = {};

}

/**
 * Handle Hero slider
 * @since september 2018
 * @desc developed for promo area, but installable anywhere (probably)
 * @see promozioni-home-page.hbs
 * @requires slick
 */
IVECO.Hero = (function(){

	"use strict";

	var self = {},
		_gatherElements,
		_installEventHandlers,
		_handleSlider,
		_init;
		
	_gatherElements = function(){
		
		self.$base = $('.js-hero__list');
		self.$item = self.$base.children('.hero__item');
		
	};

	_handleSlider = function(){
		
		if ( self.$item.length > 1 ) {
			
			self.$base.slick({
				arrows: true,
				dots: true,
				autoplay: false,
				adaptiveHeight: false,
				//rtl: isRtl,
				fade: true
			});
			
		}
		
	};
	
	_installEventHandlers = function(){
		
		self.$base.on('init', function(slick){
			
			//console.log(slick);
			var $prev = self.$base.find('.slick-prev');
			var $next = self.$base.find('.slick-next');
			
			self.$base.find('.slick-dots').wrap('<div class="slick-navigation js-slick-navigation"></div>');
			//self.$base.find('.slick-prev').prependTo('.js-slick-navigation');
			//self.$base.find('.slick-next').appendTo('.js-slick-navigation');
			self.$base.find('.js-slick-navigation')
				.prepend( $prev )
				.append( $next );
			
		});

	};

	_init = function(){
		
		if ( $('.js-hero__list').length ) {
			_gatherElements();
			_installEventHandlers();
			_handleSlider();
		}
		
	};

	return {
		init: _init
	};

})();

IVECO.Hero.init();

/*------------------------------------*\
	$PROMO
\*------------------------------------*/
if (typeof IVECO === "undefined") {

	var IVECO = {};

}

$(window).on('load',function (){
	$(".promo .slick-dots").wrap("<div class=\"container\"></div>");
}); 

IVECO.promo = (function promoPage(){

	$(document).ready(function(){

		$('.js-tab-control').on('change', function(){

			var _target = '#' + $(this).val();

			$('.js-tab-controlled').find('a[href='+_target+']').trigger('click');

		});

	});

	if($('.js-offers-grid-list').length){

		var $list = $('.js-offers-grid-list'),
			$items = $list.children( 'li' );
			
		var setGridItemHeight  = function(){

			$items.css( 'height', 'auto' );

			var perRow = Math.floor( $list.width() / $items.width() );
			
			if( perRow == null || perRow < 2 ) return true;

			for( var i = 0, j = $items.length; i < j; i += perRow ){

				var maxHeight = 0,
					$row = $items.slice( i, i + perRow );

				$row.each(function(){
					var itemHeight = parseInt( $( this ).outerHeight() );
					if ( itemHeight > maxHeight ) maxHeight = itemHeight;
				});

				$row.css( 'height', maxHeight );
				$items.css('opacity',1);
			};
		};

		$(window).on('load',function(){        

			$(window).on('resize',function(){

				setGridItemHeight();

			});  

			setGridItemHeight();       

		});

	};
	
	return {
		setGridItemHeight: setGridItemHeight
	};

})();


/**
 * Handle Promotion (new version)
 * @since september 2018
 * @requires foundation-tabs
 * @requires jquery-countdown
 */
IVECO.Promotion = (function(){

	"use strict";

	var $controller,
		$pot,
		$loading,
		htmlHighlight,
		
		_startCountdown,
		_updateCountdown,
		_endCountdown,
		_ajaxFilter,
		_printFilter,
		_getFilterBody,
		_handleFilter,
		_ajaxList,
		_getAjaxFilter,
		_printList,
		_getPromoItem,
		_getCountdownTemplate,
		_getCta,
		_ajaxCount,
		_printCount,
		_gatherElements,
		_installEventHandlers,
		_init;
	
	_startCountdown = function(){
		
		$('[data-countdown]').each(function() {
			
			var	$this = $(this),
				finalDate = $(this).data('countdown');
			
			$this.countdown( finalDate )
				.on('update.countdown', _updateCountdown)
				.on('finish.countdown', _endCountdown);
			
		});
		
	};
	
	_updateCountdown = function(ev){
		
		$(this).html( ev.strftime('\
			<span class="countdown__pane countdown__pane--days">\
				<span class="countdown__number">%-D</span>\
				<span class="countdown__legend">d</span>\
			</span>\
			<span class="countdown__colon">:</span>\
			<span class="countdown__pane countdown__pane--hours">\
				<span class="countdown__number">%H</span>\
				<span class="countdown__legend">h</span>\
			</span>\
			<span class="countdown__colon">:</span>\
			<span class="countdown__pane countdown__pane--min">\
				<span class="countdown__number">%M</span>\
				<span class="countdown__legend">m</span>\
			</span>\
			<span class="countdown__colon">:</span>\
			<span class="countdown__pane countdown__pane--sec">\
				<span class="countdown__number">%S</span>\
				<span class="countdown__legend">s</span>\
			</span>\
		') );
		
	};
	
	_endCountdown = function(ev){
		
		//window.location.replace('//www.iveco.com/TeamPetronasDeRooyIveco/Pages/home.aspx');
		
	};
	
	_ajaxFilter = function(){
		
		var url = $controller.find('input[name="promo-filter-url"]').val();
		//console.log( url );
		
		var jqxhr = $.ajax({
			url: url
		})
		.done( _printFilter )
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log( errorThrown );
		})
		.always(function() {
			//alert( "complete" );
		});
		
	};
	
	_printFilter = function(res) {
		
		//console.log( res );
		var htmlTabHead = '';
		var htmlTabBody = '';
		
		if ( res.success ) {
			
			htmlTabHead += '<ul class="nav nav-tabs" role="tablist">';
			
			$.each(res.data.vehicle, function(index, vehicle){
				
				var classActive;
				
				index == 0 ? 
					classActive	= 'active' :
					classActive	= '' ;
					
				htmlTabHead +=	'<li role="presentation" data-vehicle="'+ vehicle.id +'" class="'+ classActive +'">'+
												'	<a href="#tab-vehicle-'+ vehicle.id +'" aria-controls="'+ vehicle.id +'" role="tab" data-toggle="tab">'+ vehicle.text +'</a>'+
												'</li>';
				
				htmlTabBody += _getFilterBody( index, vehicle );
				
			});
			
			htmlTabHead += '</ul>';
			
			$controller.find('.js-nav-tab-wrap').html( htmlTabHead );// print tab controls
			$controller.find('.js-tab-content').html( htmlTabBody );// print tab contents
			
			// fire ajax call at landing, when filters are ready
			_ajaxList();
			
		}
		
	};
	
	_getFilterBody = function(vehicleIndex, vehicleValue){
		
		var code = '';
		var classActive = '';
		
		vehicleIndex == 0 ? 
			classActive	= ' active in' :
			classActive	= '' ;
		
		code +=	'<div role="tabpanel" class="promotion__tab-pane tab-pane fade'+ classActive +'" id="tab-vehicle-'+ vehicleValue.id +'">'+
						'	<fieldset class="promotion__fieldset js-promotion__fieldset">'+
						'		<legend class="promotion__legend">'+ vehicleValue.filter.title +'</legend>';
		
		$.each(vehicleValue.filter.list, function(index, filter){
			var attrChecked;
			var attrDisabled;
			
			index == 0 ?
				attrChecked = 'checked' :
				attrChecked = '' ;
			
			filter.enabled ?
				attrDisabled = '' :
				attrDisabled = 'disabled' ;
			
			// overwrites for special 'All' value
			if ( filter.id === 'All' ){
				attrChecked = 'checked';
				attrDisabled = 'disabled';
			}
			
			code +=	'		<label class="promotion__checkwrap">'+
							'			<input class="promotion__input js-promotion__input" type="checkbox" name="filter" value="'+ filter.id +'" '+ attrChecked +' '+ attrDisabled +' />'+
							'			<span class="promotion__label">'+ filter.text +'</span>'+
							'		</label>';
		});
		
		code +=	'	</fieldset>'+
						'</div>';
		
		return code;
	};
	
	/**
	 * handle checkboxes change by user click
	 */
	_handleFilter = function(){
		
		var	$clickedCheck = $(this),
			$currentFieldset = $clickedCheck.closest('.js-promotion__fieldset'),
			$checkbox = $currentFieldset.find('.js-promotion__input'),
			$checkboxSpecial = $checkbox.filter('[value="All"]'),
			$checkboxNormal = $checkbox.not('[value="All"]');
		
		if ( $clickedCheck.is( $checkboxSpecial ) ) {
			//console.log('All');
			/**
			 * when activate 'All' filter, turn off other filters
			 * 'All' filter cannot be deselected
			 */
			if ( $clickedCheck.prop('checked') ){
				$checkboxNormal.prop('checked', false);
				$checkboxSpecial.prop('disabled', true);
			}
			
		} else {
			//console.log('not, normal');
			//console.log( $checkboxNormal.filter(':checked').length );
			
			if ( $clickedCheck.prop('checked') ){
				
				$checkboxSpecial.prop('checked', false);
				$checkboxSpecial.prop('disabled', false);
				
			} else {
				if ( $checkboxNormal.filter(':checked').length === 0 ) {
					$checkboxSpecial.prop('checked', true);
					$checkboxSpecial.prop('disabled', true);
				}
			}
		}
		
		// fire ajax call when user changes filters
		_ajaxList();
		
	};
	
	_ajaxList = function(){
		
		var url = $controller.find('input[name="promo-list-url"]').val(),
			currentVehicle = $controller.find('.js-nav-tab-wrap').find('li.active').attr('data-vehicle'),
			currentFilter = _getAjaxFilter(),
			jqxhr;
		
		//console.log( url );
		//console.log( currentVehicle );
		//console.log( currentFilter );
		
		if ( $loading ) {
			$pot.html( $loading );
		}
		
		jqxhr = $.ajax({
			url: url,
			data: {
				vehicle: currentVehicle,
				filter: currentFilter
			}
		})
		.done( _printList )
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log( errorThrown );
		})
		.always(function() {
			//alert( "complete" );
		});
		
	};
	
	_getAjaxFilter = function(){
		
		var filterArray = [];
		
		$controller.find('.js-promotion__fieldset').filter(':visible').find('[name="filter"]').filter(':checked').each(function(){
			filterArray.push( $(this).val() );
		});
		
		return filterArray.join();
		
	};
	
	_printList = function(res){
		
		//console.log( res );
		var htmlGroup;
		
		// save loading div from dom, to re-insert it later (during next ajax call)
		if ( !$loading ) {// do it only the first time
			$loading = $pot.children('.loading').detach();
		}
		
		// reset
		$pot.empty();
		htmlHighlight = '';// its scope is the entire IVECO.Promotion, so just reset it 
		
		if ( res.success ) {
			
			$.each(res.data.vehicle, function(index, vehicle){
				
				htmlGroup = '';// reset
				htmlGroup +=	'<section class="promotion-group">'+
											'	<div class="promotion-group__head">'+
											'		<h2 class="promotion-group__vehicle">'+ vehicle.title +'</h2>'+
											'		<div class="promotion-group__count">'+
											'			<span class="promotion-group__count__label">'+ vehicle.label +'</span>'+
											//'			<span class="promotion-group__count__value">'+ vehicle.count +'</span>'+
											'			<span class="promotion-group__count__value">'+ vehicle.promo.length +'</span>'+
											'		</div>'+
											'	</div>'+
											'	<div class="promotion-group__body">';
				htmlGroup +=	_getPromoItem(index, vehicle);
				htmlGroup +=	'	</div>';// closes .promotion-group__body
				htmlGroup +=	'</section>';
				
				$pot.append( htmlGroup );
				
			});
			
			$pot.prepend( htmlHighlight );
			_startCountdown();
			
		}
	};
	
	_getPromoItem = function(vehicleIndex, vehicleValue){
		
		var code = '';
		var htmlPromo = '';
		var htmlCountdown = '';
		
		htmlPromo += '<div class="promotion-list">';
		
		$.each(vehicleValue.promo, function(index, promo){
			
			if ( !promo.hasCountdown ) {
				
				htmlPromo += ''+
				'<a class="promotion-item" href="'+ promo.link +'">'+
				'	<div class="promotion-item__type">'+ promo.type +'</div>'+
				'	<div class="promotion-item__pic">'+
				'		<img class="promotion-item__img" src="'+ promo.pic +'" alt="" />'+
				'	</div>'+
				'	<div class="promotion-item__text">'+
				'		<div class="promotion-item__title">'+ promo.title +'</div>'+
				'		<div class="promotion-item__content">'+ promo.content +'</div>'+
				'	</div>'+
				'	<div class="promotion-item__foot">'+
				'		<div class="promotion-item__expiry">​​​​​​​​​'+ promo.dateText +'</div>';
				//'		<div class="promotion-item__cta btn btn-default">'+ promo.cta +'</div>'+
				htmlPromo += _getCta( promo.cta );
				htmlPromo += ''+
				'	</div>'+
				'</a>';
			
			}
			
			if ( promo.hasCountdown ) {
				
				if ( !promo.isHighlight ) {// countdown but no highlight
					
					htmlCountdown += ''+
					'<div class="promotion__countdown js-promotion__countdown">'+
					'	<a class="promotion-item" href="'+ promo.link +'">'+
					'		<div class="promotion-item__pic">'+
					'			<img class="promotion-item__img" src="'+ promo.pic +'" alt="" />'+
					'		</div>'+
					'		<div class="promotion-item__text">'+
					'			<div class="promotion-item__type">'+ promo.type +'</div>'+
					'			<div class="promotion-item__title">'+ promo.title +'</div>'+
					'			<div class="promotion-item__content">'+ promo.content +'</div>'+
					'			<div class="promotion-item__expiry">'+ promo.dateText +'</div>'+
					'		</div>'+
					'		<div class="promotion-item__exhortation">'+
					'			<div class="promotion-item__hurry">'+
					'				<div class="promotion-item__hurry__title">'+ promo.countdownTitle +'</div>'+
					'				<div class="promotion-item__hurry__content">'+ promo.countdownText +'</div>'+
					'			</div>'+
					'			<div class="promotion-item__timer countdown" data-countdown="'+ promo.dateIso +'">';
					htmlCountdown += _getCountdownTemplate();
					htmlCountdown += ''+
					'			</div>';
					//'			<div class="promotion-item__cta btn btn-default">'+ promo.cta +'</div>'+
					htmlCountdown += _getCta( promo.cta );
					htmlCountdown += ''+
					'		</div>'+
					'	</a>'+
					'</div>';
				
				} else {// countdown and highlight
					
					htmlHighlight = ''+
					'<section class="promotion__highlight">'+
					'	<div class="promotion__countdown js-promotion__countdown">'+
					'		<a class="promotion-item" href="'+ promo.link +'">'+
					'			<div class="promotion-item__pic">'+
					'				<img class="promotion-item__img" src="'+ promo.pic +'" alt="" />'+
					'			</div>'+
					'			<div class="promotion-item__text">'+
					'				<div class="promotion-item__pre">'+ promo.highlightText +'</div>'+
					'				<div class="promotion-item__title">'+ promo.title +'</div>'+
					'				<div class="promotion-item__content">'+ promo.content +'</div>'+
					'				<div class="promotion-item__expiry">'+ promo.dateText +'</div>'+
					'			</div>'+
					'			<div class="promotion-item__exhortation">'+
					'				<div class="promotion-item__hurry">'+
					'					<div class="promotion-item__hurry__title">'+ promo.countdownTitle +'</div>'+
					'					<div class="promotion-item__hurry__content">'+ promo.countdownText +'</div>'+
					'				</div>'+
					'				<div class="promotion-item__timer countdown" data-countdown="'+ promo.dateIso +'">';
					htmlHighlight += _getCountdownTemplate();
					htmlHighlight += ''+
					'				</div>';
					//'				<div class="promotion-item__cta btn btn-default">'+ promo.cta +'</div>'+
					htmlHighlight += _getCta( promo.cta );
					htmlHighlight += ''+
					'			</div>'+
					'		</a>'+
					'	</div>'+
					'</section>';
					
				}
				
			}
			
		});
		
		htmlPromo +=	'</div>';// closes .promotion-list
		
		code = htmlPromo + htmlCountdown;
		return code;
		
	};
	
	_getCountdownTemplate = function(){
		
		var template = ''+
		'<span class="countdown__pane countdown__pane--days">'+
		'	<span class="countdown__number">0</span>'+
		'	<span class="countdown__legend">d</span>'+
		'</span>'+
		'<span class="countdown__colon">:</span>'+
		'<span class="countdown__pane countdown__pane--hours">'+
		'	<span class="countdown__number">00</span>'+
		'	<span class="countdown__legend">h</span>'+
		'</span>'+
		'<span class="countdown__colon">:</span>'+
		'<span class="countdown__pane countdown__pane--min">'+
		'	<span class="countdown__number">00</span>'+
		'	<span class="countdown__legend">m</span>'+
		'</span>'+
		'<span class="countdown__colon">:</span>'+
		'<span class="countdown__pane countdown__pane--sec">'+
		'	<span class="countdown__number">00</span>'+
		'	<span class="countdown__legend">s</span>'+
		'</span>';
		
		return template;
	};
	
	_getCta = function(cta){
		var code = '';
		
		if ( cta !== '' ){
			code = '				<div class="promotion-item__cta btn btn-default">'+ cta +'</div>';
		}
		
		return code;
	};
	
	/**
	 * @description fetch and print current number of promotions availables
	 * only 1 (one) occurrence per page is supported
	 * @since december 2018
	 */
	_ajaxCount = function(){
		
		var url = $('input[name="promo-count-url"]').val();
		
		var jqxhr = $.ajax({
			url: url
		})
		.done( _printCount )
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log( errorThrown );
		})
		.always(function() {
			//alert( "complete" );
		});
		
	};
	
	_printCount = function(res){
		
		if ( res.success ) {
			
			//console.log( res.data.vehicle[0].promo.length );
			$('.js-promo__count').text( res.data.vehicle[0].promo.length );
			
		}
	};
	
	_gatherElements = function(){
		
		$controller = $('.js-promotion__controller');
		$pot = $('.js-promotion__pot');
		
	};
	
	_installEventHandlers = function(){
		
		$controller.on('change', '.js-promotion__input', _handleFilter);
		
		// fire ajax call when user changes vehicle
		$controller.on('shown.bs.tab', function(){
			_ajaxList();
		});
	};
	
	_init = function(){
		
		if ( $('input[name="promo-filter-url"]').length ) {
			_gatherElements();
			_installEventHandlers();
			_ajaxFilter();
		}
		
		if ( $('input[name="promo-count-url"]').length ) {
			_ajaxCount();
		}
		
	};
	
	return {
		init: _init
	};
	
})();

IVECO.Promotion.init();

/*------------------------------------*\
	$TECH-DATA-CONFIGURATOR
\*------------------------------------*/

IVECO.techDataConfigurator = (function(){
	
	"use strict";
	
	var self = {},
		config,
		
		_callJson,
		_resetForm,
		_initSelects,
		_resetApp,
		_resetSelect,
		_changeSelect,
		_getPosition,
		_updateSelect,
		_getResults,
		_arrotonda,
		_newWhere,
		_checkStep,
		_getLabel,
		_getUniqueElement,
		_enableSelect,
		_unique,
		_querystringCheck,
		
		_init;
	
	config = function(){
		
		self.myJson = typeof myJSON != 'undefined' ? myJSON : '';
		self.myList = '';
		self.filterList = '';
		self.whereList = '';
		self.stepCC = 0;
		self.nrTotStep = 5;
		self.selectList = '';
		self.arAttrs = new Array();
		self.arResults = new Array();
		
		self.form = $('.form-dati-tecnici');
		self.selectWrap = self.form.find('.form-dati-tecnici__selects');
		self.submit = self.form.find('.submit');
		self.reset = self.form.find('.reset-form');
		self.box = $('.box-dati-tecnici');
		self.results = self.box.find('.data-results');
		self.notes = self.box.find('.note');
		
	};
	
	_callJson = function(){
		
		if(self.myJson=='') return;
		
		$.getJSON( self.myJson,
			
			function(data) {
				
				self.myList = data;
				self.filterList = JSLINQ(data.Data);
				self.whereList = self.filterList;
				
				var i = 0,
					attr;
				for (attr in self.filterList.items[0]){
					self.arAttrs.push(attr);
					i++;
				}
				
				_initSelects();
				
			}
			
		);
		
	};
	
	_resetForm = function(){
		
		self.reset.on('click', function() {
			
			if (!$(this).is('.disabled')) {
				
				var selectLen = self.form.find("select").length;
				
				self.form.find("select").eq(0).find('option').eq(0).val('').removeAttr('disabled');
				
				for (var i = 1; i < selectLen; i++) {
					self.form.find("select").eq(i).empty().attr("disabled", "disabled").parent('.block').addClass("disabled");
					
					self.form.find("select").eq(i).append("<option val=''>" + _getLabel("SELEZIONA", "label") + "</option>");
				}
				
				$(this).parents('.form').find('select').val('');
				
				self.box.hide();
				
				self.results.empty();
				
				$(this).addClass('disabled');
				
				$('.start_stop').hide().find('input').attr('checked', false);
			}
			
			return false;
			
		});
		
	};
	
	_initSelects = function(){
		
		var myAttr,
			i;
		
		self.submit.html('<strong>' + _getLabel("calcola", "label") + '</strong>');
		
		self.reset.html('<strong>' + _getLabel("reset", "label") + '</strong>');
		
		for (var i = 0; i < self.nrTotStep; i++) {
			
			myAttr = self.arAttrs[i];
			
			self.selectList +=	"<div class='block disabled " + _getLabel(myAttr, 'class') + "'>"+
									"<label><strong>" + _getLabel(myAttr, "label") + "</strong></label>"+
									"<select name='" + myAttr + "' class='select form-control' disabled>"+
										"<option>" + _getLabel("SELEZIONA", "label") + "</option>"+
									"</select>"+
								"</div>";
			
		}
		
		self.selectList +=	"<div class='block start_stop'>"+
								"<label for='' class=''><strong>Start&Stop</strong> <input type='checkbox' rel='' id='' name='' class=''></label>"+
							"</div>"+
							"<br>";
		
		self.selectWrap.html(self.selectList);
		
		
		
		self.form.find('select').on('change', function() {
			
			var Sthis = $(this);
			
			self.box.hide();
			
			if (Sthis.val().search('F1A') > -1) {
				
				$('.start_stop').show();
				
			} else {
				
				$('.start_stop').hide();
				
			}
			if (Sthis.children("option").eq(0).val() == _getLabel("SELEZIONA", "label")) {
				
				Sthis.children("option").eq(0).attr("disabled", "disabled");
				
			}
			
			_checkStep(_getPosition(this), this);
			
			self.reset.removeClass("disabled");
			
		});
		
		_updateSelect(0);
		
		
	};
	
	_resetApp = function(){
		
		self.myList = "";
		self.filterList = "";
		self.whereList = "";
		self.stepCC = 0;
		self.nrTotStep = 0;
		self.selectList = "";
		self.arAttrs = new Array();
		self.arResults = new Array();
		
		self.form.children("div").remove();
		self.submit.addClass("disabled");
		
	};
	
	_resetSelect = function(from){
		
		var selectLen = self.form.find("select").length;
		
		for (var i = from; i < selectLen; i++) {
			self.form.find("select").eq(i).empty().attr("disabled", "disabled").parent('.block').addClass("disabled"); //.append("<option>Seleziona</option>");
			self.form.find("select").eq(i).append("<option>" + _getLabel("SELEZIONA", "label") + "</option>");
		}
		
		if (from < self.nrTotStep) {
			self.submit.addClass("disabled");
		}
		
		_newWhere(from);
		
	};
	
	_changeSelect = function(select){
		
		if ($(select).children("option").eq(0).val() == _getLabel("SELEZIONA", "label")) {
			$(select).children("option").eq(0).attr("disabled", "disabled");
		}
		
		var myAttr = self.arAttrs[self.stepCC];
		
		self.stepCC++;
		
		self.whereList = self.whereList.Where(function(item) {
			return item[myAttr] == $(select).val();
		});
		
		_updateSelect(self.stepCC);
		
	};
	
	_getPosition = function(select){
		
		var myIndex;
		
		self.form.find("select").each(function(index, value) {
			if ($(value).is($(select))) {
				myIndex = index;
			}
		});
		
		return myIndex;
		
	};
	
	_updateSelect = function(myStep){
		
		var selectList = "";
		var arTempSelect = new Array(); //Array temporaneo select
		
		arTempSelect = _getUniqueElement(self.arAttrs[myStep], self.whereList);

		for (var i = 0; i < arTempSelect.length; i++) {
			selectList += '<option value="' + arTempSelect[i] + '">' + _getLabel(arTempSelect[i], 'label') + '</option>';
		}
		if (arTempSelect[0] != "-") {
			var mySelect = self.arAttrs[myStep];
			$('select[name="' + mySelect + '"]').removeAttr("disabled").parent('.block').removeClass("disabled");
			$('select[name="' + mySelect + '"]').append(selectList);
		} else {
			_checkStep(_getPosition($('select[name="' + self.arAttrs[myStep] + '"]')), self.arAttrs[myStep]);
			//stepCC++;
		}
		//$('.form-dati-tecnici').find('.customStyleSelectBox').remove();
		//$('.form-dati-tecnici').find('select').customSelect();
		
	};
	
	_getResults = function(){
		
		/* DATICONSUMI */
		var startStop = $('.start_stop input').is(':checked') && $('.start_stop input').is(':visible');
		
		var myAttr = self.arAttrs[self.stepCC];
		
		var htmlTr = "";

		var i = 0,
			attr;
		for (attr in self.whereList.items[0]) {
			self.arResults.push(attr);
			i++;
		}
		var count = self.arResults.length;

		for (var i = 0; i < count; i++) {
			myAttr = self.arResults[i];
			if (i == 4) {
				htmlTr += "<tr>";
				htmlTr += "<td><strong>" + _getLabel("startStop", "label") + ":</strong></td>";
				if (startStop) {
					htmlTr += "<td>" + _getLabel("startStop_yes", "label") + "</td>";
				} else {
					htmlTr += "<td>-</td>";
				}
				htmlTr += "</tr>";
			}
			if (myAttr.search('startstop') > -1 /*&& startStop*/ ) {
				htmlTr += "<tr class='start'>";
				htmlTr += "<td><strong>" + _getLabel(myAttr, "label") + ":</strong></td>";
				htmlTr += "<td>" + _arrotonda(self.whereList.items[0][myAttr], 1, "d") + "**</td>";
				htmlTr += "</tr>";
			} else if (myAttr.search('consumo') > -1 /* && !startStop*/ ) {
				htmlTr += "<tr class='consumo'>";
				htmlTr += "<td><strong>" + _getLabel(myAttr, "label") + ":</strong></td>";
				htmlTr += "<td>" + _arrotonda(self.whereList.items[0][myAttr], 1, "d") + "**</td>";
				htmlTr += "</tr>";
			} else if (self.whereList.items[0][myAttr] != "-") {
				htmlTr += "<tr>";
				htmlTr += "<td><strong>" + _getLabel(myAttr, "label") + ":</strong></td>";
				htmlTr += "<td>" + self.whereList.items[0][myAttr] + "</td>";
				htmlTr += "</tr>";
			}
		}
		self.results.html(htmlTr);
		self.notes.eq(0).text(_getLabel("note_1", "label"));
		self.notes.eq(1).text(_getLabel("note_2", "label"));

		if (startStop) {
			$('.consumo').hide();
			$('.start').show();
		} else {
			$('.start').hide();
			$('.consumo').show();
		}

		$('.start_stop input').change(function() {
			self.submit.removeClass("disabled");
		});

		self.box.css("display", "block");
		self.arResults = new Array();
		
	};
	
	_arrotonda = function(num, dec, mod){
		
		var div = Math.pow(10, dec);
		
		switch (mod) {
			case 'e':
			case 'E': //arrotonda per eccesso
				return Math.ceil(num * div) / div;
				break;
			case 'd':
			case 'D': //arrotonda per difetto
				return Math.floor(num * div) / div;
				break;
			case 't':
			case 'T': //troncamento
				return parseInt(num * div) / div;
				break;
			case 'a':
			case 'A':
			default: //arrotonda
				return Math.round(num * div) / div;
		}
		
	};
	
	_newWhere = function(from){
		
		var newList = self.filterList;
		
		var myAttr;
		
		for (var i = 0; i < from; i++) {
			
			if (self.form.find("select").eq(i).val() != _getLabel("SELEZIONA", "label")) {
				myAttr = self.form.find("select").eq(i).attr("name");
				newList = newList.
				Where(function(item) {
					return item[myAttr] == self.form.find("select").eq(i).val();
				});
			}
		}
		
		self.whereList = newList;
		
	};
	
	_checkStep = function(posSelect, mySelect){
		
		_resetSelect(posSelect + 1);
		
		self.stepCC = posSelect + 1;
		
		_updateSelect(posSelect + 1);
		
		if (posSelect == self.nrTotStep - 1) {
			
			self.stepCC = posSelect;
			
			posSelect = self.nrTotStep - 1;
			
			self.submit.removeClass('disabled');
			
			self.submit.on("click", function() {
				
				if (!$(this).is('.disabled')) {
					
					self.results.empty();
					
					_getResults();
					
					$(this).addClass('disabled');
					
					return false;
					
				}
			})
			
		}
	};
	
	_getLabel = function(nameLabel, what){
		
		var myLabel = nameLabel;
		
		try {
			myLabel = self.myList.Text[0][nameLabel][what];
		} catch (err) {}
		
		return myLabel;
		
	};
	
	_getUniqueElement = function(element, jsonList){
		
		var arTemp = new Array();
		
		var jsonListCount = jsonList.Count();
		
		for (var i = 0; i < jsonListCount; i++) {
			arTemp.push(jsonList.items[i][element]);
		}
		
		arTemp = _unique(arTemp);
		
		return arTemp;
		
	};
	
	_enableSelect = function(mySelect){
		
		 $('select[name="' + mySelect + '"]').removeAttr('disabled');
		
	};
	
	_unique = function(origArr){
		
		var newArr = [],
			origLen = origArr.length,
			found,
			x, y;
			
		for (x = 0; x < origLen; x++) {
			
			found = undefined;
			
			for (y = 0; y < newArr.length; y++) {
				
				if (origArr[x] === newArr[y]) {
					found = true;
					break;
				}
			}
			
			if (!found) newArr.push(origArr[x]);
		}
		
		return newArr;
		
	};
	
	_querystringCheck = function(key){
		
		var re = new RegExp('(?:\\?|&)' + key + '=(.*?)(?=&|$)', 'gi');
		
		var r = [],
			m;
			
		while ((m = re.exec(document.location.search)) != null) r.push(m[1]);
		
		return r;
		
	};
	
	_init = function(){
		
		config();
		
		_callJson();
		
		_resetForm();
		
	};
	
	return {
		
		initialize: _init
		
	};
}());

/*------------------------------------*\
	$CONTACT-TECHNICAL-SHEET-CASCADE
\*------------------------------------*/

IVECO.contactTechnicalSheet = (function() {

	"use strict";

	var self = {},
		config,
		_handleStep,
		_enableType,
		_disableType,
		_resetInterface,
		_init;

	config = function() {
		self.categorySelect = $('.technicalsheets .technical-sheet__step--category select');
	};

	_handleStep = function() {

		self.categorySelect.change(function() {

			if ($(this).val() != '-') {
				
				$('#TechAjaxRet div').detach();
				
				$.ajax({ 
					cache: false, 
					type: "GET",
					url: $('#TechAjaxPage').val(),
					data: "xslPath=" + $('#xslPath').val() + "&IconPath=" + $('#IconPath').val() + "&Category=" + $(this).val(),
					success: function (data) {
						$('#TechAjaxRet').append(data); 
						IVECO.technicalSheet.initialize(); 
						_enableType(); 
						$(".technical-sheet__step.technical-sheet__step--type").addClass("active");
					}
				});
				
			} else
				_disableType();
		});
	};

	_enableType = function() {
		$('.technical-sheet-second-box').css('display', 'block');
	};

	_disableType = function() {
		$('.technical-sheet-second-box').css('display', 'none');
	};

	_resetInterface = function() {
		self.categorySelect.val('-');
	};

	_init = function() {
		config();
		_handleStep();
		_resetInterface();
	};

	return {
		initialize: _init
	};
}());

IVECO.contactUs = (function(){

	"use strict";

	var _init = function(){

		var isMobile = null;
		var isMobilePrev = null;

		$(window).on("resize", function() {

			// Controllo se siamo in mobile oppure desktop e
			// se la visualizzazione non è diversa da quella precedente
			// interrompo l'esecuzione dello script
			isMobile=$(window).innerWidth() < 992;
			if (isMobile == isMobilePrev)
				return;
			isMobilePrev = isMobile;

			// In mobile elimino lo slick
			if (isMobile) {
                if($('.multiple-items').hasClass('slick-initialized')) { // Migu's Fix
				    $('.multiple-items').slick('unslick'); 
                }

			// In desktop inizializzo lo slider con il relativo fix
			} else {

				// Questa classe serve per renderizzare gli slick slider nasosti
				// verrà rimossa all'apertura del panel, cambio anche l'icona
				$('.panel-collapse:not(:visible)').addClass('slick-fix');
				$('.panel-collapse:not(.slick-fix)').closest('.panel').find('h4 .glyphicon:first')
					.removeClass('glyphicon-chevron-down')
					.addClass('glyphicon-chevron-up');

				$('.multiple-items').slick({
					//infinite: true, // Migu's Fix
                    infinite: false, // Migu's Fix
					slidesToShow: 3,
					slidesToScroll: 3,
					dots: true
				});

			}
		});

		// Eseguo una prima volta lo script per i resize
		$(window).trigger("resize");

		// Gestisco classe per il fix e icona dell'header
		$('.panel-collapse').on({

			// Quando apro il panel, rimuovo la classe per fixare lo slick
			// slider e cambio l'icona
			'show.bs.collapse': function(event){
				$(this).removeClass('slick-fix');
				$(this).closest('.panel').find('h4 .glyphicon:first')
					.removeClass('glyphicon-chevron-down')
					.addClass('glyphicon-chevron-up');
                //$(this).closest('.panel').find('.panel-title').addClass('active');
                $(this).closest('.panel').find('.panel-title').first().addClass('active');

                event.stopPropagation();
			},

			// Quando chiudo il panel cambio l'icona
			'hide.bs.collapse': function(event){
				$(this).closest('.panel').find('h4 .glyphicon:first')
					.removeClass('glyphicon-chevron-up')
					.addClass('glyphicon-chevron-down');
                //$(this).closest('.panel').find('.panel-title').removeClass('active');
                $(this).closest('.panel').find('.panel-title').first().removeClass('active');

                event.stopPropagation();
			},

			// Quando il pannello è chiuso, rimetto la classe per il fix
			'hidden.bs.collapse': function(){
				// $(this).addClass('slick-fix');
			},

            'shown.bs.collapse': function() {
                var panelOffsetTop;
                var $panel;

                if (isMobilePrev) {
                    $panel = $(this).closest('.panel');
                    panelOffsetTop =  $panel.offset().top - $('.navbar-header').height() - 8;

                    window.scrollTo(0, panelOffsetTop);
                }
            }

		});

        if($('.multiple-items').length){

            $('.multiple-items').find('.block-link').each(function(){

                var $item = $(this), 
                    targetHref = $item.attr('href') || null,
                    $target = $item.closest('.box-content');

                $target.css('cursor', 'pointer').on('click', function(event){
                    if(targetHref !== null){
                        window.location.href = targetHref;
                    }
                });

            });

        }

	};

	return {

		initialize: _init

	};



}());

/*------------------------------------*\
	$VEHICLE-CONFIGURATOR 
	Configurator + Stock Availability
\*------------------------------------*/

IVECO.configurator = (function(){
	
	"use strict";
	
	var self = {},
		config,

		_checkType,
		_initHome,
		_setImagePath,
		_goToStep,
		_callJSON,
		_initTitle,
		_initSelects,
		_resetApp,
		_resetSelect,
		_changeSelect,
		_getPosition,
		_updateSelect,
		_getResults,
		_newWhere,
		_checkStep,
		_loadImages,
		_getLabel,
		_getUniqueElement,
		_enableSelect,
		_unique,
		_querystringCheck,
		_getWhereList,
		_getArAttrs,
		_getVehicle,

		_showIframe,
		_hideIframe,
		_startObservingIframe,
		_stopObservingIframe,
		_scrollToTop,
		
		_init;
		
	config = function(){
		
		self.myList;
		self.filterList;// = JSLINQ(self.myList.Data);
		self.whereList;// = self.filterList;
		self.stepCC = 0;
		self.nrTotStep;
		self.selectList = "";
		self.arAttrs = new Array(); //Array keys json
		self.arResults = new Array();
		self.listSrc = new Array();
		self.ccVers;
		self.myVehicle;
		self.myVehicleExternal;
		self.pathImage = "";
		self.pathImageVehicle;
		self.MoreInfoHtml = '';
		self.posVE = 0;
		self.ForcedDescription = '';
		self.imgDefault = IVECO.local ? "../../StyleLibrary/images/ajax-loader.gif" : "/common/PublishingImages/ajax-loader.gif";
		
		self.ccType;
		self.page = $('.js-configuratorPage');
		self.stepNav = $('.js-configurator__step_nav');
		self.stepContent = $('.js-configurator__step');
		self.stepOne = $('.configurator__step--1');
		self.typologyLink = $('.typology__link');
		self.form = $('.configurator-form');
		self.selectWrap = $('.configurator-select');
		self.select;
		self.findVehicleBtn = self.form.find('.configurator-find-veichle');
		self.ccTitle = $('.cc-title');
		self.ccIntro = $('.cc-intro');
		self.backToTypologyBtn = $('.configurator__prev-step--typology > a');
		self.backToModelBtn = $('.configurator__prev-step--model > a');
		self.printBtn =  $('.configurator__print > a');
		self.infoForm = $(".form-information-request__step--form");
		self.suggestionsList = $('.configurator__suggestions');
		self.summaryRecap = $('.cc-summary-recap');
		self.imgWrap = $('.configurator-image');
		self.img = self.imgWrap.find('img');
		self.imgResult = $('.cc-imgResult > img');
		self.btnDownlad = $('.configurator__attachment a');

		// Iframe
		self.iframeStep = self.page.find(".configurator-iframe-step");
		self.iframeParent = self.page.find(".configurator-iframe-parent");

	};
	
	_checkType = function(){
		
		self.ccType = $('.configuratorPage--stock-availability').length ? 'cc-availability' : 'cc-main';
		
	};
	
	_initHome = function(){
		
		/* gestione click submit */
		self.findVehicleBtn.on('click', function() {
			
			if ($(this).is('.disabled')) {
				
				return false;
				
			}
			else {
				
				switch (self.ccType) {
					
					case 'cc-main':
						if (typeof window.ga == 'undefined'){
							var ga = function(a){return true;}
							ga("send", "pageview", marketName + "/pages/configuratorpage/" + self.myVehicle + "/show");
						} else {
							window.ga("send", "pageview", marketName + "/pages/configuratorpage/" + self.myVehicle + "/show");
						}
					break;
					case 'cc-availability':
						if (typeof window.ga == 'undefined'){ 
							var ga = function(a){return true;} 
							ga("send", "pageview", marketName + "/pages/prontaconsegna/" + self.myVehicle + "/show");
						} else { 
							window.ga("send", "pageview", marketName + "/pages/prontaconsegna/" + self.myVehicle + "/show");
						}
					break;
					
				}
				
				_goToStep(2);
				
				return false;
				
			}
			
		});
		
		self.btnDownlad.on('click', function(){
			
			var f_name = this.href.substring(this.href.lastIndexOf('/')+1);
			
			if(self.ccType == 'cc-main'){
				if (typeof window.ga == 'undefined'){ 
					var ga = function(a){return true;} 
					ga('send', 'event', marketName + '-config-' + self.myVehicle, 'download' + '/' + f_name);
				} else {
					window.ga('send', 'event', marketName + '-config-' + self.myVehicle, 'download' + '/' + f_name);
				}
			}else{
				if (typeof window.ga == 'undefined'){ 
					var ga = function(a){return true;} 
					ga('send', 'event', marketName + '-pconsegna-' + self.myVehicle, 'download' + '/' + f_name);
				} else {
					window.ga('send', 'event', marketName + '-pconsegna-' + self.myVehicle, 'download' + '/' + f_name);
				}
			}
			
			return true;
			
		});
		
		self.backToTypologyBtn.on('click', function() {
			
			_resetApp();
			
			_goToStep(0);
			
			return false;
		});
		
		self.backToModelBtn.on('click', function() {
			
			_goToStep(1);
			
			return false;
		});
		
		self.typologyLink.on('click', function() {
			self.myVehicle = $(this).attr("data-name");
			self.myVehicleExternal = $(this).attr("data-url");
			
			if(self.myVehicle == "daily"){
				
				$('.download-furgone.daily').show();
				
				$('.download-cabinato.daily').show();
				
				$('.brochure-download.trakker').hide();
				
				$('.brochure-download.eurocargo').hide();
				
				$('.brochure-download.stralis').hide();
				
			}else if(self.myVehicle == "stralis"){
				
				$('.download-furgone.daily').hide();
				
				$('.download-cabinato.daily').hide();
				
				$('.brochure-download.trakker').hide();
				
				$('.brochure-download.eurocargo').hide();
				
				$('.brochure-download.stralis').show();
				
			}else if(self.myVehicle == "eurocargo"){
				
				$('.download-furgone.daily').hide();
				
				$('.download-cabinato.daily').hide();
				
				$('.brochure-download.trakker').hide();
				
				$('.brochure-download.eurocargo').show();
				
				$('.brochure-download.stralis').hide();
				
			}else if(self.myVehicle == "trakker"){
				
				$('.download-furgone.daily').hide();
				
				$('.download-cabinato.daily').hide();
				
				$('.brochure-download.trakker').show();
				
				$('.brochure-download.eurocargo').hide();
				
				$('.brochure-download.stralis').hide();
				
			}
			
			switch (self.ccType) {
				
				case 'cc-main':
					if (typeof window.ga == 'undefined'){ 
						var ga = function(a){return true;} 
						ga("send", "pageview", marketName + "/pages/configuratorpage/" + self.myVehicle + "/config");
					} else {
						window.ga("send", "pageview", marketName + "/pages/configuratorpage/" + self.myVehicle + "/config");
					}
				break;
				case 'cc-availability':
					if (typeof window.ga == 'undefined') {
						var ga = function(a){return true;} 
						ga("send", "pageview", marketName + "/pages/prontaconsegna/" + self.myVehicle + "/config");
					} else {
						window.ga("send", "pageview", marketName + "/pages/prontaconsegna/" + self.myVehicle + "/config");
					}
				break;
				
			}

			if (self.myVehicleExternal) {
				_showIframe();
				return false;
			}
			
			//ga("send", "pageview", marketName + "/pages/configuratorpage/" + self.myVehicle + "/config");
			
			_callJSON(self.myVehicle);
			
			_goToStep(1);
			
			return false;
		});
		
		self.printBtn.on('click', function(){
			
			if(self.ccType == 'cc-main'){
				if (typeof window.ga == 'undefined') {
					var ga = function(a){return true;} 
					ga('send','event', marketName + '-config-' + self.myVehicle, 'print');
				} else {
					window.ga('send','event', marketName + '-config-' + self.myVehicle, 'print');
				}
			}else{
				if (typeof window.ga == 'undefined') {
					var ga = function(a){return true;} 
					ga('send','event', marketName + '-pconsegna-' + self.myVehicle, 'print');
				} else {
					window.ga('send','event', marketName + '-pconsegna-' + self.myVehicle, 'print');
				}
			}
			
			window.print();
			
			return false;
			
		});
		
		var temp = _querystringCheck('Vehicle');
		
		if(temp != null && temp[0] != undefined){
			
			self.stepOne.find(".area." + temp[0].toLowerCase()).click();
			
		}
		
		self.MoreInfoHtml = self.infoForm.html();
		
	};
	
	_setImagePath = function(){
		
		if(IVECO.local){
			
			self.pathImage = '../../StyleLibrary/images/configurator/';
			
		}else{
			
//			var myM = (window.location.pathname.split('/')[1]).toLowerCase();
			var myM = marketName;
			
			switch(myM){
				case "italy":
					self.ForcedDescription = 'Configura il modello secondo le tue esigenze specifiche.   Clicca sul pulsante “PRONTA CONSEGNA”  e scopri se é immediatamente disponibile';
					self.pathImage = "/common/publishingimages/ccmajornew";
					break;
				case "france":
					self.ForcedDescription = 'Configurer le module selon vos exigences specifiques. Cliquez sur le bouton “Prêt-à-partir” et decouvrez si elle est immediatement disponible';
					self.pathImage = "/common/publishingimages/ccmajornew";
					break;
				case "spain":
					self.ForcedDescription = 'Configure el modelo según sus exigencias especificas. Haga clic en la tecla “LISTO PARA ENTREGARÃ” y descubra si ya esta disponible';
					self.pathImage = "/common/publishingimages/ccmajornew";
					break;
				case "germany":
					self.pathImage = "/common/publishingimages/ccmajornew";
					break;
				case "uk":
					self.ForcedDescription = 'Configure the model according to your specific needs. Click on the “Stock Availabilty” button to find out if it is available immediately';
					self.pathImage = "/common/publishingimages/ccmajornew";
					break;
				case "poland":
					self.ForcedDescription = 'Skonfiguruj model zgodnie ze swoimi wymaganiami. Kliknij przycisk “DO NATYCHMIASTOWEGO ODBIORU“ i sprawdzić, czy jest dostępna od ręki';
					self.pathImage = "/common/publishingimages/ccmajornew";
					break;
				case "belgium-nl":
					self.pathImage = "/common/publishingimages/ccmajornew";
					break;
				case "belgium-fr":
					self.pathImage = "/common/publishingimages/ccmajornew";
					break;
				case "bulgaria":
					self.pathImage = "/common/publishingimages/ccmajornew";
					break;
				case "croatia":
					self.pathImage = "/common/publishingimages/ccmajornew";
					break;
				case "netherlands":
					self.pathImage = "/common/publishingimages/ccmajornew";
					break;
				case "portugal":
					self.pathImage = "/common/publishingimages/ccmajornew";
					break;
				case "romania":
					self.pathImage = "/common/publishingimages/ccmajornew";
					break;
				case "turkey":
					self.pathImage = "/common/publishingimages/ccmajornew";
					break;
				default:
					self.ForcedDescription = '';
					self.pathImage = "/common/publishingimages/cc";
					break;
			}
			
		}
		
	};
	
	_goToStep = function(step){
		
		if(step === 0) {
			
			self.page.removeClass('configuratorPage--no-background');
			
			self.img.attr('src', self.imgDefault);
			
		}else {
			
			self.page.addClass('configuratorPage--no-background');
			
		}
		
		$('.js-configurator__step_nav').eq(step).addClass('active').siblings('.active').removeClass('active');
		
		$('.js-configurator__step').eq(step).addClass('active').siblings('.active').removeClass('active');
		
	};
	
	_callJSON = function(param){
		
		var myJson = IVECO.local ? '../../StyleLibrary/miscellaneous/daily_Json.js' : '../Configurators/ConfiguratorLibrary/' + param + '_Json.js';
		
		$.getJSON(myJson, function(data){
			
			self.myList = data;
			
			self.filterList = JSLINQ(data.Data);
			
			self.whereList = self.filterList;
			
			var i = 0,
				attr;
			
			for(attr in self.filterList.items[0]){
				
				if(attr=="VE"){
					
					self.posVE = i;
					
				}
				
				self.arAttrs.push(attr);
				
				i++;
			}
			
			if(param.toLowerCase() == "stralis"){
				
				self.posVE = 0;
				
				self.ccVers = self.whereList.items[0].CT;
				
			}else{
				
				self.ccVers = self.whereList.items[0].VE;
				
			}
			
			_initTitle();
			
			_initSelects();
			
			self.pathImageVehicle = self.pathImage+"/"+self.myVehicle+"/";
			
			self.listSrc[0] = self.pathImageVehicle+_getLabel( self.ccVers, "description" );
			
			_loadImages();
			
		});
	};
	
	_initTitle = function(){
		
		self.ccTitle.html( _getLabel("TOP_TITLE", "label") );
		
		if(self.ccType == 'cc-availability' && self.ForcedDescription != null){
			
			self.ccIntro.html(self.ForcedDescription);
			
		}else{
			
			self.ccIntro.html( _getLabel("TOP_TITLE", "description") );
			
		}
		
	};
	
	_initSelects = function(){
		
		var myAttr;
		
		if(jQuery.inArray( "LDP", self.arAttrs) == -1){
			
			self.nrTotStep = self.arAttrs.length-1;
			
		}else{
			
			self.nrTotStep = self.arAttrs.length-4;
			
		}
		
		for(var i = 0; i < self.nrTotStep; i++){
			
			myAttr = self.arAttrs[i];
			
			self.selectList +=	"<div class='form-group disabled'>"+
									"<label>"+_getLabel(myAttr, "label")+"</label>";
			
			self.selectList +=		"<div class='input-wrap'>";
			
			self.selectList +=			"<div class='input-group'>"+
											"<select class='form-control' name='"+myAttr+"' class='default' disabled>"+
												"<option>"+_getLabel("SELEZIONA","label")+"</option>"+
											"</select>"+
										"</div>";
										
			
			if(_getLabel(myAttr,"description") != ''){
				
				self.selectList +=		"<div class='input-group-addon'>"+
											"<a data-trigger='hover' type='button' class='btn-link' data-container='body' data-toggle='popover' data-placement='left' data-html='true' data-title='"+_getLabel(myAttr, "label")+"' data-content='"+_getLabel(myAttr, "description")+"'>"+
												"<span style='font-size:16px;' class='glyphicon glyphicon-info-sign'></span>"+
											"</a>"+
										"</div>";
			}else{
				self.selectList +=		"<div class='input-group-addon'></div>";
			}
			
			self.selectList +=		"</div>";
			
			self.selectList +=	"</div>";
			
		}
		
		self.selectWrap.html(self.selectList);
		
		self.select = self.selectWrap.find('select');
		
		self.select.on('change', function(){
			
			switch (self.ccType) {
				
				case 'cc-main':
					if (typeof window.ga == 'undefined') {
						var ga = function(a){return true;} 
						ga("send", "pageview", marketName + "/pages/configuratorpage/" + self.myVehicle + "/" + _getPosition(this) + "-" + $(".select-form label:eq(" + _getPosition(this) +")" ).text());
					} else {
						window.ga("send", "pageview", marketName + "/pages/configuratorpage/" + self.myVehicle + "/" + _getPosition(this) + "-" + $(".select-form label:eq(" + _getPosition(this) +")" ).text());
					}
					
					if (typeof window.ga == 'undefined') {
						var ga = function(a){return true;} 
						ga("send", "event", marketName + "-config-" + self.myVehicle, $(".select-form label:eq(" + _getPosition(this) + ")").text(), $(this).find("option:selected").text());
					} else {
						window.ga("send", "event", marketName + "-config-" + self.myVehicle, $(".select-form label:eq(" + _getPosition(this) + ")").text(), $(this).find("option:selected").text());
					}
				break;
				case 'cc-availability':
					if (typeof window.ga == 'undefined') {
						var ga = function(a){return true;} 
						ga("send", "pageview", marketName + "/pages/prontaconsegna/" + self.myVehicle + "/" + _getPosition(this) + "-" + $(".select-form label:eq(" + _getPosition(this) +")" ).text());
					} else {
						window.ga("send", "pageview", marketName + "/pages/prontaconsegna/" + self.myVehicle + "/" + _getPosition(this) + "-" + $(".select-form label:eq(" + _getPosition(this) +")" ).text());
					}
					
					if (typeof window.ga == 'undefined') {
						var ga = function(a){return true;} 
						ga("send", "event", marketName + "-stock-" + self.myVehicle, $(".select-form label:eq(" + _getPosition(this) + ")").text(), $(this).find("option:selected").text());
					} else {
						window.ga("send", "event", marketName + "-stock-" + self.myVehicle, $(".select-form label:eq(" + _getPosition(this) + ")").text(), $(this).find("option:selected").text());
					}
				break;
				
			}
			
			//ga("send", "pageview", marketName + "/pages/configuratorpage/" + self.myVehicle + "/" + _getPosition(this) + "-" + $(".select-form label:eq(" + _getPosition(this) +")" ).text());
			
			//ga("send", "event", marketName + "-config-" + self.myVehicle, $(".select-form label:eq(" + _getPosition(this) + ")").text(), $(this).find("option:selected").text());
			
			if($(this).children("option").eq(0).val() == _getLabel("SELEZIONA","label")){
				
				$(this).children("option").eq(0).attr("disabled","disabled");
				
			}
			
			_checkStep(_getPosition(this), this);
			
		});
		
		_updateSelect(0);
		
		$('[data-toggle="popover"]').popover({ trigger: 'hover' });
		
	};
	
	_resetApp = function(){
		
		self.myList = "";
		self.filterList = "";
		self.whereList = "";
		self.stepCC = 0;
		self.nrTotStep = 0;
		self.selectList = "";
		self.arAttrs = new Array();
		self.arResults = new Array();
		self.selectWrap.empty();
		self.findVehicleBtn.addClass("disabled");

		_hideIframe();

		_scrollToTop();

	};
	
	_resetSelect = function(from){
		
		var selectLen = self.select.length;
		
		for ( var i = from; i < selectLen; i++ ) {
			
			self.select.eq(i).empty().attr("disabled", "disabled").closest('.form-group').addClass("disabled");
			
			self.select.eq(i).append("<option>"+_getLabel("SELEZIONA","label")+"</option>");
			
		}
		
		if(from < self.nrTotStep){
			
			self.findVehicleBtn.addClass("disabled");
			
		}
		
		_newWhere(from);
		
	};
	
	_changeSelect = function(select){
		
		if($(select).children("option").eq(0).val() == _getLabel("SELEZIONA","label")){
			
			$(select).children("option").eq(0).attr("disabled","disabled");
			
		}
		
		var myAttr = self.arAttrs[self.stepCC];
		
		self.stepCC++;
		
		self.whereList = self.whereList.
		Where(function(item){ return item[myAttr] == $(select).val(); });
		
		_updateSelect(self.stepCC);
		
	};
	
	_getPosition = function(select){
		
		var myIndex;
		
		self.select.each(function(index, value){
			
			if($(value).is($(select))){
				
				myIndex = index;
				
			}
		});
		
		return myIndex;
	};
	
	_updateSelect = function(myStep){
		
		var selectList = "";
		
		var arTempSelect = new Array();
		
		arTempSelect = _getUniqueElement(self.arAttrs[myStep], self.whereList);
		
		for (var i = 0; i < arTempSelect.length; i++) {
			
			selectList += '<option value="' + arTempSelect[i] + '">' + _getLabel(arTempSelect[i],'label') + '</option>';
			
		}
		
		if(arTempSelect[0] != "null"){
			
			var mySelect = self.arAttrs[myStep];
			
			$('select[name="'+mySelect+'"]').removeAttr("disabled").closest('.form-group').removeClass("disabled");
			
			$('select[name="'+mySelect+'"]').append(selectList);
			
		}else{
			
			_checkStep(_getPosition($('select[name="'+self.arAttrs[myStep]+'"]')), self.arAttrs[myStep]);
		}
		
		if(arTempSelect.length == 1){
			
			$('select[name="'+self.arAttrs[myStep]+'"]').attr("disabled", "disabled");
			
			$('select[name="'+self.arAttrs[myStep]+'"] option').eq(1).attr("selected", "selected");
			
			$('select[name="'+self.arAttrs[myStep]+'"] option').eq(1).trigger('change');
			
		}
		
	};
	
	_getResults = function(){
		
		var myAttr = self.arAttrs[self.stepCC];
		
		var htmlSpan = "";
		
		self.arResults =  _getUniqueElement(self.arAttrs[self.nrTotStep], self.whereList);
		
		for(var i=0; i < self.arResults.length; i++){
			
			htmlSpan +=	"<div class='col-xs-12 col-sm-6 configurator__suggestion'>"+
							"<span class='configurator__suggestion__code'><strong>"+self.arResults[i]+"</strong></span>"+
						"</div>";
		}
		
		self.suggestionsList.html(htmlSpan);
		
		/* BOX SCELTE*/
		self.summaryRecap.empty();
		
		
		var myAttrName;
		
		var myAttrVal;
		
		var htmlBox = "";
		
		for(var i = 0; i < self.nrTotStep; i++){
			
			myAttrName = self.select.eq(i).attr("name");
			
			myAttrVal = self.select.eq(i).val();
			
			if(myAttrVal != _getLabel("SELEZIONA","label")){
				
				htmlBox +=	"<div class='row'>"+
								"<div class='col-xs-6'>"+
									"<strong>"+_getLabel(myAttrName,"label")+"</strong>"+
								"</div>"+
								"<div class='col-xs-6'>"+myAttrVal+"</div>"+
							"</div>";
			}
			
		}
		
		self.summaryRecap.html(htmlBox);
		
		self.imgResult.attr('src',self.pathImageVehicle+_getLabel(self.ccVers,"description"));
		
	};
	
	_newWhere = function(from){
		
		var newList = self.filterList;
		
		var myAttr;
		
		for(var i = 0; i < from; i++){
			
			if(self.select.eq(i).val() != _getLabel("SELEZIONA","label")){
				
				myAttr = self.select.eq(i).attr("name");
				
				newList = newList.
				Where(function(item){ return item[myAttr] == self.select.eq(i).val(); });
				
			}
			
		}
		
		self.whereList = newList;
		
	};
	
	_checkStep = function(posSelect,mySelect){
		
		if(posSelect < self.nrTotStep-1){
			
			_resetSelect(posSelect+1);
			
			self.stepCC = posSelect+1;
			
			_updateSelect(posSelect+1);
			
		}else{
			
			if(posSelect == self.nrTotStep-1){
				
				self.stepCC = posSelect;
				
				posSelect = self.nrTotStep-1;
				
				self.findVehicleBtn.removeClass('disabled');
				
				self.findVehicleBtn.on("click",function(){
					
					_getResults();
					
				});
			}
			
			_changeSelect(mySelect);
		}
		
		if(posSelect == self.posVE){
			
			if(self.ccVers != self.select.eq(self.posVE).val()){
				
				self.ccVers = self.select.eq(self.posVE).val();
				
				self.listSrc[0] = self.pathImageVehicle+_getLabel(self.ccVers,"description");
				
				_loadImages();
				
			}
		}
		
	};
	
	_loadImages = function(){
		
		// attaching images preload event to the to-be-inserted slide
		self.imgWrap.on('allImagesLoaded', function(e){
			
			self.img.attr("src", e.sources[0]);
			
			self.img.attr("title", _getLabel(self.ccVers,"label"));
			
			self.img.attr("alt", _getLabel(self.ccVers,"label"));
			
		});
		
		imgPreloader(self.listSrc, self.imgWrap, self.imgWrap, true);
		
	};
	
	_getLabel = function(nameLabel, what){
		
		var myLabel = nameLabel;
		
		try{
			myLabel = self.myList.Text[0][nameLabel][what];
		}
		
		catch(err){	}
		
		return myLabel;
		
	};
	
	_getUniqueElement = function(element, jsonList){
		
		var arTemp = new Array();
		
		var jsonListCount = jsonList.Count();
		
		for (var i = 0; i < jsonListCount; i++) {
			
			arTemp.push(jsonList.items[i][element]);
			
		}
		
		arTemp = _unique(arTemp);
		
		return arTemp;
		
	};
	
	_enableSelect = function(mySelect){
		
		$('select[name="'+mySelect+'"]').removeAttr('disabled');
		
	};
	
	_unique = function(origArr){
		
		var newArr = [],
		origLen = origArr.length,
		found,
		x, y;
		
		for ( x = 0; x < origLen; x++ ) {
			
			found = undefined;
			
			for ( y = 0; y < newArr.length; y++ ) {
				
				if ( origArr[x] === newArr[y] ) {
					
					found = true;
					
					break;
					
				}
				
			}
			
			if ( !found){
				
				newArr.push( origArr[x] );
				
			}
		}
		
		return newArr;
		
	};
	
	_querystringCheck = function(key){
		
		var re = new RegExp('(?:\\?|&)' + key + '=(.*?)(?=&|$)', 'gi');
		
		var r = [], m;
		
		while ((m = re.exec(document.location.search)) != null) r.push(m[1]);
		
		return r;
		
	};
	
	_getWhereList = function(){
		
		return self.whereList;
		
	};
	
	_getArAttrs = function(){
		return self.arAttrs;
	};
	
	_getVehicle = function(){
		return self.myVehicle;
	};
	
	_init = function(){
		
		config();
		
		_checkType();
		
		_initHome();
		
		_setImagePath();
		
	};

	_showIframe = function() {
		var iframeSrc;
		iframeSrc = self.myVehicleExternal;

		self.iframe = $("<iframe class=\"configurator-iframe-el\" />");
		self.iframe.attr("src", iframeSrc);
		// The child page included via iframe needs to run Adobe Reader plugin to open pdf documents,
		// so we need to remove the "sandbox" attribute, which blocks the execution of every plugin,
		// and there is no flag to turn the execution on.
		// self.iframe.attr("sandbox", ["allow-forms", "allow-same-origin", "allow-scripts", "allow-popups", "allow-popups-to-escape-sandbox"].join(" "));
		self.iframeParent.append(self.iframe);

		_startObservingIframe(self.iframe);

		self.page.addClass("is-iframe-shown");

		self.iframeStep.show();
		self.iframeParent.show();
	};

	_hideIframe = function() {
		self.page.removeClass("is-iframe-shown");

		self.iframeStep.hide();
		self.iframeParent.hide();

		if (self.iframe) {
			_stopObservingIframe(self.iframe);
			self.iframe.remove();
			self.iframe = null;
		}
	};

	_startObservingIframe = function($iframe) {
		if (window.iFrameResize) {
			// For docs see: https://github.com/davidjbradshaw/iframe-resizer
			window.iFrameResize({
				log: (IVECO.Utils.getUrlParam("iFrameResizerLog") === "1"),
				autoResize: false,
				enablePublicMethods: true,
				heightCalculationMethod: "lowestElement",
				minHeight: 400,
				checkOrigin: false
			}, $iframe[0]);
		}

		$.fancybox.showLoading();

		$iframe.one("load", function() {
			$.fancybox.hideLoading();
		});
	};

	_stopObservingIframe = function($iframe) {
		if ($iframe[0].iFrameResizer) {
			// Note: iFrameResizer will remove the iframe node from the dom as well.
			$iframe[0].iFrameResizer.close();
		}
	};

	_scrollToTop = function() {
		$("html, body").animate({
			scrollTop: self.page.offset().top
		});
	};
	
	return {
		
		initialize: _init,
		getWhereList: _getWhereList,
		getArAttrs: _getArAttrs,
		getVehicle: _getVehicle
		
	};
	
}());

/*------------------------------------*\
	$VEHICLE-CONFIGURATOR 
	Mission
\*------------------------------------*/

IVECO.missionConfigurator = (function(){
	
	"use strict";
	
	var self = {},
		config,
		
		_start,
		_resetStep,
		_resetAllVars,
		_callJSON,
		_initStep,
		_updateBoxes,
		_changeStep,
		_resetBoxes,
		_setResult,
		_updateContent,
		_getLabel,
		_getUniqueElement,
		_unique,
		_querystringCheck,
		_getArScelte,
		_getStepMission,
		_getVehicle,
		
		_goToStep,
		
		_init;
	
	config = function(){
		
		self.myList;
		self.filterList;// = JSLINQ(self.myList.Data);
		self.whereList;// = self.filterList;
		self.stepMission = 0;
		self.MAXSTEP;
		self.MAXSTEP_ini;
		self.arAttrs = new Array(); //Array keys json
		self.arResults = new Array();
		self.arScelte = new Array();
		self.myVehicle;
		self.noChange = false;
		self.BoxSuccess;
		self.BoxError;
		self.imgDefault = IVECO.local ? "../../StyleLibrary/images/ajax-loader.gif" : "/common/PublishingImages/ajax-loader.gif";
		self.value;
		
		self.page = $('.js-missionConfiguratorPage');
		self.typologyLink = $('.typology__link');
		self.stepNav = $('.js-configurator__step_nav');
		self.stepNavAlias = $('.steps__nav__alias');
		self.stepContent = $('.js-configurator__step');
		self.stepOne = $('.configurator__step--1');
		self.ccNav = $('.js-configurator__nav');
		self.ccTitle = $('.js-configurator__typology');
		self.backToTypologyBtn = $('.configurator__prev-step--typology > a');
		self.restartConfigBtn = $('.configurator__prev-step--restart-config > a');
		self.printBtn =  $('.configurator__print > a');
		self.summaryRecap = $('.cc-summary-recap');
		self.imgResult = $('.cc-imgResult > img');
		self.squareContainer = $('.square__container');
		self.imgResult = $('.cc-imgResult > img');
		self.square;
		self.finalStep = $('.step configurator__step--5');//todo remove
		self.questionWrap = $('.question-wrap');
		self.btnDownlad = $('.configurator__attachment a');
		
		self.imgSrc = IVECO.local ? "../../StyleLibrary/images/missionnew/" : "/common/publishingimages/missionnew/";
		
	};
	
	_start = function(){
		
		self.typologyLink.on('click', function() {
			
			_goToStep(1);
			
			self.myVehicle = $(this).attr("data-name");
			
			if(self.myVehicle == "daily"){
				
				$('.download-furgone.daily').show();
				
				$('.download-cabinato.daily').show();
				
				$('.brochure-download.trakker').hide();
				
				$('.brochure-download.eurocargo').hide();
				
				$('.brochure-download.stralis').hide();
				
			}else if(self.myVehicle == "stralis"){
				
				$('.download-furgone.daily').hide();
				
				$('.download-cabinato.daily').hide();
				
				$('.brochure-download.trakker').hide();
				
				$('.brochure-download.eurocargo').hide();
				
				$('.brochure-download.stralis').show();
				
			}else if(self.myVehicle == "eurocargo"){
				
				$('.download-furgone.daily').hide();
				
				$('.download-cabinato.daily').hide();
				
				$('.brochure-download.trakker').hide();
				
				$('.brochure-download.eurocargo').show();
				
				$('.brochure-download.stralis').hide();
				
			}else if(self.myVehicle == "trakker"){
				
				$('.download-furgone.daily').hide();
				
				$('.download-cabinato.daily').hide();
				
				$('.brochure-download.trakker').show();
				
				$('.brochure-download.eurocargo').hide();
				
				$('.brochure-download.stralis').hide();
				
			}
			
			if (typeof window.ga == 'undefined') {
				var ga = function(a){return true;} 
				ga("send","pageview", marketName + "/pages/missionconfigurator/" + self.myVehicle + "/config");
			} else {
				window.ga("send","pageview", marketName + "/pages/missionconfigurator/" + self.myVehicle + "/config");
			}
			
			self.ccTitle.text(self.myVehicle.toUpperCase());
			
			//$('.select-step').fadeOut('slow', function() {
				_callJSON(self.myVehicle);
			//});
			
			return false;
			
		});
		
		self.printBtn.on('click', function(){
			
			if (typeof window.ga == 'undefined') {
				var ga = function(a){return true;} 
				ga('send','event', marketName + '-mission-' + self.myVehicle, 'print');
			} else {
				window.ga('send','event', marketName + '-mission-' + self.myVehicle, 'print');
			}
			
			window.print();
			
			return false;
			
		});
		
		self.restartConfigBtn.on('click', function(){
			
			self.MAXSTEP = self.MAXSTEP_ini;
			
			_resetAllVars();
			
			_resetStep();
			
			_goToStep(1);
			
			self.stepNav.removeClass('active').eq(0).addClass('active');
			
			self.stepNavAlias.empty();
			
			self.whereList = self.filterList;
			
			_initStep();
			
			self.squareContainer.css("display", "block");
			
			return false;
			
		});
		
		self.btnDownlad.on('click', function(){
			
			var f_name = this.href.substring(this.href.lastIndexOf('/')+1);
			
			if (typeof window.ga == 'undefined') {
				var ga = function(a){return true;} 
				ga('send', 'event', marketName + '-mission-' + self.myVehicle, 'download' + '/' + f_name);
			} else {
				window.ga('send', 'event', marketName + '-mission-' + self.myVehicle, 'download' + '/' + f_name);
			}
			
			return true;
			
		});
		
		self.backToTypologyBtn.on('click', function() {
			
			_goToStep(0);
			
			self.myVehicle = "";
			
			self.arAttrs = new Array();
			
			_resetAllVars();
			
			self.stepNavAlias.empty();
			
			self.stepNav.removeClass('active').eq(0).addClass('active');
			
			_resetStep();
			
			return false;
			
		});
		
		var temp = _querystringCheck('Vehicle');
		
		if(temp != null && temp[0] != undefined){
			
			self.stepOne.find(".area." + temp[0].toLowerCase()).click();
			
		}
		
	};
	
	_resetStep = function(){
		
		$('.vehicle').removeClass().addClass('question').html("").appendTo(self.questionWrap);
		
		self.imgResult.attr('src', self.imgDefault);
		
		self.summaryRecap.empty();
		
		self.finalStep.css("display", "none");
		
	};
	
	_resetAllVars = function(){
		
		self.stepMission = 0;
		
		self.arScelte = new Array();
		
		self.arResults = new Array();
		
		self.noChange = false;
		
	};
	
	_callJSON = function(param){
		
		var myJson = IVECO.local ? '../../StyleLibrary/miscellaneous/mission_daily.js' : '../StyleLibrary/Iveco/js/Mission/mission_'+param+'.js';
		
		$.getJSON(myJson, function(data) {
				
				self.myList = data;
				
				self.MAXSTEP_ini = self.MAXSTEP = self.myList.Vars[0]['MAXSTEP']['value'];
				
				self.filterList = JSLINQ(data.Data);
				
				self.whereList = self.filterList;
				
				var attr;
				
				for(attr in self.filterList.items[0]){
					
					self.arAttrs.push(attr);
					
				}
				
				_initStep();
				
				/* $('.step-container').fadeIn('slow', function() {
					$('.boxes').css("display", "block");
				}); */
				
				_goToStep(1);
				
				self.squareContainer.css("display", "block");
				
			}
		);
		
	};
	
	_initStep = function(){
		
		var myI = 0;
		
		for(var i = 0; i < self.MAXSTEP; i++){
			
			if(self.MAXSTEP == 5){
				
				if(i == self.MAXSTEP-2){
					
					i=self.MAXSTEP-1;
					
				}
			}
			
			self.stepNav.eq(myI).find('.cc-label').text( _getLabel(self.arAttrs[i], 'label') );
			
			myI++;
		}
		
		_updateBoxes(0);
		
	};
	
	_updateBoxes = function(myStep){
		
		var htmlBox = "";
		
		var arTempSelect = new Array();
		
		var nrBoxes = $('.square').length;
		
		if(nrBoxes > 0){
			_resetBoxes();
		}
		
		arTempSelect = _getUniqueElement(self.arAttrs[myStep], self.whereList);
		
		if(arTempSelect[0] == "null"){
			
			if(self.myVehicle == "stralis" && myStep==3){
				
				self.stepMission = 2;
				
				self.MAXSTEP = 4;
				
				self.noChange = true;
				
				_changeStep();
				
			}else{
				
				self.arScelte.push("null");
				
				self.stepMission++;
				
				$('.question').text( _getLabel(self.arAttrs[self.stepMission], 'description') );
				
				self.stepNav.eq(2).find('.cc-label').text( _getLabel(self.arAttrs[self.stepMission], 'label') );
				
				_updateBoxes(self.stepMission);
				
			}
			
		}else{
			
			var arTempIcon;// = new Array();
			
			var iIcon;
			
			if(self.myVehicle == "stralis" && myStep==3){
				
				iIcon = 2;
				
			}else{
				
				iIcon = myStep;
				
			}
			
			$('.question').text( _getLabel(self.arAttrs[myStep], 'description') );
			
			for (var i = 0; i < arTempSelect.length; i++) {
				
                arTempIcon = self.whereList.Where(function(item) {
                    return item[self.arAttrs[self.stepMission]] == arTempSelect[i];
                }).Select(function(item) {
                    return item["icon_" + iIcon];
                });
				
				htmlBox +=	'<div class="square js-tab__link" data-label="'+arTempSelect[i]+'" data-value="'+arTempSelect[i]+'">'+
								'<div class="square__content">'+
									'<img class="square__image" src="'+self.imgSrc+"icons/"+arTempIcon.items[0]+'">'+
									'<span class="square__label">'+arTempSelect[i]+'</span>'+
								'</div>'+
							'</div>';
				
			}
			
			self.squareContainer.html(htmlBox);
			
			self.square = $('.square');
			
			self.square.on('click', function() {
				
				self.arScelte.push($(this).attr('data-value'));
				
				if (typeof window.ga == 'undefined') {
					var ga = function(a){return true;} 
					ga("send","pageview", marketName + "/pages/missionconfigurator/" + self.myVehicle + "/" + self.stepMission + "-" + $('.question').text() + "-" + $(this).attr('data-value'));
				} else {
					window.ga("send","pageview", marketName + "/pages/missionconfigurator/" + self.myVehicle + "/" + self.stepMission + "-" + $('.question').text() + "-" + $(this).attr('data-value'));
				}
				
				if (typeof window.ga == 'undefined') {
					var ga = function(a){return true;} 
					ga("send","event", marketName + "-mission-" + self.myVehicle, $('.question').text(), $(this).attr('data-value'));
				} else {
					window.ga("send","event", marketName + "-mission-" + self.myVehicle, $('.question').text(), $(this).attr('data-value'));
				}
				
				_updateContent($(this));
				
			});
		}
		
	};
	
	_changeStep = function(){
		
		if(self.myVehicle == "trakker" && self.stepMission==2){
			
			self.stepNav.eq(self.stepMission).find('.steps__nav__alias').text(self.arScelte[self.stepMission]);
			
		}else if(self.myVehicle == "trakker" && self.stepMission==3){
			
			self.stepNav.eq(2).find('.steps__nav__alias').append('<br>'+self.arScelte[self.stepMission]);
			
			self.stepNav.filter('.active').next().addClass('active').siblings('.active').removeClass('active');
			
		}else{
			
			if(self.noChange == false){
				
				self.stepNav.filter('.active').next().addClass('active').siblings('.active').removeClass('active');
				
				self.stepNav.eq(self.stepMission).find('.steps__nav__alias').text(self.arScelte[self.stepMission]);
				
			}
			
		}
		
		var myAttr = self.arAttrs[self.stepMission];
		
		self.whereList = self.whereList.
		Where(function(item){ return item[myAttr] == self.arScelte[self.stepMission];  });
		
		self.stepMission++;
		
		if(self.stepMission == self.MAXSTEP-1){
			
			if (typeof window.ga == 'undefined') {
				var ga = function(a){return true;} 
				ga("send","pageview", marketName + "/pages/missionconfigurator/" + self.myVehicle + "/show");
			} else {
				window.ga("send","pageview", marketName + "/pages/missionconfigurator/" + self.myVehicle + "/show");
			}
			
			_setResult();
			
		}else{
			
			_updateBoxes(self.stepMission);
			
			self.squareContainer.fadeIn();
			
		}    
		/* if(self.stepMission != 0) {
			
			$('#backConfig').css('visibility','visible');
			
		} */
		
	};
	
	_resetBoxes = function(){
		
		self.squareContainer.empty();
		
	};
	
	_setResult = function(){
		
		self.arScelte.push(self.whereList.items[0].quale);
		
		if(self.MAXSTEP == 5 && self.myVehicle == "stralis"){
			
			self.stepNav.eq(2).find('.steps__nav__alias').text(self.arScelte[3]);
			
		}
		
		var resultName = self.arScelte[self.stepMission];
		
		self.stepNav.eq(3).find('.steps__nav__alias').text(resultName);
		
		//$('.box-content h2').text(resultName);
		
		var txtResult =	"<h3 class='preview__footer__title'>"+_getLabel('quale', 'description')+"</h3>"+
						"<div class='configurator__suggestion'>"+
							"<span class='configurator__suggestion__code'><strong>" + resultName + "</strong></span>"+
						"</div>";
		
		if(_getLabel('cambio', 'description') != "") {
			
			txtResult += "<div class='configurator__suggestion__paragraph'>"+_getLabel('cambio', 'description')+" "+self.whereList.items[0].cambio_suggerito+"</div>";
			
		}
		
		$('.question').removeClass().addClass('vehicle').html(txtResult).appendTo('.configurator__suggestions'); 
		
		self.imgResult.css("visibility","hidden").hide().attr('src', self.imgSrc+'/vehicles/'+self.whereList.items[0].image).css("visibility","visible").fadeIn();
		
		var htmlBox = "";
		
		var a = 0;
		
		for(var i = 0; i < self.arScelte.length-1; i++){
			
			if(self.arScelte[i] != "null"){
				
				htmlBox +=	"<div class='row'>"+
								"<div class='col-xs-3'>"+
									"<img class='preview__body__image' src='"+self.imgSrc+"icons/"+self.whereList.items[0]['icon_'+a]+"'>"+
								"</div>"+
								"<div class='col-xs-9'>"+
									"<span class='preview__body__label'>"+self.arScelte[i]+"</span>"+
								"</div>"+
							"</div>";
				
				a++;
				
			}
			
		}
		
		self.summaryRecap.html(htmlBox);
		
		//self.squareContainer.css("display", "none");
		
		//self.finalStep.fadeIn();
		
		_goToStep(2);
		
	};
	
	_updateContent = function(b){
		
		self.squareContainer.fadeOut('slow', function() {
			
			_changeStep();
			
		});
		
	};
	
	_goToStep = function(step){
		
		if(step === 0) {
			
			self.ccNav.eq(0).addClass('active').siblings('.active').removeClass('active');
			
			self.page.removeClass('missionConfiguratorPage--no-background');
			
			self.ccTitle.addClass('hidden');
			
		}else {
			
			self.ccNav.eq(1).addClass('active').siblings('.active').removeClass('active');
			
			self.ccTitle.removeClass('hidden');
			
			self.page.addClass('missionConfiguratorPage--no-background');
			
		}
		
		if(step > 1) {
			
			var _label = $(this).attr('data-label');
			
			var _modelloPlaceholder = 'ASD123456'; //todo
			
			self.stepNav.eq(step-2).find('span').html(_label);
			
			/* if(step === 4) {
				
				self.stepNav.eq(3).find('span').html(_modelloPlaceholder);
				
			} */
		}
		
		//self.stepNav.eq(step-1).addClass('active').siblings('.active').removeClass('active');
		
		self.stepContent.eq(step).siblings('.active').removeClass('active');
		
		setTimeout(function() {
			self.stepContent.eq(step).addClass('active');
		},600);
		
		return false;
		
	};
	
	_getLabel = function(nameLabel, what){
		
		var myLabel = self.myList.Text[0][nameLabel][what];
		
		return myLabel;
		
	};
	
	_getUniqueElement = function(element, jsonList){
		
		var arTemp = new Array();
		
		var jsonListCount = jsonList.Count();
		
		for (var i = 0; i < jsonListCount; i++) {
			
			arTemp.push(jsonList.items[i][element]);
			
		}
		
		arTemp = _unique(arTemp);
		
		return arTemp;
		
	};
	
	_unique = function(origArr){
		
		var newArr = [],
			origLen = origArr.length,
			found,
			x, y;
		
		for ( x = 0; x < origLen; x++ ) {
			
			found = undefined;
			
			for ( y = 0; y < newArr.length; y++ ) {
				
				if ( origArr[x] === newArr[y] ) {
					
					found = true;
					
					break;
					
				}
				
			}
			
			if ( !found){
				
				newArr.push( origArr[x] );
				
			}
		}
		
		return newArr;
		
	};
	
	_querystringCheck = function(key){
		
		var re = new RegExp('(?:\\?|&)' + key + '=(.*?)(?=&|$)', 'gi');
		
		var r = [], m;
		
		while ((m = re.exec(document.location.search)) != null) r.push(m[1]);
		
		return r;
		
	};
	
	_getArScelte = function(){
		return self.arScelte;
	};
	
	_getStepMission = function(){
		return self.stepMission;
	};
	
	_getVehicle = function(){
		return self.myVehicle;
	};
	
	_init = function(){
		
		config();
		
		_start();
		
	};
	
	return {
		
		initialize: _init,
		getArScelte: _getArScelte,
		getStepMission: _getStepMission,
		getVehicle: _getVehicle
		
	};
	
}());

/*------------------------------------*\
	$BOOKING
\*------------------------------------*/

IVECO.booking = (function(){
	
	"use strict";
	
	var self = {},
		config,
		_handleCellClick,
		_handleTabClick,
		_setVisibleDay,
		_handlePagerClick,
		_handleAbortClick,
		_handleStep,
		_init;
	
	config = function(){
		
		self.isLanding = $('#layout-landing').length ? true : false;
		
		if(self.isLanding){
			self.layout = $('#layout-landing');
			self.internalMainWrap = $('.landing-contact-box');
		}else{
			self.layout = $('#layout');
			self.internalMainWrap = $('.internal-main-wrap');
		}
		
		self.bookingBox = $('.booking-box');
		self.backBtn = self.bookingBox.find('.landing-intro__back');
		
		
		self.wrap = $('.js-landing-book-wrapper');
		self.calendar = $('.js-landing-book-calendar');
		self.pager = $('.js-landing-book-calendar-pager');
		self.calendarItem = $('.js-landing-book-calendar-item');
		self.tab = $('.js-landing-book-calendar-tab');
		self.cell = $('.js-landing-book-calendar-cell');
		self.responseWrap = $('.js-landing-book-response');
		self.responseMessage = $('.js-landing-book-response-msg');
		self.abort = $('.js-landing-book-response-abort');
		self.confirm = $('.landing-book-response__confirm');
		
	};
	
	_handleStep = function(){
		
		var targetOffsetTop,
			scollTopNum;
		
		self.layout.addClass('booking-visible');
		
		targetOffsetTop = self.bookingBox.offset().top;
	
		scollTopNum = Modernizr.mq('(max-width: 991px)') ? (targetOffsetTop - 50) : targetOffsetTop;
		
		$('html,body').animate({
			scrollTop: scollTopNum
		}, 1000);
		
		self.backBtn.on('click', function(e){
			
			self.layout.removeClass('booking-visible');
			
			self.bookingBox.removeClass('booking-last-step');
			
			targetOffsetTop = self.internalMainWrap.offset().top;
		
			scollTopNum = Modernizr.mq('(max-width: 991px)') ? (targetOffsetTop - 50) : targetOffsetTop;
			
			$('html,body').animate({
				scrollTop: scollTopNum
			}, 1000);
			
			e.preventDefault();
			
		});
		
	};
	
	_handleCellClick = function(){
		
		self.cell.on('click', function(event){
			
			var $trigger = $(this),
				dateMessage = "",
				
				columnIndex = 0,
				rowIndex = 0,
				
				$columnTarget,
				$rowTarget;
			
			if(!$trigger.hasClass('disabled')){
				
				$trigger.toggleClass('booked');
				self.cell.not($trigger).removeClass('booked');
				
				columnIndex = $trigger.index();
				rowIndex = $trigger.parents('.js-landing-book-calendar-row').index();
				
				$columnTarget = $trigger.parents('.js-landing-book-calendar-item').find('.js-landing-book-calendar-tab').eq(columnIndex - 1);
				$rowTarget = $trigger.parents('.js-landing-book-calendar-item').find('.js-landing-book-calendar-row').eq(rowIndex);
				
				dateMessage += $columnTarget.data('item-day');
				dateMessage += ", ";
				dateMessage += $columnTarget.data('item-date');
				dateMessage += ", ";
				dateMessage += $rowTarget.data('target-hour');
				
				if(self.calendar.find('.booked').length){
					self.responseMessage.text(dateMessage);
					self.confirm.removeClass('disabled');
				} else {
					self.responseMessage.text(self.responseMessage.data('default-msg'));
					self.confirm.addClass('disabled');
				};
				
				self.wrap.toggleClass('unactive');
				self.responseWrap.toggleClass('active');
				
				
			};
			
			event.preventDefault();
			
		});
	};
	
	_handleTabClick = function(){
		
		self.tab.on('click', function(event){
			
			if(!$(this).hasClass('active')){
				
				_setVisibleDay($(this));            
				
			};        
			
			event.preventDefault();
			
		});
		
	};
	
	_setVisibleDay = function($trigger){
		
		var targetDay = $trigger.data('item-day');
		
		self.tab.removeClass('active');
		$trigger.addClass('active');
		
		self.cell.removeClass('filtered');
		$('.js-landing-book-calendar-cell[data-target-day="'+targetDay+'"]').addClass('filtered');
		
	};
	
	_handlePagerClick = function(){
		
		self.pager.on('click', function(event){
			
			$(this).toggleClass('active');
			self.calendarItem.toggleClass('active');
			
			$('.js-landing-book-calendar-item.active').find('.js-landing-book-calendar-tab').first().trigger('click');
			
			event.preventDefault();
			
		});
		
	};
	
	_handleAbortClick = function(){
		
		self.abort.on('click', function(event){
			
			self.wrap.removeClass('unactive');
			self.responseWrap.removeClass('active');
			
			event.preventDefault();
			
		});
		
	};
	
	_init = function(){
		
		config();
		
		_handleStep();
		
		_handleCellClick();
		
		_handleTabClick();
		self.tab.first().trigger('click');
		
		_handlePagerClick();
		
		_handleAbortClick();
		
	};
	
	return {
		
		initialize: _init
		
	};
	
}());

/*------------------------------------*\
	$OVERLAY
\*------------------------------------*/

if (typeof IVECO === "undefined") {

	var IVECO = {};

}

/**
 * v1, legacy version (still used, please do not delete)
 */
IVECO.overlay = (function(){
	
	"use strict";
	
	var self = {},
		config,
		_initOverlay,
		_init;
	
	config = function(){
		
		self.overlayTrigger = $('.fancybox');
		
	};
	
	_initOverlay = function(){
		
		$(".fancybox").fancybox();
		
		if ( $("#fancybox-autoopen").length ) {
			
			$.fancybox.open($("#fancybox-autoopen"), {
				maxWidth: 800
			});
			
		}
		
	};
	
	_init = function(){
		
		config();
		_initOverlay();
		
	};
	
	return {
		
		initialize: _init
		
	};
	
}());

/**
 * Handles overlays
 * v2
 * @requires fancybox.js
 * @requires modernizr.js
 */

IVECO.Overlay = (function(){

	"use strict";

	var _blockUI,
		_handleCB,// cookiebot
		_handleCBcategory,// cookiebot
		_checkCatArrayTruthness,// cookiebot
		_handleYT,// youtube
		_handleLC,// livechannel
		_handleGallery,
		_gatherElements,
		_installEventHandlers,
		_init;
	
	_blockUI = function( isLoading ){
		
		if ( isLoading ) {
			
			$.fancybox.helpers.overlay.open({parent: $('body'), closeClick : false});
			$.fancybox.showLoading();
			
		} else {
			
			$.fancybox.hideLoading();
			$.fancybox.helpers.overlay.close();
			
		}
		
	};
	
	/**
	 * @description handle cookiebot
	 */
	_handleCB = function(){
		
		if (typeof Cookiebot === "object") {
			//console.log('overlay: cookiebot seems installed');
			//console.log('overlay: Cookiebot.consent.necessary is '+ Cookiebot.consent.necessary);
			//console.log('overlay: Cookiebot.consent.preferences is '+ Cookiebot.consent.preferences);
			//console.log('overlay: Cookiebot.consent.statistics is '+ Cookiebot.consent.statistics);
			//console.log('overlay: Cookiebot.consent.marketing is '+ Cookiebot.consent.marketing);
			
			if ( $(document).find('.js-open-video[data-category]').length >= 1 ){
				
				_handleCBcategory( $(document).find('.js-open-video[data-category]').attr('data-category').split(',') );
				/* 
				if ( $(document).find('.js-open-video[data-category*="marketing"]').length >= 1 ){
					_handleCBcategory('marketing');
				}
				 */
			} else {
				//console.log('overlay: cookiebot installed but no js-open-video-data-category (i.e. youtube videos) videos in page');
				_handleYT();
			}
			
		} else {
			//console.log('overlay: no cookiebot installed');
			_handleYT();
		}
		
	};
	
	/**
	 * @param catArray possible values: necessary | preferences | statistics | marketing
	 */
	_handleCBcategory = function(catArray){
		//console.log('overlay: catArray');
		//console.log( catArray );
		/**
		 * @description The event CookiebotOnAccept is also triggered if the user has consented at an earlier visit to the website,
		 * so check for marketing false before listening to this event (to avoid loop in case of marketing true)
		 */
		//if (!Cookiebot.consent.marketing) {
		if (!_checkCatArrayTruthness( catArray )) {
			
			window.addEventListener('CookiebotOnAccept', function (e) {// The event is triggered if the user accepts the use of cookies.
				//console.log('overlay: CookiebotOnAccept (marketing false)');
				//if (Cookiebot.consent.marketing) {
				if ( _checkCatArrayTruthness( catArray ) ) {
					window.location.reload();
				}
			}, false);
			
			//console.log('print invitation to change marketing permissions');
			if ( Modernizr.mq("only screen and (min-width: 1025px)") ) {
				
				$(document).find('.js-open-video[data-category]').each(function(){
					var	$this = $(this);
					var $videoImg = $this.children('.embed-video__frame');
					var $cookiebotText = $('#cookiesBlocking').clone().removeAttr('id style');
					var htmlConsent = '';
					
					if ( $videoImg.hasClass('js-lazy') ) {//copy src from data-src, to avoid persistent lazy loading gif if webpart is above the fold
						$videoImg.attr({
							'src': $videoImg.attr('data-src').indexOf('.youtube.') > -1 ?
							"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'%3E%3Crect width='100%25' height='100%25' fill='%23000' /%3E%3C/svg%3E" :// print a black rectangle, to avoid image from youtube
							$videoImg.attr('data-src'),
						});
					}
					
					htmlConsent +=	'<div class="embed-video__consent">'+
													'	'+ $videoImg.prop('outerHTML') +''+// clone image
													'	<div class="embed-video__cookiebot">'+// clone consent text
					//							'		<div>Your preferences about cookies do not allow viewing of this video.</div>'+
					//							'		<a href="javascript:Cookiebot.renew()">Click HERE if you wish to change your preferences</a>'+
													'		<div>'+ $cookiebotText.prop('outerHTML') +'</div>'+
													'	</div>'+
													'</div>';
					
					$this.hide().after( htmlConsent );
					
				});
			}
			
		} else {
			//console.log('overlay: listen to CookiebotOnAccept and CookiebotOnDecline: marketing already accepted, but user can change their mind');
			
			window.addEventListener('CookiebotOnAccept', function (e) {// The event is triggered if the user accepts the use of cookies.
				//console.log('overlay: CookiebotOnAccept (marketing was true)');
				//if (!Cookiebot.consent.marketing) {// user refuses marketing
				if (!_checkCatArrayTruthness( catArray )) {// user refuses marketing
					window.location.reload();
				}
			}, false);
			
			window.addEventListener('CookiebotOnDecline', function (e) {// The event is triggered if the user declines the use of cookies.
				//console.log('overlay: CookiebotOnDecline (marketing was true)');
				//if (!Cookiebot.consent.marketing) {// user refuses marketing
				if (!_checkCatArrayTruthness( catArray )) {// user refuses marketing
					window.location.reload();
				}
			}, false);
			
			_handleYT();
		}
		
	};
	
	_checkCatArrayTruthness = function(catArray){
		var result;
		
		switch (catArray.length){
			case 1: {
				result = Cookiebot.consent[ catArray[0] ];
				break;
			}
			case 2: {
				result = Cookiebot.consent[ catArray[0] ] && Cookiebot.consent[ catArray[1] ];
				break;
			}
			case 3: {
				result = Cookiebot.consent[ catArray[0] ] && Cookiebot.consent[ catArray[1] ] && Cookiebot.consent[ catArray[2] ];
				break;
			}
			case 4: {
				result = Cookiebot.consent[ catArray[0] ] && Cookiebot.consent[ catArray[1] ] && Cookiebot.consent[ catArray[2] ] && Cookiebot.consent[ catArray[3] ];
				break;
			}
			default: {
				console.log('overlay: Empty action received.');
				break;
			}
		}
		
		return result;
	};
	
	_handleYT = function(){
		
		var fancyboxOptions = {
			type: "iframe",
			padding: 0,// remove white borders
			width: 800,
			height: 450,
			aspectRatio: true,// keep 16/9 ratio, avoiding top and bottom black stripes
			helpers : {
				media: true
			},
			youtube : {
				wmode: 'opaque',// IE fix
				showinfo: 0,
				rel: 0,
				start: 0,
				autoplay: 1,
				iv_load_policy: 3
			}
			
		};
		
		if ( Modernizr.mq("only screen and (min-width: 1025px)") ) {
			
			$(document).find('.js-open-video').each(function(){
				
				var	$this = $(this),
					newUrl = '';
				
				if ( $this.attr('href').indexOf('youtube.') > -1 ) {
					
					newUrl = $this.attr('href').split('/')[3];// /watch?v=[video-id]
					
					if ( newUrl.indexOf('&t=') > -1 ) {// video has a starting time different from 0
						fancyboxOptions.youtube.start = parseInt( newUrl.split('&t=')[1], 10 );
					} else {
						fancyboxOptions.youtube.start = 0;
					}
					
					$this.fancybox( fancyboxOptions );
					
				}
				
			});
			
		}
		
	};
	
	_handleLC = function(){
		
		$(document).find('.js-open-livechannel').on('click', function(ev){
			ev.preventDefault();
			
			var $this = $(this);
			var $iframe = $this.next('iframe');
			/* 
			console.log( $iframe.attr('data-src') );
			$iframe.attr({
				'src': $iframe.attr('data-src'),//copy src from data-src
			});
			 */
			var fancyboxOptions = {
				//content: '<div class="embed-video__responsive-livechannel">'+ $iframe.prop('outerHTML') +'</div>',
				//wrapCSS: 'embed-video__overlay-livechannel',
				//fitToView: false,
				//type: "inline",
				type: "iframe",
				href: $iframe.attr('data-src'),
				padding: 0,// remove white borders
				width: 800,
				height: 450,
				aspectRatio: true,// keep 16/9 ratio, avoiding top and bottom black stripes
			};
			
			$.fancybox.open($this, fancyboxOptions);
			
		});
		
	};
	
	_handleGallery = function(){
		
		$(document).find('.js-embed-gallery__item').click(function(){
			
			/**
			 * @description register a click handler to avoid gallery not being triggered on iOs
			 * html `a` tag should have an empty href (`<a href="#" class="js-embed-gallery__item">`), but it hasn't, so we use this workaround
			 * do not remove this empty click handler
			 */
			
		});
		
		$(document).find('.js-embed-gallery__item').fancybox({
			type: 'html',
			autoSize: false,
			wrapCSS: 'embed-gallery__overlay',
			width: '100%',
			height: '100%',
			nextEffect: 'fade',
			prevEffect: 'fade',
			padding: 0,// remove white borders
			margin: 0,// remove white borders
			
			afterLoad: function(){
				//this.title = '<a href="' + this.href + '">Download</a> ' + this.title;
				var $this = $(this.element);
				var content = '';
				content +=	'<div class="embed-gallery__overlay-picture">'+
										'	<img class="embed-gallery__overlay-img" src="'+ this.href +'" alt="" />'+
										'</div>'+
										'<div class="embed-gallery__overlay-caption">'+
										'	<div class="container">'+
										'		<div class="row">'+
  									'			<div class="col-sm-12 col-md-9">'+
										'				<h3 class="embed-gallery__overlay-captiontitle">' + $this.attr('data-title') + '</h3>'+
										' 			<div class="embed-gallery__overlay-captioncontent">' + $this.attr('data-subtitle') +'</div>'+
  									'			</div>'+
										'		</div>'+
										'	</div>'+
										'</div>';
				
				$.extend(this, {
					content: content
				});
				
				// add class to override overflow (and fix bugs in IE and Chrome)
				$('.embed-gallery__overlay').parent('.fancybox-overlay').addClass('embed-gallery__overlay-parent');
				$('html').addClass('embed-gallery__overlay-html');
				
				// create dot links
				var list = $('.embed-gallery__overlay-dotlist');
				
				if (!list.length) {
						list = $('<ul class="embed-gallery__overlay-dotlist">');
				
						for (var i = 0; i < this.group.length; i++) {
								$('<li class="embed-gallery__overlay-dotitem" data-index="' + i + '"><span></span></li>').click(function() { $.fancybox.jumpto( $(this).data('index'));}).appendTo( list );
						}
						
						//list.appendTo('.embed-gallery__overlay-picture');
						list.appendTo('body');
				}

				list.find('li').removeClass('active').eq( this.index ).addClass('active');
				
			},
			
			beforeClose: function(){
				
				// clean html class
				$('html').removeClass('embed-gallery__overlay-html');
				
				// destroy dot links
				$('.embed-gallery__overlay-dotlist').remove();
			},
			
			helpers: {
				title: {
					type: 'inside'
				},
        overlay : {
					//locked : false // try changing to true and scrolling around the page
        }
			}
		});
		
	};
	
	_gatherElements = function(){
		
	};
	
	_installEventHandlers = function(){
		/* 
		$(document).on('click', '.js-open-video', function(e){
			
			e.preventDefault();
			
		});
		 */
	};
	
	_init = function(){
		
		//_gatherElements();
		//_installEventHandlers();
		_handleCB();
		//_handleYT();
		_handleLC();
		_handleGallery();
		
	};
	
	return {
		
		init: _init//,
		//blockUI: _blockUI
		
	};
	
})();

if (typeof IVECO === "undefined") {

	var IVECO = {};

}

/**
 * Handles tabs
 */

IVECO.Tabs = (function(){

	"use strict";

	var $navContainer,
		$navWrap,
		$arrowLeft,
		$arrowRight,
		SCROLL = 150,
		DURATION = 300,
		_handleArrowsVisibility,
		_gatherElements,
		_installEventHandlers,
		_init;
	
	_gatherElements = function(){
	
		$navContainer = $('.js-nav-tab-container');
		$navWrap = $navContainer.children('.js-nav-tab-wrap');
		$arrowLeft = $navContainer.children('.js-nav-tab-arrow-left');
		$arrowRight = $navContainer.children('.js-nav-tab-arrow-right');
		
	};
	
	_handleArrowsVisibility = function(){
		
		$navContainer.each(function(){
			
			var $currentContainer = $(this),
				$currentWrap = $currentContainer.children('.js-nav-tab-wrap'),
				newScrollLeft = $currentWrap.scrollLeft(),
				width = $currentWrap.outerWidth(true),
				scrollWidth = $currentWrap.get(0).scrollWidth,
				diff = scrollWidth - newScrollLeft;
			
			if ( diff <= (width + 1) && diff >= (width - 1) ) {
				
				$currentContainer.removeClass('show-right-arrow');
				
			} else {
				
				$currentContainer.addClass('show-right-arrow');
				
			}
			
			if ( diff <= (scrollWidth + 1) && diff >= (scrollWidth - 1) ){
				
				$currentContainer.removeClass('show-left-arrow');
				
			} else {
				
				$currentContainer.addClass('show-left-arrow');
				
			}
			
		});
		
	};
	
	_installEventHandlers = function(){
		
		$navWrap.scroll(function(){
			
			_handleArrowsVisibility();
			
		});
		
		$(window).on('resize', function(){
			
			_handleArrowsVisibility();
			
		});
		
		$arrowLeft.on('click', function(e){
			
			e.preventDefault();
			
			//$navWrap.scrollLeft( $navWrap.scrollLeft() - SCROLL );
			$(this).prevAll('.js-nav-tab-wrap').animate( { scrollLeft: '-=' + SCROLL }, DURATION);
			
		});
		
		$arrowRight.on('click', function(e){
			
			e.preventDefault();
			
			//$navWrap.scrollLeft( $navWrap.scrollLeft() - SCROLL );
			$(this).prevAll('.js-nav-tab-wrap').animate( { scrollLeft: '+=' + SCROLL }, DURATION);
			
		});
		
	};
	
	_init = function(){
		
		_gatherElements();
		_installEventHandlers();
		_handleArrowsVisibility();
		
	};
	
	return {
		
		init: _init
		
	};
	
})();

if (typeof IVECO === "undefined") {
	
	var IVECO = {};

}
	
/**
 * Handles countdown in homepage slide
 * @requires jquery.countdown.js
 */

IVECO.Countdown = (function() {
	
	"use strict";
	
	var	//dom elements
		$countdown,
		$countdownContent,
		$countdownEnded,
		
		startDate,
		endDate,
		t,
		
		//methods
		_enableCountdown,
		_disableCountdown,
		_gatherElements,
		_init;
	
	_disableCountdown = function() {
	
		/**
		 * 
		 */
		
		//$countdownContent.text('');
		$countdown
			.closest('a').attr({
				'href': '//www.iveco.com/ivecobus/en-us/products/Pages/Busworld-2017.aspx',
				'target': '_blank'
			})
			.children('.visual-intro__img').children('img').attr({
				'src': '//www.iveco.com/ivecobus/en-us/PublishingImages/Countdown/IvecoBus_web_banner_Invitation_Busworld2017_1440x400_new.jpg'
			});
		
		//clearInterval(t);
	
	};
	
	/**
	 * @deprecated 
	 */
	/* 
	_enableCountdown = function() {
	
		startDate = moment();
		
		if ( startDate <= endDate ) {
			
			//$countdownContent.text( countdown(startDate, endDate).toString() );
			$countdownContent.html( countdown(startDate, endDate).toHTML() );
			
		} else {
			
			_disableCountdown();
			
		}
	
	};
	 */
	_gatherElements = function() {
		$countdown = $('.js-countdown')
		$countdownContent = $countdown.find('.js-countdown__content');
		$countdownEnded = document.getElementById("countdown-ended");
	};
	
	_init = function() {
	
		_gatherElements();
		/* 
		startDate = moment();
		endDate = moment("2017-10-20T08:00:00");
		countdown.resetLabels();
		countdown.setLabels(
			'ms |s |m |h |d |w |m |y |decennio |secolo |millennio ',
			'ms |ss |mm |hh |dd |ww |mm |yy |decenni |secoli |millenni ',
			'',
			'',
			'');
			
			*/
		//$countdown.unwrap('.intro-subtitle');
		//$countdown.unwrap('.intro-info-wrap');
		//$countdown.unwrap('.container');
/* 
		if ( $countdown.parent().is(".container") ) {
			$countdown.unwrap('.container');
		}
		 */
		$countdown
			.closest('.visual-intro__txt')
			.addClass('countdown__wrap').removeClass('top bottom left right')
			.find('.container').children().unwrap()
			.closest('.visual-intro__txt')
			.find('.intro-info-wrap').children().unwrap()
			.closest('.visual-intro__txt')
			.find('.intro-subtitle').children().unwrap();

		
		/* 
		if ( startDate <= endDate ) {
			
			t = setInterval( _enableCountdown, 1000 );
			
		} else {
			
			_disableCountdown();
			
		}
		 */


		startDate = new Date();
		endDate = new Date(2017, 10-1, 19, 12, 30, 0);// real date
		//endDate = new Date(2017, 10-1, 11, 17, 0, 0);// fake date, for testing purposes

		if ( startDate <= endDate ) {
		
			$countdownContent.countdown({
				labels: ['YY', 'MM', 'WW', 'DD', 'HH', 'MM', 'SS'],// plural form
				labels1: ['YY', 'MM', 'WW', 'DD', 'HH', 'MM', 'SS'],// singular form
				until: endDate,
				timezone: +2,// timezone setting is set to the target time's offset from GMT (Belgium, in our case)
				onExpiry: _disableCountdown
			});
			
		} else {
			
			_disableCountdown();
			
		}
	};
	
	return {
		
		init: _init
		
	}
	
}());

if (typeof IVECO === "undefined") {

	var IVECO = {};

}

/**
 * Handles floating CTAs
 */

IVECO.FloatingCta = (function(){

	"use strict";

	var $base,
		$btn,
		$wrap,
		_gatherElements,
		_installEventHandlers,
		_init;
	
	
	_gatherElements = function(){
		$base = $('.js-floating-cta');
		//$btn = $base.find('.js-floating-cta__btn');
		$wrap = $base.find('.js-floating-cta__wrap');
	};
	
	_installEventHandlers = function(){
		
		$base.on('click', '.js-floating-cta__btn', function(e){
			e.preventDefault();
			
			$wrap.toggleClass('on');
		});
		
	};
	
	_init = function(){
		
		_gatherElements();
		_installEventHandlers();
		$('#layout').addClass('layout--floating-cta');
	};
	
	return {
		
		init: _init
		
	};
	
})();

/*------------------------------------*\
	$LAZY
\*------------------------------------*/

if (typeof IVECO === "undefined") {

	var IVECO = {};

}

/**
 * Handle lazy loading of images (and video)
 * @since december 2018
 * @see product-page.hbs
 * @requires intersection-observer polyfill
 * @requires nodelist-foreach-polyfill
 * @desc print lower resolution image on smaller devices
 * @example 
 * original resolution (no params):
 * https://www.iveco.com/Common/PublishingImages/2018HPBanner/2018_ETRC_1_1400x400.png
 * medium resolution (param 600)
 * https://www.iveco.com/Common/PublishingImages/2018HPBanner/2018_ETRC_1_1400x400.png?width=600
 * low resolution (param 1)
 * https://www.iveco.com/Common/PublishingImages/2018HPBanner/2018_ETRC_1_1400x400.png?width=1
 */
IVECO.Lazy = (function(){

	"use strict";

	var self = {},
		_observeImg,
		_loadImg,
		_handleCBcategory,// cookiebot
		_checkCatArrayTruthness,// cookiebot
		_handleYT,
		_getYTApi,
		isYTReady = false,
		_YTReady,
		_observeVid,
		_handleVidPlayer,
		_onPlayerReady,
		_loadVid,
		_init;
	
	_observeImg = function(){
		
		self.imgList = document.querySelectorAll('img.js-lazy');
		self.imgOptions = {
			//root: null,
			//rootMargin: '0',
			//threshold: 1.0
		}
		
		self.imgObserver = new IntersectionObserver(_loadImg, self.imgOptions);
		
		self.imgList.forEach(function (image) {
			self.imgObserver.observe(image);
		});
		
	};
	
	_loadImg = function(entries, observer){
		
		//console.log('load images with ease');
		entries.forEach(function(entry) {
			
			var	imgSrc,
				imgResolution = '',
				viewport = $(window).width();
				
			if (entry.isIntersecting) {
				
				//console.log('load image only once :)');
				imgSrc = entry.target.getAttribute('data-src');
				imgResolution = viewport < 480 ? '?width=1' : viewport < 992 ? '?width=600' : '';
				
				if ( imgSrc ) {
					entry.target.src = imgSrc + imgResolution;
				}
				
				observer.unobserve(entry.target);// Stop observing after image has been loaded
				
			}
			
		});
	};
	
	/**
	 * @param catArray possible values: necessary | preferences | statistics | marketing
	 */
	 _handleCBcategory = function(catArray){
		//console.log('lazy: catArray');
		//console.log( catArray );
		/**
		 * @description The event CookiebotOnAccept is also triggered if the user has consented at an earlier visit to the website,
		 * so check for marketing false before listening to this event (to avoid loop in case of marketing true)
		 */
		//if (!Cookiebot.consent.marketing) {
		if (!_checkCatArrayTruthness( catArray )) {
			
			window.addEventListener('CookiebotOnAccept', function (e) {// The event is triggered if the user accepts the use of cookies.
				//console.log('lazy: CookiebotOnAccept (marketing false)');
				//if (Cookiebot.consent.marketing) {
				if ( _checkCatArrayTruthness( catArray ) ) {
					window.location.reload();
				}
			}, false);
			
			//console.log('print invitation to change marketing permissions');
			$(document).find('.js-inline-video[data-category]').each(function(){
				var $this = $(this);
				var $videoImg = $this.children('.embed-video__frame');
				var $cookiebotText = $('#cookiesBlocking').clone().removeAttr('id style');
				var htmlConsent = '';
				
				//if ( $videoImg.hasClass('js-lazy') ) {//copy src from data-src, to avoid persistent lazy loading gif if webpart is above the fold
					$videoImg.attr({
						'src': $videoImg.attr('data-src').indexOf('.youtube.') > -1 ?
							"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'%3E%3Crect width='100%25' height='100%25' fill='%23000' /%3E%3C/svg%3E" :// print a black rectangle, to avoid image from youtube
							$videoImg.attr('data-src'),
					});
				//}
				
				htmlConsent +=	'<div class="embed-video__consent">'+
												'	'+ $videoImg.prop('outerHTML') +''+// clone image
												'	<div class="embed-video__cookiebot">'+// clone consent text
				//							'		<div>Your preferences about cookies do not allow viewing of this video.</div>'+
				//							'		<a href="javascript:Cookiebot.renew()">Click HERE if you wish to change your preferences</a>'+
												'		<div>'+ $cookiebotText.prop('outerHTML') +'</div>'+
												'	</div>'+
												'</div>';
				
				$this.hide().after( htmlConsent );
				
			});
			
		} else {
			//console.log('lazy: listen to CookiebotOnAccept and CookiebotOnDecline: marketing already accepted, but user can change their mind');
			
			window.addEventListener('CookiebotOnAccept', function (e) {// The event is triggered if the user accepts the use of cookies.
				//console.log('lazy: CookiebotOnAccept (marketing was true)');
				//if (!Cookiebot.consent.marketing) {// user refuses marketing
				if (!_checkCatArrayTruthness( catArray )) {// user refuses marketing
					window.location.reload();
				}
			}, false);
			
			window.addEventListener('CookiebotOnDecline', function (e) {// The event is triggered if the user declines the use of cookies.
				//console.log('lazy: CookiebotOnDecline (marketing was true)');
				//if (!Cookiebot.consent.marketing) {// user refuses marketing
				if (!_checkCatArrayTruthness( catArray )) {// user refuses marketing
					window.location.reload();
				}
			}, false);
			
			_handleYT();
		}
		
	};
	
	_checkCatArrayTruthness = function(catArray){
		var result;
		
		switch (catArray.length){
			case 1: {
				result = Cookiebot.consent[ catArray[0] ];
				break;
			}
			case 2: {
				result = Cookiebot.consent[ catArray[0] ] && Cookiebot.consent[ catArray[1] ];
				break;
			}
			case 3: {
				result = Cookiebot.consent[ catArray[0] ] && Cookiebot.consent[ catArray[1] ] && Cookiebot.consent[ catArray[2] ];
				break;
			}
			case 4: {
				result = Cookiebot.consent[ catArray[0] ] && Cookiebot.consent[ catArray[1] ] && Cookiebot.consent[ catArray[2] ] && Cookiebot.consent[ catArray[3] ];
				break;
			}
			default: {
				console.log('overlay: Empty action received.');
				break;
			}
		}
		
		return result;
	};
	
	_handleYT = function(){
		
		self.vidPlayerObj = {};
		_getYTApi();
		window.onYouTubeIframeAPIReady = _YTReady;
		_observeVid();
		
	};
	
	_observeVid = function(){
		
		self.vidList = document.querySelectorAll('.js-lazy-video');
		self.vidOptions = {
			//root: null,
			//rootMargin: '0',
			//threshold: 1.0
		}
		
		self.vidObserver = new IntersectionObserver(_loadVid, self.vidOptions);
		
		self.vidList.forEach(function (video) {
			self.vidObserver.observe(video);
		});
		
	};
	
	_getYTApi = function(){
		
		var	apiTag, firstScriptTag;
		//console.log('fetch youtube API');
		
		self.$layout = $('#layout');
		self.$layout.addClass('ytapi-loading');
		apiTag = document.createElement('script');
		firstScriptTag = document.getElementsByTagName('script')[0];
		apiTag.src = 'https://www.youtube.com/iframe_api';
		firstScriptTag.parentNode.insertBefore(apiTag, firstScriptTag);
		
	};
	
	_YTReady = function(){
		
		isYTReady = true;
		self.$layout.removeClass('ytapi-loading');
		_handleVidPlayer();
		
	};
	
	_handleVidPlayer = function(){
		
		$(self.vidList).on('click', '.js-inline-video', function(e){
			e.preventDefault();
			
			var $this = $(this),
			elementId = $this.attr('id'),
			videoId = $this.parent().attr('data-ytvideo');
			
			self.vidPlayerObj[videoId] = new YT.Player( elementId , {
				height: '405',
				width: '720',
				videoId: videoId,
				playerVars: {
					controls: 0,
					iv_load_policy: 3,
					loop: 1,
					playlist: videoId,
					modestbranding: 1,
					origin: window.location.protocol + '//' + window.location.host,
					playsinline: 1,
					rel: 0
				},
				events: {
					'onReady': _onPlayerReady
				}
			});
			
		});
		
	};
	
	_onPlayerReady = function(event){
		
		//console.log( event.target );
		//console.log( $(event.target.h).attr('href') );
		//event.target.loadVideoByUrl( $(event.target.h).attr('href') );
		//$('iframe[href="'+ event.target.getVideoUrl() +'"]').parent('.js-lazy-video').addClass('embed-responsive embed-responsive-16by9');
		event.target.mute();
		event.target.playVideo();
		
	};
	
	_loadVid = function(entries, observer){
		
		//console.log('load yt videos with ease');
		entries.forEach(function(entry) {
			
			var vidSrc, vidId;
			vidSrc = entry.target.children[0].getAttribute('href');
			vidId = entry.target.getAttribute('data-ytvideo');
			
			if (entry.isIntersecting) {
				
				//console.log( entry.target );
				//console.log( vidSrc );
				
				if ( vidSrc ) {
					//entry.target.src = imgSrc + imgResolution;
					
					if ( isYTReady ) {
						
						//console.log('youtube API available :)');
						//console.log( entry.target.getAttribute('data-ytvideo') );
						
						if ( !self.vidPlayerObj[vidId] ) {
							
							$(entry.target).children('.js-inline-video').click();
							
						} else {
							
							self.vidPlayerObj[vidId].playVideo();
							
						}
						
					} else {
						//console.log('youtube API not yet available...');
					}
				}
				
			} else {
				
				if ( vidSrc && self.vidPlayerObj[vidId] ) {
					
					self.vidPlayerObj[vidId].pauseVideo();
					
				}
				
			}
			
		});
	};
	
	_init = function(){
		
		if ( $('.js-lazy').length ) {
			
			_observeImg();
			
		}
		
		if ( $('.js-lazy-video').length ) {
			
			if (typeof Cookiebot === "object") {
				//console.log('lazy: cookiebot seems installed');
				//console.log('lazy: Cookiebot.consent.necessary is '+ Cookiebot.consent.necessary);
				//console.log('lazy: Cookiebot.consent.preferences is '+ Cookiebot.consent.preferences);
				//console.log('lazy: Cookiebot.consent.statistics is '+ Cookiebot.consent.statistics);
				//console.log('lazy: Cookiebot.consent.marketing is '+ Cookiebot.consent.marketing);
				
				if ( $(document).find('.js-inline-video[data-category]').length >= 1 ){
					
					/**
					 * @description data-category could be empty (data-category="") but we prefer not showing youtube videos at all;
					 * even accepting all cookies, user won't be able to see youtube videos because there will never be a match against an empty string
					 */
					//if ( $(document).find('.js-inline-video[data-category]').attr('data-category') !== '' ) {
					_handleCBcategory( $(document).find('.js-inline-video[data-category]').attr('data-category').split(',') );
					//} else {
					//	console.log('lazy: cookiebot installed but js-inline-video-data-category is an empty string');
					//	_handleYT();
					//}
					
				} else {
					//console.log('lazy: cookiebot installed but no js-inline-video-data-category (i.e. youtube videos) videos in page');
					_handleYT();
				}
				
			} else {
				//console.log('lazy: no cookiebot installed');
				_handleYT();
			}
			
		}
		
	};
	
	return {
		init: _init
	};

})();

$(document).ready(function(){
	IVECO.Lazy.init();
});

if (typeof IVECO === "undefined") {

	var IVECO = {};

}

/**
 * Handles change vehicle floating box
 */

IVECO.ChangeVehicle = (function(){

	"use strict";

	var self = {},
		_gatherElements,
		_installEventHandlers,
		_init;
	
	
	_gatherElements = function(){
		
		self.$base = $('.js-change-vehicle');
		
	};
	
	_installEventHandlers = function(){
		
		self.$base.one('click', '.js-change-vehicle__close', function(e){
			e.preventDefault();
			
			self.$base.fadeOut();
		});
		
	};
	
	_init = function(){
		
		_gatherElements();
		_installEventHandlers();
		
	};
	
	return {
		
		init: _init
		
	};
	
})();

IVECO.ChangeVehicle.init();

if (typeof IVECO === "undefined") {

	var IVECO = {};

}

/**
 * Handles pack list in product page
 * @requires slick-slider
 * @since january 2019
 * @see product-page.hbs
 */

IVECO.Pack = (function(){

	"use strict";

	var self = {},
		_gatherElements,
		_resetUI,
		_installEventHandlers,
		_initSlider,
		_handleFilter,
		_init;
	
	_gatherElements = function(){
		
		self.$base = $('.js-pack__list');
		self.$select = $('.js-pack__select');
		
	};
	
	_resetUI = function(){
		
		self.$select.children('option:selected').prop('selected', false);
		self.$select.children('option:first').prop('selected', 'selected');
		
	};
	
	_installEventHandlers = function(){
		
		self.$select.on('change', _handleFilter);
		
	};
	
	_initSlider = function(){
		var html = document.querySelector('html');
		var rtl = false;
		if (html.dir === 'rtl') {
			rtl = true;
		}
		self.$base.slick({
			accessibility: false,// keep 'accessibility' set to 'false', to prevent IE11 bug when changing slide (due to unwanted focus on hidden element)
			adaptiveHeight: false,
			arrows: true,
			autoplay: false,
			centerMode: true,
			centerPadding: '20%',
			dots: false,
			rtl: rtl,
			fade: false,
			infinite: true,
			slidesToScroll: 1,
			slidesToShow: 2,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						centerMode: false
					}
				}
			]
		});
		
	};
	
	//Filtering the Pack webpart
	_handleFilter = function(){
		
		var $filter = $(this).val();
		
		if ( $filter !== '-' ) {			
			//self.$base.slick('slickFilter', '[data-type="'+ $filter +'"]');
			self.$base.slick('slickUnfilter');
			self.$base.slick('slickFilter', function(index, elem) {
				return $(elem).find('.pack__item').attr('data-type') == $filter;
			});
		} else {
			self.$base.slick('slickUnfilter');
		}
		
	};
	
	_init = function(){
		
		_gatherElements();
		_resetUI();
		_initSlider();
		_installEventHandlers();
		
	};
	
	return {
		
		init: _init
		
	};
	
})();

IVECO.Pack.init();

if (typeof IVECO === "undefined") {

	var IVECO = {};

}

/**
 * Handles video list in product page (inside a tab pane)
 * @requires slick-slider
 * @since january 2019
 * @see product-page.hbs
 */

IVECO.TabVideoPhoto = (function(){

	"use strict";

	var self = {},
		_gatherElements,
		_installEventHandlers,
		_initSlider,
		_init;
	
	_gatherElements = function(){
		
		self.$base = $('.js-tab-video-photo__sliderlist');
		
	};
	
	_installEventHandlers = function(){
		
	};
	
	_initSlider = function(){
		
		self.$base.slick({
			accessibility: false,// keep 'accessibility' set to 'false', to prevent IE11 bug when changing slide (due to unwanted focus on hidden element)
			adaptiveHeight: false,
			arrows: true,
			autoplay: false,
			centerMode: false,
			//centerPadding: '20%',
			dots: true,
			fade: false,
			infinite: false,
  		slidesToScroll: 1,
			slidesToShow: 1
		});
		
	};
	
	_init = function(){
		
		_gatherElements();
		_initSlider();
		_installEventHandlers();
		
	};
	
	return {
		
		init: _init
		
	};
	
})();

IVECO.TabVideoPhoto.init();

if (typeof IVECO === "undefined") {

	var IVECO = {};

}

/**
 * Handles page navigation fixed at bottom
 * @requires bootstrap
 */

IVECO.NavProduct = (function(){

	"use strict";

	var $base,
		$navBar,
		$navContainer,
		$navWrap,
		$arrowLeft,
		$arrowRight,
		
		SCROLL = 150,
		DURATION = 300,
		
		_gatherElements,
		_installEventHandlers,
		_handleAffix,
		_handleScrollSpy,
		_handleArrowsVisibility,
		_init;
	
	_gatherElements = function(){
		$base = $('.js-nav-product');
		$navBar = $base.find('.js-nav-product__bar');
		$navContainer = $base.find('.js-nav-product__outer');
		$navWrap = $base.find('.js-nav-product__inner');
		$arrowLeft = $base.find('.js-nav-product__arrow-left');
		$arrowRight = $base.find('.js-nav-product__arrow-right');
	};
	
	_installEventHandlers = function(){
		
		$navWrap.scroll(function(){
			
			_handleArrowsVisibility();
			
		});
		
		$('.visual-intro__img img').load(function(){
			
			$navWrap.scroll();// wait few moments before checking navbar width (right arrow shows, even if not needed)
			
		});
		
		$(window).on('resize', function(){
			
			_handleArrowsVisibility();
			
		});
		
		$arrowLeft.on('click', function(e){
			
			e.preventDefault();
			$navWrap.animate( { scrollLeft: '-=' + SCROLL }, DURATION);
			
		});
		
		$arrowRight.on('click', function(e){
			
			e.preventDefault();
			$navWrap.animate( { scrollLeft: '+=' + SCROLL }, DURATION);
			
		});
		
		/**
		 * @todo handle case of external link in navbar (should replace full url, not hash only)
		 */
		$navWrap.on('activate.bs.scrollspy', function(){
			
			var hash = $(this).find('li.active a').attr('href');
			//var path = document.location.pathname;
			//var host = document.location.host;
			
			window.history.replaceState({}, '', hash);
			
		});
		
	};
	
	_handleAffix = function(){
		
		$base.css({
			'min-height': $navBar.height()
		});
		
		$navBar.affix({
			offset: {
				top: function() {return $base.offset().top;}
			}
		});
		
	};
	
	_handleScrollSpy = function(){
		
		var HEADER_HEIGHT = $('header.main-header').height(),
			NAV_HEIGHT = $base.height(),
			OFFSET = HEADER_HEIGHT + NAV_HEIGHT;
		
		$('body').scrollspy({
			offset: OFFSET,
			target: '.js-nav-product__inner'
		});
		
	};
	
	_handleArrowsVisibility = function(){
		
		var newScrollLeft = $navWrap.scrollLeft(),
		 width = $navWrap.outerWidth(true),
		 scrollWidth = $navWrap.get(0).scrollWidth,
		 diff = scrollWidth - newScrollLeft;
		
		if ( diff <= (width + 1) && diff >= (width - 1) ) {
			
			$navContainer.removeClass('show-right-arrow');
			
		} else {
			
			$navContainer.addClass('show-right-arrow');
			
		}
		
		if ( diff <= (scrollWidth + 1) && diff >= (scrollWidth - 1) ){
			
			$navContainer.removeClass('show-left-arrow');
			
		} else {
			
			$navContainer.addClass('show-left-arrow');
			
		}
		
	};
	
	_init = function(){
		
		if ( $('.js-nav-product').length ) {
			
			_gatherElements();
			_installEventHandlers();
			_handleAffix();
			_handleScrollSpy();
			_handleArrowsVisibility();
			
		}
		
	};
	
	return {
		
		init: _init
		
	};
	
})();

IVECO.NavProduct.init();

if (typeof IVECO === "undefined") {

	var IVECO = {};

}

/**
 * Handles page navigation fixed at bottom
 * @requires bootstrap
 */

IVECO.NavBottom = (function(){

	"use strict";

	var $base,
		$navContainer,
		$navWrap,
		$arrowLeft,
		$arrowRight,
		
		SCROLL = 150,
		DURATION = 300,
		
		_gatherElements,
		_installEventHandlers,
		_handleScrollSpy,
		_handleArrowsVisibility,
		_init;
	
	
	_gatherElements = function(){
		$base = $('.js-nav-bottom');
		$navContainer = $base.find('.js-nav-bottom__outer');
		$navWrap = $base.find('.js-nav-bottom__inner');
		$arrowLeft = $base.find('.js-nav-bottom__arrow-left');
		$arrowRight = $base.find('.js-nav-bottom__arrow-right');
	};
	
	_installEventHandlers = function(){
		
		$navWrap.scroll(function(){
			
			_handleArrowsVisibility();
			
		});
		
		$(window).on('resize', function(){
			
			_handleArrowsVisibility();
			
		});
		
		$arrowLeft.on('click', function(e){
			
			e.preventDefault();
			
			$navWrap.animate( { scrollLeft: '-=' + SCROLL }, DURATION);
			
		});
		
		$arrowRight.on('click', function(e){
			
			e.preventDefault();
			
			$navWrap.animate( { scrollLeft: '+=' + SCROLL }, DURATION);
			
		});
		
	};
	
	_handleScrollSpy = function(){
		
		var HEADER_HEIGHT = $('header.main-header').height(),
			PAGE_MENU_HEIGHT = $('.select-menu__select-wrap').height(),// visible only on mobile
			OFFSET = PAGE_MENU_HEIGHT > 0 ? HEADER_HEIGHT + PAGE_MENU_HEIGHT + 20 : 10;
		//console.log( PAGE_MENU_HEIGHT );
		//console.log( OFFSET );
		
		$('body').addClass('has-nav-bottom').scrollspy({
			offset: OFFSET,
			target: '.nav-bottom__inner'
		});
		
	};
	
	_handleArrowsVisibility = function(){
		
		var newScrollLeft = $navWrap.scrollLeft(),
			width = $navWrap.outerWidth(true),
			scrollWidth = $navWrap.get(0).scrollWidth,
			diff = scrollWidth - newScrollLeft;
		
		if ( diff <= (width + 1) && diff >= (width - 1) ) {
			
			$navContainer.removeClass('show-right-arrow');
			
		} else {
			
			$navContainer.addClass('show-right-arrow');
			
		}
		
		if ( diff <= (scrollWidth + 1) && diff >= (scrollWidth - 1) ){
			
			$navContainer.removeClass('show-left-arrow');
			
		} else {
			
			$navContainer.addClass('show-left-arrow');
			
		}
		
	};
	
	_init = function(){
		_gatherElements();
		_installEventHandlers();
		_handleScrollSpy();
		_handleArrowsVisibility();
	};
	
	return {
		
		init: _init
		
	};
	
})();

if (typeof IVECO === "undefined") {

	var IVECO = {};

}

/**
 * Handles GDPR fields
 */

IVECO.GDPR = (function(){

	"use strict";

	var self = {},
		//_config,
		_check,
		_ajaxCall,
		_printResponse,
		_validate,
		_populatePolicies,
		_gatherElements,
		_installEventHandlers,
		_getGDPRFormAsync,
		_handleToggle,
		_isIE,
		_init;
	
	/**
	 * @deprecated
	 * @since gdpr fields are printed in page at docready
	 */
	_check = function(formWrap, callback, originalArguments){
		
		//console.log( formWrap );
		if ( formWrap && typeof formWrap === 'string' && formWrap !== '' ) {
			
			self.formWrap = formWrap;
			self.$formWrap = $(self.formWrap);
			_gatherElements();
			$.fancybox.helpers.overlay.open({parent: $('body'), closeClick : false});
			$.fancybox.showLoading();
			_ajaxCall();
			
		} else {
			console.log('no formWrap selector provided');
			self.formWrap = '';
		}
		
		if ( callback && typeof callback === 'function' ) {
			self.callback = callback;
		} else {
			console.log('no callback function provided');
			self.callback = false;
		}
		
		if ( originalArguments ) {
			self.arguments = originalArguments;
		} else {
			console.log('no arguments provided');
			self.arguments = [];
		}
		
	};
	
	_gatherElements = function(){
		
		self.$GDPR_pot = $('.js-form-gdpr-pot');// place to print gdpr fields
		//console.log( self.$GDPR_pot.closest('.myFormContainer').length );
		self.$formWrap = self.$GDPR_pot.closest('.myFormContainer').length ?
			self.$GDPR_pot.closest('.myFormContainer') :// new product page
			self.$GDPR_pot.closest('.ivecoForm') ;// other pages
		self.GDPR_url = self.$formWrap.find('input[name="hdn_GDPR_url"]').val();
		self.GDPR_app = self.$formWrap.find('input[name="hdn_GDPR_app"]').val();
		self.GDPR_app_module = self.$formWrap.find('input[name="hdn_GDPR_app_module"]').val();
		self.GDPR_lang = self.$formWrap.find('input[name="hdn_GDPR_lang"]').val();
		
	};
	
	_ajaxCall = function(){
		_getGDPRFormAsync(self.GDPR_url, self.GDPR_app, self.GDPR_app_module, self.GDPR_lang, _printResponse);
		/* 
		self.ajaxGet = $.ajax({
			async: true,
			cache: false,
			type: 'GET',
			url: self.GDPR_url,
			data: {
				'app': self.GDPR_app,
				'app_module': self.GDPR_app_module,
				'lang': self.GDPR_lang
			},
			dataType: 'json'
		})
		.done( _printResponse )
		.fail(function() {
			console.log('ajax error');
		})
		.always(function() {
			//console.log( "complete" );
			$.fancybox.hideLoading();
			//$.fancybox.helpers.overlay.close();
		});
		 */
	};
	
	_isIE = function () {
	  var myNav = navigator.userAgent.toLowerCase();
	  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	}
	
	_getGDPRFormAsync = function(form_url, app, app_module, lang, callBack) {
		try
		{
			var xhr = null;
			if(_isIE() == 9 || _isIE() == 8){
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			else{
				xhr = window.XMLHttpRequest ? new window.XMLHttpRequest: new ActiveXObject("Microsoft.XMLHTTP");
				xhr.ontimeout = function(e){callBack(false,"");};
			}
			
			if(xhr!= null){
				xhr.open("GET",form_url, true); 
				xhr.setRequestHeader("app", app);
				xhr.setRequestHeader("app_module", app_module);
				xhr.setRequestHeader("lang",lang);
				xhr.setRequestHeader("Accept","application/json");
				xhr.onreadystatechange = function(e) { 
					var success= xhr.readyState == 4 && xhr.status == 200;
					callBack(success, success? xhr.responseText: "");
				};
				//xhr.ontimeout = function(e){callBack(false,"");};
				xhr.send();
			}
			else{ return callBack(false,""); }
		}
		catch(e){ return callBack(false,""); }
	}
	
	_printResponse = function(success, response){
		
		if(!success){
			return;
		}
		response = JSON.parse(response);
		self.GDPR_version = response.version;
		self.$formWrap.find('input[name="hdn_GDPR_version"]').val( self.GDPR_version );
		
		self.html = '';
		self.html += '<div class="content-gdpr">';
		self.html	+= '	<div class="content-gdpr__title">'+ response.title +'</div>';
		self.html	+= '	<div class="content-gdpr__description">'+ response.description +'</div>';
		self.html	+= '	<ul class="content-gdpr__policylist">';
		
		$.each( response.policies, function(index, obj){
			switch (obj.type){
				
				case 'checkbox':
					self.html	+= '<li class="content-gdpr__policyitem content-gdpr__policyitem--checkbox">';
					self.html	+= '	<div class="checkbox form-gdpr">';
					self.html	+= '		<label>';
					self.html	+= '			<input type="checkbox" data-id="'+ obj.id +'" data-required="'+ obj.required +'" name="'+ obj.name +'" />';
					self.html	+= '			<span>'+ obj.description +'</span>';
					self.html	+= '		</label>';
					self.html	+= '	</div>';
					self.html	+= '</li>';
					break;
					
				case 'radio':
					self.html	+= '<li class="content-gdpr__policyitem content-gdpr__policyitem--radio row">';
					self.html	+= '	<div class="content-gdpr__policytext">';
					self.html	+= '		<div class="content-gdpr__policytitle">'+ obj.title +'</div>';
					self.html	+= '		<div class="content-gdpr__policydescription js-content-gdpr__policydescription">'+ obj.description +'</div>';
					self.html	+= '	</div>';
					self.html	+= '	<div class="content-gdpr__policyinput">';
					self.html	+= '		<label class="radio-inline form-gdpr">';
					self.html	+= '			<input type="radio" data-id="'+ obj.id +'" data-required="'+ obj.required +'" name="'+ obj.name +'" value="true" />';
					self.html	+= '			<span>'+ obj.accept_label +'</span>';
					self.html	+= '		</label>';
					self.html	+= '		<label class="radio-inline form-gdpr">';
					self.html	+= '			<input type="radio" data-id="'+ obj.id +'" name="'+ obj.name +'" value="false" />';
					self.html	+= '			<span>'+ obj.deny_label +'</span>';
					self.html	+= '		</label>';
					self.html	+= '	</div>';
					self.html	+= '</li>';
					break;
					
				default:
					console.log('neither radio nor checkbox');
			}
		});
		
		self.html	+= '	</ul>';
		self.html	+= '</div>';
		self.$GDPR_pot.html( self.html );
		formValidation();
		
		_handleToggle();
		
	};
	
	_handleToggle = function(){
		
		$('.js-content-gdpr__policydescription').each(function(index, value){
			
			var $this = $(this),
				text = $this.text(),
				delimiter = ' ',
				occurrence = 15,
				visibleTokens = text.split(delimiter).slice(0, occurrence),
				collapsedTokens = text.split(delimiter).slice(occurrence),
				//result = tokens.join(delimiter),// those.that
				visibleText = visibleTokens.join(delimiter),
				collapsedText = collapsedTokens.join(delimiter),
				button = ' <button type="button" class="content-gdpr__toggle" data-toggle="collapse" data-target="#collapseGdpr'+ index +'" aria-expanded="false" aria-controls="collapseGdpr"'+ index +'">+</button>',
				newHtml = '';
			/* 
			console.log( index );
			console.log( text );
			console.info( visibleText );
			console.info( collapsedText );
			 */
			var newHtml = visibleText + button + '<div class="collapse" id="collapseGdpr'+ index +'">'+ collapsedText +'</div>';
			$this.html( newHtml );
			
		});
		
	};
	
	/**
	 * @deprecated
	 * @since gdpr fields are printed in page at docready
	 */
	_validate = function(e){
		e.preventDefault();
		
		var $this = $(this);
		var $currentForm = $this.closest('.overlay-gdpr');
		var $requiredCheckbox = $currentForm.find('[type="checkbox"]').filter('[data-required="true"]');
		var $requiredRadioWrap = $currentForm.find('.overlay-gdpr__policyitem--radio');
		
		//reset
		$currentForm.find('.has-error').removeClass('has-error');
		
		$requiredCheckbox.each(function(){
			var $this = $(this);
			
			if ( $this.filter(':checked').length <= 0 ) {
				$this.closest('.overlay-gdpr__policyitem').addClass('has-error');
			}
			
		});
		
		$requiredRadioWrap.each(function(){
			var $this = $(this);
			var $requiredConsent = $this.find('input[type="radio"]').filter('[data-required="true"]');
			
			// case 1: all radio buttons must be checked, accepting or denying consent.
			if ( $this.find('input[type="radio"]').filter(':checked').length <= 0 ) {
				$this.addClass('has-error');
			}
			
			// case 2: if a radio button is marked as required, user must accept consent (deny is not an option).
			if ( $requiredConsent.length > 0 && $requiredConsent.filter(':checked').length <= 0 ) {
				$requiredConsent.closest('label').addClass('has-error');
			}
			
		});
		
		if ( $currentForm.find('.has-error').length <= 0 ) {
			_populatePolicies( $currentForm );
		}
	
	};
	
	/**
	 * @deprecated
	 * @since gdpr fields are printed in page at docready
	 */
	_populatePolicies = function( $currentForm ){
		
		self.GDPR_policies = '';// reset
		
		$currentForm.find('.overlay-gdpr__policyitem').each(function( index ){
			var $this = $(this);
			var currentId = '';
			var currentVal = '';
			
			if ( index > 0 ) {
				self.GDPR_policies += '|';
			}
			
			//self.GDPR_policies += $(this).val();
			if ( $this.is('.overlay-gdpr__policyitem--checkbox') ) {
				currentId = $this.find('input[type="checkbox"]').attr('data-id');
				currentVal = $this.find('input[type="checkbox"]').is(':checked') ? 'true' : 'false' ;
			}
			
			if ( $this.is('.overlay-gdpr__policyitem--radio') ) {
				currentId = $this.find('input[type="radio"]').attr('data-id');
				currentVal = $this.find('input[type="radio"]').filter(':checked').val();
			}
			
			self.GDPR_policies += currentId +','+ currentVal;
			
		});
		
		//console.log( self.GDPR_policies );
		self.$formWrap.find('input[name="hdn_GDPR_version"]').val( self.GDPR_version );
		self.$formWrap.find('input[name="hdn_GDPR_policies"]').val( self.GDPR_policies );
		
		$.fancybox.close();
		self.callback( self.formWrap, self.arguments );
	};
	
	_installEventHandlers = function(){
		/* 
		$(document).on('click', '.js-overlay-gdpr__btn--cancel', function(e){
			e.preventDefault();
			$.fancybox.close();
		});
		
		$(document).on('click', '.js-overlay-gdpr__btn--submit', _validate);
		*/
	};
	
	_init = function(){
		
		_gatherElements();
		//_installEventHandlers();
		
		if ( self.$GDPR_pot.length ) {
			_ajaxCall();
		}
		
	};
	
	return {
		
		//check: _check,
		init: _init
		
	};
	
})();

/*------------------------------------*\
	$INIT
\*------------------------------------*/

IVECO.local = false;

$(document).ready(function(){
	
	if(typeof local !== 'undefined'){
		
		IVECO.local = true; //variabile che identifica gli statici
		
	}
	
	IVECO.cookiesPolicy.initialize();
	
	IVECO.header.initialize();
	
	IVECO.pageNavigation.initialize();
	
	IVECO.matchBoxesHeight.initialize();
	
	IVECO.boxes.initialize();
	
	IVECO.slider.initialize();
	
	IVECO.overlay.initialize();
	
	//IVECO.smoothScrolling.initialize();
	
	IVECO.technicalSheet.initialize();
	
	IVECO.contactTechnicalSheet.initialize();
	
	IVECO.contactUs.initialize();
	
	IVECO.techDataConfigurator.initialize();
	
	IVECO.readMore.initialize();
	
	IVECO.pressList.initialize();
	
	IVECO.contactFaq.initialize();
	
	IVECO.pagination.initialize();
	
	IVECO.contactSelect.initialize();

	if($('.configuratorPage').length){
		IVECO.configurator.initialize();
	}
	
	if($('.missionConfiguratorPage').length){
		IVECO.missionConfigurator.initialize();
	}

	//IVECO.booking.initialize();
	
	IVECO.photogallery.initialize();
	
	IVECO.history.initialize();
	
	//IVECO.readmore.initialize();
	
	IVECO.Overlay.init();
	
	if ( $('.js-nav-tab-container').length ) {
		
		IVECO.Tabs.init();
		
	}
	
	if ( $('.js-countdown').length ) {
		
		IVECO.Countdown.init();
	}
	
	if ( $('.js-floating-cta').length ) {
		IVECO.FloatingCta.init();
	}
	
	if ( $('.js-nav-bottom').length ) {
		IVECO.NavBottom.init();
	}
	
	IVECO.GDPR.init();
	
});

$(window).resize(function(){
	
	IVECO.header.handleResponsive();
	
	IVECO.boxes.handleResponsive();
	
	IVECO.slider.handleResponsive();
	
});
