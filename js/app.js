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
    plotDonutChart($('#donut1'), 77);
    plotDonutChart($('#donut2'), 62);
    plotDonutChart($('#donut3'), 50);
    plotDonutChart($('#donut4'), 80);
});

function plotDonutChart(container, percentage) {
    if ($(container).length) {
        var col = '#224466',            // Set the chart's color.
            wid = $(container).width(),
            hei = $(container).height(),
            min = Math.min(wid, hei),
            siz = (0.018 * min) + 'em', // The decimal adjusts the font size.
            rad = 0.77 * (min / 2),     // The decimal adjusts the thickness.
            svg = null;

        svg = d3.select($(container)[0])
            .append('svg')
            .attr('width', wid)
            .attr('height', hei)
            .append('g')
            .attr('transform', 'translate(' + wid / 2 + ',' + hei / 2 + ')');

        svg.selectAll()
            .data(d3.layout.pie().sort(null)([percentage, 100 - percentage]))
            .enter()
            .append('path')
            .attr('d', d3.svg.arc().outerRadius(min/2 - 2).innerRadius(rad))
            .style('stroke', col)
            .style('fill', function(d, i) { return [col, 'transparent'][i]; });

        svg.append("text")
            .attr("dy", ".3em")
            .text(percentage + '%')
            .style("fill", col)
            .style("font-size", siz)
            .style("text-anchor", "middle");

        return svg;
    }
}
