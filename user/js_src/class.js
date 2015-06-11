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