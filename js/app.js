$(document).foundation();

$(document).ready(function() {

	var totalHeight = $('html').css('height');
	// $('.m-menu').css('height', totalHeight);
	// console.log(totalHeight);

	// Triggers the menu
	$('.m-menu-trigger').click(function(){
		$('.m-menu').addClass('s-active');
		$('.row').addClass('s-active');
		$(this).addClass('s-active');
		$('#overlay').show();
	});

	// Triggers the Overlay
	$('#overlay').click(function() {
		$('.m-menu').removeClass('s-active');
		$('.row').removeClass('s-active');
		$('.m-menu-trigger').removeClass('s-active');
		$('#overlay').hide();
	});

	// Hides Overlay, and offset menu when menu item is clicked
	$('.m-menu nav a').click(function(){
		$('.m-menu').removeClass('s-active');
		$('.row').removeClass('s-active');
		$('.m-menu-trigger').removeClass('s-active');
		$('#overlay').hide();
	});

	// Smooth Scrolling Function
	$(function() {
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
				|| location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
				  scrollTop: target.offset().top
				}, 1000);
				return false;
				}
			}
		});
	});

	// Word Cloud Functions

	$('.wordcloud-item').hover(
		function () {
			var e = $(this).attr('class').slice(15);
			console.log(e);
			$(this).siblings('.' + e).addClass('hovered');
		}, function () {
			var e = $(this).attr('class').slice(15);
			$(this).siblings('.' + e).removeClass('hovered');

		}
	);

	// Counter

	(function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
    };
	})(jQuery);

	jQuery(function($) {
        $('.timer').countTo({
            from: 0,
            to: 54765,
            speed: 10000,
            refreshInterval: 1,
            onComplete: function(value) {
                console.debug(this);
            }
        });
    });

    // Loads the Map
	$(function(){
	  $("#map-container").load("images/map.svg");
	});

	// Switcher Functions

	$('.m-switcher-handle').click(function() {
		$('.m-switcher').toggleClass('active');
	});

    // Test pie charts.
    drawPieChart($('#pie1'), 23, 77);
    drawPieChart($('#pie2'), 38, 62);
    drawPieChart($('#pie3'), 50, 50);
    drawPieChart($('#pie4'), 20, 80);
});

function drawPieChart (container, min, max) {
    var w = $(container).width(),
        h = $(container).height(),
        colors = ['#246', '#fff'];

    var svg = d3.select($(container)[0])
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .append('g')
        .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');

    var g = svg.selectAll('.arc')
        .data(d3.layout.pie().sort(null)([max, min]))
        .enter()
        .append('g')
        .attr('class', 'arc');

    g.append('path')
        .style('fill', function(d, i) { return colors[i]; } )
        .attr('d', d3.svg.arc().outerRadius((Math.min(w, h) / 2) - 2));

    $(container).find('svg').addClass('m-pie-chart');

    return svg;
}
