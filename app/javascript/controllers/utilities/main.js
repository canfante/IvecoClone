var iveco = {
  sel : {
    homepage : '[data-page="homepage]'
  },
  isMobile : function() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth) < 1024;
  },
  googleAPI : 'AIzaSyCzD5PAwIWltJEmYsG3kUOHyXcePUfXM1o'
};

var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

window.onresize = function(event) {
  iveco.isMobile = function() {
      return Math.max(document.documentElement.clientWidth, window.innerWidth) < 1024;
  }
};
(function ie11HtmlClass($){
  if(isIE11) {
    $('html').addClass('ie11');
  }
}(jQuery));

(function heroSlider($){
  
  var heroSlider_sel = '.hero_slider';
  var heroSlider_arrow_sel = '.slider-arrow';
  var heroSlider_pages_sel = '.slider-pages';
  var time = 4;
  var $bar, $slick, isPause, tick, percentTime;

  function setHeroSliderHeight() {
    $slick.find('.slide').each(function(i,el){
      var height = $(window).outerHeight() - $('header.main-header').outerHeight() + "px";
      el.style.minHeight = height;
      el.style.height = height;
      el.querySelector('.slide-image').style.minHeight = height;
      el.querySelector('.slide-image').style.height = height;
    });
  }

  function initSlick() {
    $slick.slick({
      draggable: true,
      adaptiveHeight: false,
      dots: true,
      mobileFirst: true,
      pauseOnDotsHover: true
    });
  }

  function startProgressbar() {
    resetProgressbar();
    percentTime = 0;
    isPause = false;
    tick = setInterval(interval, 10);
  }

  function interval() {
    if(isPause === false) {
      percentTime += 1 / (time+0.1);
      $bar.css({
        width: percentTime+"%"
      });
      if(percentTime >= 100)
        {
          $slick.slick('slickNext');
          startProgressbar();
        }
    }
  }

  function resetProgressbar() {
    $bar.css({
     width: 0+'%' 
    });
    clearTimeout(tick);
  }
  
  $slick = $(heroSlider_sel + ' .slider_home');

  $slick.on('init', function(slick) {
    if(iveco.isMobile()) {
      $(slick.currentTarget).find('.slide-image').each(function(i,el){
        var width = el.clientWidth;
        $(el.firstElementChild).css('left', width/2);
      });
    } else {
      $(heroSlider_pages_sel).find('[data-page="current"]').html((1).pad(2));
      $(heroSlider_pages_sel).find('[data-page="all"]').html(($(slick.currentTarget).find('.slick-slide').not('.slick-cloned').length).pad(2));
      $(heroSlider_arrow_sel).on('click','.icon', function(ev) {
        var page = ev.currentTarget.dataset.page;
        $slick.slick(page);
        startProgressbar();
      });
    }
  });

  $slick.on('afterChange',function(slick, currentSlide) {
    $(heroSlider_sel).find('.slide .slide-content--title').removeClass('active');
    $(currentSlide.$slides).filter('.slick-active').find('.slide-content--title').addClass('active');
    $(heroSlider_pages_sel).find('[data-page="current"]').html((currentSlide.currentSlide+1).pad(2));
  });

  $bar = $(heroSlider_sel + ' .slider-progress .progress');

  $(heroSlider_sel + ' .slider-wrapper').on({
    mouseenter: function() {
      isPause = true;
    },
    mouseleave: function() {
      isPause = false;
    }
  });

  window.onresize = function(event) {
    if($slick.hasClass('slick-initialized')) {
      $slick.slick('destroy');
    }
    setHeroSliderHeight();
    initSlick();
  };

  setHeroSliderHeight();
  initSlick();
  startProgressbar();

}(jQuery));

