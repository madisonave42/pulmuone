// Class


// check calc
var hasCalc = true;
(function() {
  var el = document.createElement('div');
  el.style.cssText = 'width:calc(10px);';

  hasCalc = !!el.style.length;
})();

// main

$(function(){
// set main height
(function() {
	var main = $('.main');
	$(window).on('load resize', function() {
		var th = $(window).height() - 112;
		th = th < 410 ? 410 : th;

		main.css({minHeight: th});


		if (!hasCalc) {
			$('.index-visual').css({height: th - 158});
			$('.popup-content').css({height: $(window).height() - 44});
		}

	});

})();

//toggle gnb
(function() {
	$('.js-tg-gnb').on('click', function(e){
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
			$('#gnb').removeClass('on');
		} else {
			$(this).addClass('on');
			$('#gnb').addClass('on');
		}
		e.preventDefault();
	});
})();

// toggle box
(function(){
	var tgTitles = $('.js-tg-title'),
		tgConts = $('.js-tg-cont');

	tgTitles.on('click', function(e){
		var currentCont = $(this).parents('.toggle-box').find('.js-tg-cont');
		if ($(this).hasClass('on')) {
			tgTitles.removeClass('on');
			currentCont.removeClass('on');
		} else {
			tgTitles.removeClass('on');
			tgConts.removeClass('on');
			$(this).addClass('on');
			currentCont.addClass('on');
		}
		e.preventDefault();
	});

	if (tgTitles.length == 1 && tgConts.length == 1) {
		tgTitles.eq(0).click();
	}
})();

// scroll top
(function() {
	$('.js-btn-top').on('click', function(e){
		$('html').stop().animate({scrollTop: 0}, 300); // for IE, FF
		$('body').stop().animate({scrollTop: 0}, 300); // for Chrome
		e.preventDefault();
	});
})();

});

