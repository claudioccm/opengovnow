$(document).foundation();

$(document).ready(function() {
	var totalHeight = $('html').css('height');
	// $('.m-menu').css('height', totalHeight);
	// console.log(totalHeight);

	// Triggers the menu
	$('.m-menu-trigger').click(function(){
		$('.m-menu').addClass('s-active');
		$('.row').addClass('s-active');
		$('.m-fixed-menu').addClass('s-active');
		$('#overlay').show();
	});

	// Triggers the Overlay
	$('#overlay').click(function() {
		$('.m-menu').removeClass('s-active');
		$('.row').removeClass('s-active');
		$('.m-fixed-menu').removeClass('s-active');
		$('#overlay').hide();
	});

	// Hides Overlay, and offset menu when menu item is clicked
	$('.m-menu nav a').click(function(){
		$('.m-menu').removeClass('s-active');
		$('.row').removeClass('s-active');
		$('.m-menu-trigger').removeClass('s-active');
		$('#overlay').hide();
	});

    $('.play-pause').click(function() {

        var state = $(this).attr('class');

        if (state === 'play-pause') {
            $(this).addClass('s-active');
            $(this).children().attr('class', 'icon-pause-1');    
        } else {
            $(this).removeClass('s-active');
            $(this).children().attr('class', 'icon-play');    
        }

        
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

	
    $('#m-ticker.inview').bind('inview', function(event, visible) {
        if (visible == true) {
            $('.timer').countTo({
                from: 45000,
                to: 54765,
                speed: 700000,
                refreshInterval: 40,
                onComplete: function(value) {
                    console.debug(this);
                }
            });
         }
    });

    // Loads the Map
	$(function(){
	  $("#map-container").load("images/map.svg");
	});
 

    // Switcher Functions
 
     $('#c-open-closed-gov.inview').bind('inview', function(event, visible) {
        if (visible == true) {
            $('#c-open-closed-gov').imageReveal({
                barWidth: 6,
                touchBarWidth: 40,
                paddingLeft: 0,
                paddingRight: 0,
                showCaption: false,
                startPosition: 0.5,
                captionChange: 0.5,
                width: 800,
                height: 600
            });
        }
    });

    // =======
//     $(window).load(function() {
//         $('#c-open-closed-gov').imageReveal({
//             barWidth: 6,
//             touchBarWidth: 40,
//             paddingLeft: 0,
//             paddingRight: 0,
//             showCaption: false,
//             startPosition: 0.5,
//             captionChange: 0.5,
//             width: 800,
//             height: 600
//         });
// >>>>>>> Stashed changes

    // Calling Donut Chart in Index2.html
    plotDonutChart($('#nuggets-1'), 80);
    plotDonutChart($('#nuggets-2'), 82);
    plotDonutChart($('#nuggets-3'), 83);

    // Adding class countr

    // Test pie charts.
    plotDonutChart($('#donut1'), 77);
    plotDonutChart($('#donut2'), 62);
    plotDonutChart($('#donut3'), 50);
    plotDonutChart($('#donut4'), 20);
    plotDonutChart($('#donut5'), 20);
    plotDonutChart($('#donut6'), 20);
    plotDonutChart($('#donut7'), 20);
    plotDonutChart($('#donut8'), 20);
    plotDonutChart($('#donut9'), 20);

    // Must be called after all the D3 charts were plotted, otherwise, they
    // won't be animated.
    animateSVGs();
});

function plotDonutChart(container, percentage) {
    if ($(container).length) {
        var col = '#224466',               // Set the chart's color.
            col2 = 'rgba(255, 105, 0, 1)', // Set the chart's color.
            wid = $(container).width(),
            hei = $(container).height(),
            rad = Math.min(wid, hei) / 2,
            inn = 0.85 * rad,             // The decimal adjusts the thickness.
            siz = (0.036 * rad) + 'em',   // The decimal adjusts the font size.
            end = 2 * Math.PI * (percentage / 100),
            arc = d3.svg.arc().innerRadius(inn).outerRadius(rad - 2),
            svg = null;

        svg = d3.select($(container)[0])
            .append('svg').attr({'width': '100%', 'height': '100%'})
            .attr('viewBox', '0 0 ' + wid + ' ' + hei)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .append('g')
            .attr('transform', 'translate(' + wid / 2 + ',' + hei / 2 + ')');

        svg.append('path')
            .attr('class', 'meter')
            .attr('d', arc.startAngle(0).endAngle(end))
            .style({'fill': col2, 'stroke': 'transparent'});

        svg.append('path')
            .attr('d', arc.startAngle(0).endAngle(2 * Math.PI))
            .style({'fill': 'transparent', 'stroke': col});

        svg.append('text')
            .attr('dy', '.3em')
            .attr('class', 'pie-chart-text')
            .text(percentage + '%')
            .style({'fill': col, 'font-size': siz, 'text-anchor': 'middle'});

        $(container).find('.meter').data('inner', inn);
        $(container).find('.meter').data('outer', rad - 2);
        $(container).find('.meter').data('endangle', end);
    }
}

function addClassToCountries(svg, countries, cls) {
    countries.forEach(function(country) {
        var elem = $(svg).find('#' + country);

        if ($(elem).length && !elem[0].classList.contains(cls)) {
            elem[0].classList.add(cls);
        }
    });
}

function addClassToAllCountries(svg, cls) {
    $(svg).children('path, g').each(function() { this.classList.add(cls); });
}

 $(function() {
 

    $('#OGDef-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
             document.getElementById('OGDef').play();
          
         } else {
             // element has gone out of viewport
             document.getElementById('OGDef').pause();
         }
     });


     $('#ellen-miller-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
             document.getElementById('ellen-miller').play();
            document.getElementById('OGDef').pause();
          
         } else {
             // element has gone out of viewport
             document.getElementById('ellen-miller').pause();
         }
     });
     $('#chris-underwood-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
             document.getElementById('chris-underwood').play();
         } else {
             // element has gone out of viewport
             document.getElementById('chris-underwood').pause();
         }
     });
     
     $('#florencio-abad-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
             document.getElementById('florencio-abad').play();
             document.getElementById('chris-underwood').pause();
         } else {
             // element has gone out of viewport
             document.getElementById('florencio-abad').pause();
         }
     });

    $('#stella-dawson-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
             document.getElementById('stella-dawson').play();
         } else {
             // element has gone out of viewport
             document.getElementById('stella-dawson').pause();
         }
     });

    

     $('#ellen-miller-2-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('ellen-miller-2').play();
            document.getElementById('stella-dawson').pause();
         } else {
             // element has gone out of viewport
             document.getElementById('ellen-miller-2').pause();
         }
     });

      $('#mexico-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('mexico').play();
            console.log("hey mexi");
             
         } else {
             // element has gone out of viewport
             document.getElementById('mexico').pause();
         }
     });

     $('#felipe-estephan-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('felipe-estephan').play();
         } else {
             // element has gone out of viewport
             document.getElementById('felipe-estephan').pause();
         }
     });

     $('#eric-meerkamper-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('eric-meerkamper').play();
         } else {
             // element has gone out of viewport
             document.getElementById('eric-meerkamper').pause();
         }
     });


      $('#robert-hunja-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('robert-hunja').play();
            document.getElementById('eric-meerkamper').pause();
         } else {
             // element has gone out of viewport
             document.getElementById('robert-hunja').pause();
         }
     });

    $('#chris-underwood-2-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('chris-underwood-2').play();
         } else {
             // element has gone out of viewport
             document.getElementById('chris-underwood-2').pause();
         }
     });

    $('#beauty-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('beauty').play();
             document.getElementById('chris-underwood-2').pause();
         } else {
             // element has gone out of viewport
             document.getElementById('beauty').pause();
         }
     });

    $('#florencio-abad-2-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('florencio-abad-2').play();
         } else {
             // element has gone out of viewport
             document.getElementById('florencio-abad-2').pause();
         }
     });

    $('#stella-dawson-2-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('stella-dawson-2').play();
            document.getElementById('florencio-abad-2').pause();
         } else {
             // element has gone out of viewport
             document.getElementById('stella-dawson-2').pause();
         }
     });



 });