(function productsTabs($){

  var productContainer_sel = '.product_container';
  var activeProductContainer_sel = '.product_container.active';
  var productFilter_sel = '.product_filters';
  var pager_sel = '.slider-pager';
  var $slick;

  function initProductsActions() {
    $(productContainer_sel).find('.slide-content--actions').each(function(i,el){
      if( $(el).find('.btn').length === 1) {
        $(el).addClass('single');
      } else {
        $(el).addClass('multi');
      }
    });

  }

  function sliderEvents() {

    $slick.on('init', function(slick) {
      $(activeProductContainer_sel).find(pager_sel + ' [data-page="current"]').html((1).pad(2));
      $(activeProductContainer_sel).find(pager_sel + ' [data-page="all"]').html(($(slick.currentTarget).find('.slick-slide').not('.slick-cloned').length).pad(2));
      $(activeProductContainer_sel).on('click','[data-page]',function(ev) {
        var page = ev.currentTarget.dataset.page;
        $slick.slick(page);
      });
    });

    $slick.on('afterChange',function(slick, currentSlide) {
      $(activeProductContainer_sel).find(pager_sel + ' [data-page="current"]').html((currentSlide.currentSlide+1).pad(2));
    });

  }

  function initSlick($sliderProducts) {
    var numSlides = $sliderProducts.find('.slide').length;
    var disableSlickOnDesktop = numSlides < 4;
    var responsiveSettings = [
      {
        breakpoint: 1919,
        settings: {
          slidesToShow: disableSlickOnDesktop ? numSlides : 3,
          slidesToScroll: disableSlickOnDesktop ? 0 : 1,
          centerMode: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: disableSlickOnDesktop ? numSlides : 3,
          slidesToScroll: disableSlickOnDesktop ? 0: 1,
          centerMode: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ];
    if(disableSlickOnDesktop) {
      var cssClass = "";
      switch (numSlides) {
        case 1:
          cssClass = 'one-product';
          break;
        case 2:
          cssClass = 'two-product';
          break;
        case 3:
          cssClass = 'three-product';
          break;
        default:
          break;
      }
      $sliderProducts.addClass(cssClass  + ' no-slick-desk');
      $(activeProductContainer_sel).find(pager_sel).addClass(cssClass  + ' no-slick-desk');
    } 
    sliderEvents($sliderProducts);

    $sliderProducts.slick({
      draggable: true,
      adaptiveHeight: false,
      dots: false,
      mobileFirst: true,
      pauseOnDotsHover: true,
      infinite: true,
      focusOnSelect: true,
      responsive: responsiveSettings
    });
  }

  function destroySlick() {
    if($slick.hasClass('slick-initialized')) {
      $slick.slick('destroy');
    }
  }

  $slick = $(productContainer_sel + '.active .slider_home');

  $(productFilter_sel).on('click','[data-products]',function(ev) {
    var containerToActivate = ev.currentTarget.dataset.products;
    $(productFilter_sel).find('.active').removeClass('active');
    $(productContainer_sel).filter('.active').removeClass('active');
    destroySlick();
    ev.currentTarget.classList.add('active');
    $(productContainer_sel).filter('[data-products="'+containerToActivate+'"]').addClass('active');
    $slick = $(productContainer_sel + '.active .slider_home');
    initSlick($slick);
  });

  initProductsActions();
  initSlick($slick);


}(jQuery));

(function promo($){
  var promoSlider_sel = '.promo-slider';
  var pager_sel = '.slider-pager';
  var $slick;

  function sliderEvents() {

    $slick.on('init', function(slick) {
      $(promoSlider_sel).find(pager_sel + ' [data-page="current"]').html((1).pad(2));
      $(promoSlider_sel).find(pager_sel + ' [data-page="all"]').html(($(slick.currentTarget).find('.slick-slide').not('.slick-cloned').length).pad(2));
      $(promoSlider_sel).on('click','[data-page]',function(ev) {
        var page = ev.currentTarget.dataset.page;
        $slick.slick(page);
      });
    });

    $slick.on('afterChange',function(slick, currentSlide){
      $(promoSlider_sel).find(pager_sel + ' [data-page="current"]').html((currentSlide.currentSlide+1).pad(2));
    });

  }

  function initSlick($sliderProducts) {
    sliderEvents($sliderProducts);
    $sliderProducts.slick({
      draggable: true,
      adaptiveHeight: false,
      dots: false,
      mobileFirst: true,
      infinite: true,
      autoplay: true
    });
  }

  $slick = $(promoSlider_sel + ' .slider_home');
  initSlick($slick);

}(jQuery));



(function info($){
  var info_sel = '.info .slider_home';
  var arrow_sel = '.info .slider-arrow';
  var $slick;

  function sliderEvents() {

    $slick.on('init', function(slick) {
      $(arrow_sel).on('click','[data-page]',function(ev) {
        var page = ev.currentTarget.dataset.page;
        $slick.slick(page);
      });
    });

  }

  function initSlick($sliderProducts) {
    sliderEvents($sliderProducts);
    $sliderProducts.slick({
      draggable: true,
      adaptiveHeight: false,
      dots: true,
      mobileFirst: true,
      infinite: true,
      autoplay: true
    });
  }

  $slick = $(info_sel);
  initSlick($slick);

}(jQuery));

(function fixedHeader($){
  var stickyOffset = $('[data-page="homepage"]').offset().top;
  var $header = $('header.main-header');

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    scroll >= stickyOffset ? $header.addClass('fixed') : $header.removeClass('fixed');
  });

  $(window).on('resize', function() {
    stickyOffset = $('[data-page="homepage"]').offset().top;
  });

}(jQuery));

(function findStore($){

  var input = document.getElementById('autocompleteAddress');
  if(typeof(google) !== 'undefined') {
    var autocomplete = new google.maps.places.Autocomplete(input);
  }
  
}(jQuery));
