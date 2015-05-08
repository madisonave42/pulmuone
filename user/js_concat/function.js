// Class

// sidebar
var initSidebar = function(el, gap) {

	el.data('top', el.offset().top - gap);

	return {
		checkScrollTop: function() {
			if ($(window).scrollTop() > el.data('top')) {
				el.addClass('fixed');
			} else {
				el.removeClass('fixed');
			}
		},

		scrollPageTop: function() {
			$('html').stop().animate({scrollTop: 0}, 300); // for IE, FF
			$('body').stop().animate({scrollTop: 0}, 300); // for Chrome
		}
	};

};


// main
// Check UA
if( navigator.userAgent.indexOf('Safari') > 0 ){
	if( navigator.userAgent.indexOf('Chrome') > 0 ){
		$('html').addClass('chrome');
	} else {
		$('html').addClass('Safari');
	}
} else if( navigator.userAgent.indexOf('Firefox') > 0 ){
	$('html').addClass('firefox');
} else if( navigator.userAgent.indexOf('Trident/7.0') > 0 ){
	$('html').addClass('ie11');
} else if( navigator.userAgent.indexOf('MSIE 10.0') > 0 ){
	$('html').addClass('ie10');
} else if( navigator.userAgent.indexOf('MSIE 9.0') > 0 ){
	$('html').addClass('ie9');
} else if( navigator.userAgent.indexOf('MSIE 8.0') > 0 ){
	$('html').addClass('ie8');
}

$(function(){

	// gnb
	(function () {
		var gnb = $('.gnb'),
			menus = $('.js-gnb'),
			menuOut = $('.js-gnb-out'),
			current = 0;

		function enterAction() {
			var num = menus.index(menus.filter('.on'));
			if (num > -1) {
				current = num;
			}
			menus.removeClass('on');
		}

		function leaveAction() {
			menus.removeClass('on');
			menus.removeClass('over');
			menus.eq(current).addClass('on');
		}

		gnb.on({
			mouseenter: enterAction,
			mouseleave: leaveAction
		});

		menus.on({
			'mouseenter': function() {
				menus.removeClass('over');
				$(this).addClass('over');
			},
			'focus': function() {
				enterAction();
				menus.removeClass('over');
				$(this).addClass('over');
			}
		});

		menuOut.on('focus', function() {
			leaveAction();
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
		tgTitles.eq(0).remove();
	}
})();

// index visual slide
(function() {

})();

// index job slide
(function() {
	if ($('.js-index-job').children().length > 1) {
		$('.js-index-job').slidesjs({
			width: 980,
			height: 265
		});
	}
})();

// index corporation slide
(function() {
	if ($('.js-index-corp').children().length > 1) {
		$('.js-index-corp').slidesjs({
			width: 980,
			height: 76,
			pagination: {
	      active: false
	    }
		});
	}
})();

// index corporation hover
// (function() {
// 	$('.index-corp-item').on({
// 		mouseenter: function() {
// 			$(this).addClass('on');
// 		},
// 		mouseleave: function() {
// 			$(this).removeClass('on');
// 		}
// 	});
// })();

// sidebar
(function() {
	var sidebar = $('.sidebar'),
		btnTop = $('.sidebar-top');

	if ($('.index-content').length > 0) {
		sidebar.addClass('index-sidebar');
	}

	var sidebarAction = initSidebar(sidebar, 50); // 브라우저 최상단과의 차이

	$(window).on('scroll', sidebarAction.checkScrollTop);

	btnTop.on('click',function (e) {
		sidebarAction.scrollPageTop();
		e.preventDefault();
	});

})();

// tab
(function(){
	var tabBtns = $('.js-tab-link'),
		tabCont = $('.js-tab-cont');

	if (tabBtns.length == 0) {
		return false;
	}

	tabBtns.each(function(){
		$(this).data('target', $(this).attr('href'));
	});

	tabBtns.on('click', function(e){
		tabBtns.removeClass('on');
		tabCont.removeClass('on');

		$(this).addClass('on');
		$($(this).data('target')).addClass('on');

		e.preventDefault();
	});

})();

// 한눈에보는 풀무원
(function() {
	if ($('.js-intro-brand').children().length > 1) {
		$('.js-intro-brand').slidesjs({
			width: 1140,
			height: 195
		});
	}
})();

});