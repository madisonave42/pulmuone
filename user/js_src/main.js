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
			current = -1,
			menuSub = $('.gnb-sub-wrap');

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
			if (current !== -1) {
				menus.eq(current).addClass('on');
			}
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
				menuSub.removeClass('on');
				$(this).next('.gnb-sub-wrap').addClass('on');
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

// set value file type input
(function() {
	var input = $('.file-input'),
		defaultText = input.attr('placeholder') || '';

	$('<span tabindex="-1" class="file-input-value">'+ defaultText +'</span>').insertBefore(input);

	input.on('change', function() {
		var val = $(this).val();
		$(this).parents('.file-wrap').find('.file-input-value').text(val);
	});

})();

// index visual slide
(function() {
	if ($('.js-index-visual').children().length > 1) {
		$('.js-index-visual').slidesjs({
			width: 1920,
			height: 940,
			play: {
	      active: true,
	      effect: "fade",
	      interval: 5000,
	      auto: true,
	      swap: true,
	      pauseOnHover: true,
	      restartDelay: 1000
	    },
			callback: {
				start: function(number) {
	       	$('.slidesjs-slide').removeClass('fixed');
       	},
	       complete: function(number) {
	         $('.main-visual-slide0' + number).addClass('fixed');
	      }
	    },
	    effect: {
	      fade: {
	        speed: 500,
	        crossfade: true
	      }
	    },
	    navigation: {
	      active: false
	    },
	     pagination: {
	      effect: "fade"
	    }
		});
	}
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

// 레이어팝업 포커스이동
(function() {
  $('.js-focus-popup').click(function(){
    var self = $(this),
    	target = $('#' + $(this).attr('data-href'));

    target.attr('tabindex', '0').focus();

    target.find('input:not(:hidden), textarea, select').eq(0).on('keydown', function(e) {
    	if(e.shiftKey && e.which == 9) {
				target.find('.popup-close').focus();
				e.preventDefault();
			}
    });

    target.find('.popup-close').on({
    	'click': function() {
      	self.focus();
    	},
    	'keydown': function(e) {
			  if(e.which == 9 && !e.shiftKey) {
			    $(this).parents('.popup').focus();
			    e.preventDefault();
			  }
			}
		});

  });
})();

// 페이지 로딩시 열려있는 레이어팝업 포커스이동
(function() {
	var isOpenPopup = $('.popup:visible');

	if (isOpenPopup.length > 0) {

    isOpenPopup.attr('tabindex', '0').focus();

    isOpenPopup.on('keydown', function(e) {
    	if(e.shiftKey && e.which == 9) {
				isOpenPopup.find('.popup-close').focus();
				e.preventDefault();
			}
    });

    isOpenPopup.find('.popup-close').on('keydown', function(e) {
		  if(e.which == 9 && !e.shiftKey) {
		    $(this).parents('.popup').focus();
		    e.preventDefault();
		  }
		});

	}

})();

// 입력내용 추가시 추가된 테이블로 포커스 이동
(function() {
	$('.js-btn-add-data').on('click', function() {
		var self = $(this);
		setTimeout(function() {
			var addedTable = self.parents('.row').find('table:visible').last();
			addedTable.find('input:not(:hidden), textarea, select').eq(0).focus();
		}, 500);
	});
})();

// Focus in password input
(function() {
	$('.placeholder-ln-ko, .placeholder-fn-ko, .placeholder-ln-en, .placeholder-fn-en').data('focus', 'false').on({
		focusin: function() {
			$(this).data('focus', 'true').addClass('focus');
		},

		focusout: function() {
			if( $(this).val().length > 0 ) {
				return false;
			} else {
				$(this).data('focus', 'false').removeClass('focus');
			}
		}
	}).trigger('focusin').trigger('focusout'); // 페이지 로딩시 값이 있을경우를 대비
})();

// 푸터 가족사이트 리스트 토글
(function() {
	var fList = $('.footer-family-list'),
		fBtn = $('.js-family-open');

	var openFamily = function() {
		fList.addClass('on');
		fBtn.addClass('on');
	};

	var closeFamily = function() {
		fList.removeClass('on');
		fBtn.removeClass('on');
	};

	fBtn.on('click', function() {
		if ($(this).hasClass('on')) {
			closeFamily();
		} else {
			openFamily();
		}
	});

	fList.on('mouseleave', function() {
		closeFamily();
	});

	fList.find('a').first().on('keydown', function(e) {
		if(e.shiftKey && e.which == 9) {
			closeFamily();
			e.preventDefault();
		}
	});
	fList.find('a').last().on('keydown', function(e) {
		if(e.which == 9 && !e.shiftKey) {
			closeFamily();
	    e.preventDefault();
	  }
	});
})();

});