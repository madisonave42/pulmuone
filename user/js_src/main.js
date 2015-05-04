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

	/* gnb */
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
})();

// index visual slide
(function() {

})();

// index job slide
(function() {
	$('.js-index-job').slidesjs({
		width: 980,
		height: 265
	});
})();

// index corporation slide
(function() {
	$('.js-index-corp').slidesjs({
		width: 980,
		height: 76,
		pagination: {
      active: false
    }
	});
})();

// index corporation hover
(function() {
	$('.index-corp-item').on({
		mouseenter: function() {
			$(this).addClass('on');
		},
		mouseleave: function() {
			$(this).removeClass('on');
		}
	});
})();

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

});