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
	  $("#map-container").load("graphs/map.svg");
	});

    // Loads the Two-way-communication Graph
    // $(function(){
    //   $("#infographic-two-way-communication").load("graphs/two-way-graph.svg");
    // });

    // Loads the 3 icons graphs
    $(function(){ $("#faucet-graph").load("graphs/faucet.svg"); });
    $(function(){ $("#road-graph").load("graphs/road.svg"); });
    $(function(){ $("#school-graph").load("graphs/school.svg"); });
 

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


// Functions for Video Controllers

 $(function() {
 
    $('#OGDef-container.inview').bind('inview', function(event, visible) {
        
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('OGDef').play();
            $('#OGDef-controls.play-pause').addClass('s-active');
            $('#OGDef-controls.play-pause').children().attr('class', 'icon-pause-1'); 
              
          
         } else {
             // element has gone out of viewport
            document.getElementById('OGDef').pause();
            $('#OGDef-controls.play-pause').removeClass('s-active');
            $('#OGDef-controls.play-pause').children().attr('class', 'icon-play'); 

             
         }

     });

     $('#OGDef-controls.play-pause').click(function() {

        var state = $('#OGDef-controls.play-pause').attr('class');
        if (state === 'play-pause') {
            $('#OGDef-controls.play-pause').removeClass('s-active');
            $('#OGDef-controls.play-pause').children().attr('class', 'icon-play');   
            document.getElementById('OGDef').pause(); 
        } else {
            $('#OGDef-controls.play-pause').addClass('s-active');
            $('#OGDef-controls.play-pause').children().attr('class', 'icon-pause-1');
             document.getElementById('OGDef').play();   
        }
    });


     $('#ellen-miller-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('ellen-miller').play();
            document.getElementById('OGDef').pause();
            $('#ellen-miller-controls.play-pause').addClass('s-active');
            $('#ellen-miller-controls.play-pause').children().attr('class', 'icon-pause-1'); 
          
         } else {
             // element has gone out of viewport
             document.getElementById('ellen-miller').pause();
             $('#ellen-miller-controls.play-pause').removeClass('s-active');
             $('#ellen-miller-controls.play-pause').children().attr('class', 'icon-play'); 
         }
     });

     $('#ellen-miller-controls.play-pause').click(function() {

        var state = $('#ellen-miller-controls.play-pause').attr('class');
        if (state === 'play-pause') {
            $('#ellen-miller-controls.play-pause').removeClass('s-active');
            $('#ellen-miller-controls.play-pause').children().attr('class', 'icon-play');   
            document.getElementById('ellen-miller').pause(); 
        } else {
            $('#ellen-miller-controls.play-pause').addClass('s-active');
            $('#ellen-miller-controls.play-pause').children().attr('class', 'icon-pause-1');
             document.getElementById('ellen-miller').play();   
        }
    });

     $('#chris-underwood-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
             document.getElementById('chris-underwood').play();
             $('#chris-underwood-controls.play-pause').addClass('s-active');
             $('#chris-underwood-controls.play-pause').children().attr('class', 'icon-pause-1'); 
         } else {
             // element has gone out of viewport
             document.getElementById('chris-underwood').pause();
             $('#chris-underwood-controls.play-pause').removeClass('s-active');
             $('#chris-underwood-controls.play-pause').children().attr('class', 'icon-play'); 
         }
     });

      $('#chris-underwood-controls.play-pause').click(function() {

        var state = $('#chris-underwood-controls.play-pause').attr('class');
        if (state === 'play-pause') {
            $('#chris-underwood-controls.play-pause').removeClass('s-active');
            $('#chris-underwood-controls.play-pause').children().attr('class', 'icon-play');   
            document.getElementById('chris-underwood').pause(); 
        } else {
            $('#chris-underwood-controls.play-pause').addClass('s-active');
            $('#chris-underwood-controls.play-pause').children().attr('class', 'icon-pause-1');
             document.getElementById('chris-underwood').play();   
        }
    });

     
     $('#florencio-abad-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
             document.getElementById('florencio-abad').play();
             document.getElementById('chris-underwood').pause();
             $('#florencio-abad-controls.play-pause').addClass('s-active');
             $('#florencio-abad-controls.play-pause').children().attr('class', 'icon-pause-1'); 
         } else {
             // element has gone out of viewport
             document.getElementById('florencio-abad').pause();
             $('#florencio-abad-controls.play-pause').removeClass('s-active');
             $('#florencio-abad-controls.play-pause').children().attr('class', 'icon-play'); 
         }
     });

      $('#florencio-abad-controls.play-pause').click(function() {

        var state = $('#florencio-abad-controls.play-pause').attr('class');
        if (state === 'play-pause') {
            $('#florencio-abad-controls.play-pause').removeClass('s-active');
            $('#florencio-abad-controls.play-pause').children().attr('class', 'icon-play');   
            document.getElementById('florencio-abad').pause(); 
        } else {
            $('#florencio-abad-controls.play-pause').addClass('s-active');
            $('#florencio-abad-controls.play-pause').children().attr('class', 'icon-pause-1');
             document.getElementById('florencio-abad').play();   
        }
    });


    $('#stella-dawson-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
             document.getElementById('stella-dawson').play();
                $('#stella-dawson-controls.play-pause').addClass('s-active');
            $('#stella-dawson-controls.play-pause').children().attr('class', 'icon-pause-1'); 
         } else {
             // element has gone out of viewport
             document.getElementById('stella-dawson').pause();
               $('#stella-dawson-controls.play-pause').removeClass('s-active');
            $('#stella-dawson-controls.play-pause').children().attr('class', 'icon-play'); 
         }
     });

    
    $('#stella-dawson-controls.play-pause').click(function() {

        var state = $('#stella-dawson-controls.play-pause').attr('class');
        if (state === 'play-pause') {
            $('#stella-dawson-controls.play-pause').removeClass('s-active');
            $('#stella-dawson-controls.play-pause').children().attr('class', 'icon-play');   
            document.getElementById('stella-dawson').pause(); 
        } else {
            $('#stella-dawson-controls.play-pause').addClass('s-active');
            $('#stella-dawson-controls.play-pause').children().attr('class', 'icon-pause-1');
             document.getElementById('stella-dawson').play();   
        }
    });

     $('#ellen-miller-2-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('ellen-miller-2').play();
            document.getElementById('stella-dawson').pause();
               $('#ellen-miller-2-controls.play-pause').addClass('s-active');
            $('#ellen-miller-2-controls.play-pause').children().attr('class', 'icon-pause-1'); 
         } else {
             // element has gone out of viewport
             document.getElementById('ellen-miller-2').pause();
               $('#ellen-miller-2-controls.play-pause').removeClass('s-active');
            $('#ellen-miller-2-controls.play-pause').children().attr('class', 'icon-play'); 
         }
     });

    $('#ellen-miller-2-controls.play-pause').click(function() {

        var state = $('#ellen-miller-2-controls.play-pause').attr('class');
        if (state === 'play-pause') {
            $('#ellen-miller-2-controls.play-pause').removeClass('s-active');
            $('#ellen-miller-2-controls.play-pause').children().attr('class', 'icon-play');   
            document.getElementById('ellen-miller-2').pause(); 
        } else {
            $('#ellen-miller-2-controls.play-pause').addClass('s-active');
            $('#ellen-miller-2-controls.play-pause').children().attr('class', 'icon-pause-1');
             document.getElementById('ellen-miller-2').play();   
        }
    });


      $('#mexico-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('mexico').play(); 
         } else {
             // element has gone out of viewport
             document.getElementById('mexico').pause();
         }
     });

    

     $('#felipe-estephan-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('felipe-estephan').play();
            $('#felipe-estephan-controls.play-pause').addClass('s-active');
            $('#felipe-estephan-controls.play-pause').children().attr('class', 'icon-pause-1'); 
         } else {
             // element has gone out of viewport
             document.getElementById('felipe-estephan').pause();
            $('#felipe-estephan-controls.play-pause').removeClass('s-active');
            $('#felipe-estephan-controls.play-pause').children().attr('class', 'icon-play'); 
         }
     });

    $('#felipe-estephan-controls.play-pause').click(function() {

        var state = $('#felipe-estephan-controls.play-pause').attr('class');
        if (state === 'play-pause') {
            $('#felipe-estephan-controls.play-pause').removeClass('s-active');
            $('#felipe-estephan-controls.play-pause').children().attr('class', 'icon-play');   
            document.getElementById('felipe-estephan').pause(); 
        } else {
            $('#felipe-estephan-controls.play-pause').addClass('s-active');
            $('#felipe-estephan-controls.play-pause').children().attr('class', 'icon-pause-1');
             document.getElementById('felipe-estephan').play();   
        }
    });


     $('#eric-meerkamper-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('eric-meerkamper').play();
            $('#eric-meerkamper-controls.play-pause').addClass('s-active');
            $('#eric-meerkamper-controls.play-pause').children().attr('class', 'icon-pause-1'); 
         } else {
             // element has gone out of viewport
             document.getElementById('eric-meerkamper').pause();
            $('#eric-meerkamper-controls.play-pause').removeClass('s-active');
            $('#eric-meerkamper-controls.play-pause').children().attr('class', 'icon-play'); 
         }
     });


    $('#eric-meerkamper-controls.play-pause').click(function() {

        var state = $('#eric-meerkamper-controls.play-pause').attr('class');
        if (state === 'play-pause') {
            $('#eric-meerkamper-controls.play-pause').removeClass('s-active');
            $('#eric-meerkamper-controls.play-pause').children().attr('class', 'icon-play');   
            document.getElementById('eric-meerkamper').pause(); 
        } else {
            $('#eric-meerkamper-controls.play-pause').addClass('s-active');
            $('#eric-meerkamper-controls.play-pause').children().attr('class', 'icon-pause-1');
             document.getElementById('eric-meerkamper').play();   
        }
    });


      $('#robert-hunja-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('robert-hunja').play();
            document.getElementById('eric-meerkamper').pause();
               $('#robert-hunja-controls.play-pause').addClass('s-active');
            $('#robert-hunja-controls.play-pause').children().attr('class', 'icon-pause-1'); 
         } else {
             // element has gone out of viewport
             document.getElementById('robert-hunja').pause();
               $('#robert-hunja-controls.play-pause').removeClass('s-active');
            $('#robert-hunja-controls.play-pause').children().attr('class', 'icon-play'); 
         }
     });

    $('#robert-hunja-controls.play-pause').click(function() {

        var state = $('#robert-hunja-controls.play-pause').attr('class');
        if (state === 'play-pause') {
            $('#robert-hunja-controls.play-pause').removeClass('s-active');
            $('#robert-hunja-controls.play-pause').children().attr('class', 'icon-play');   
            document.getElementById('robert-hunja').pause(); 
        } else {
            $('#robert-hunja-controls.play-pause').addClass('s-active');
            $('#robert-hunja-controls.play-pause').children().attr('class', 'icon-pause-1');
             document.getElementById('robert-hunja').play();   
        }
    });

    $('#chris-underwood-2-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('chris-underwood-2').play();
               $('#chris-underwood-2-controls.play-pause').addClass('s-active');
            $('#chris-underwood-2-controls.play-pause').children().attr('class', 'icon-pause-1'); 
         } else {
             // element has gone out of viewport
             document.getElementById('chris-underwood-2').pause();
               $('#chris-underwood-2-controls.play-pause').removeClass('s-active');
            $('#chris-underwood-2-controls.play-pause').children().attr('class', 'icon-play'); 
         }
     });

     $('#chris-underwood-2-controls.play-pause').click(function() {

        var state = $('#chris-underwood-2-controls.play-pause').attr('class');
        if (state === 'play-pause') {
            $('#chris-underwood-2-controls.play-pause').removeClass('s-active');
            $('#chris-underwood-2-controls.play-pause').children().attr('class', 'icon-play');   
            document.getElementById('chris-underwood-2').pause(); 
        } else {
            $('#chris-underwood-2-controls.play-pause').addClass('s-active');
            $('#chris-underwood-2-controls.play-pause').children().attr('class', 'icon-pause-1');
             document.getElementById('chris-underwood-2').play();   
        }
    });


    $('#beauty-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('beauty').play();
            document.getElementById('chris-underwood-2').pause();
            $('#beauty-controls.play-pause').addClass('s-active');
            $('#beauty-controls.play-pause').children().attr('class', 'icon-pause-1'); 
         } else {
             // element has gone out of viewport
             document.getElementById('beauty').pause();
             $('#beauty-controls.play-pause').removeClass('s-active');
             $('#beauty-controls.play-pause').children().attr('class', 'icon-play'); 
         }
     });

    $('#beauty-controls.play-pause').click(function() {

        var state = $('#beauty-controls.play-pause').attr('class');
        if (state === 'play-pause') {
            $('#beauty-controls.play-pause').removeClass('s-active');
            $('#beauty-controls.play-pause').children().attr('class', 'icon-play');   
            document.getElementById('beauty').pause(); 
        } else {
            $('#beauty-controls.play-pause').addClass('s-active');
            $('#beauty-controls.play-pause').children().attr('class', 'icon-pause-1');
             document.getElementById('beauty').play();   
        }
    });


     $('#linda-frey-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('linda-frey').play();
               $('#linda-frey-controls.play-pause').addClass('s-active');
            $('#linda-frey-controls.play-pause').children().attr('class', 'icon-pause-1'); 
         } else {
             // element has gone out of viewport
             document.getElementById('linda-frey').pause();
               $('#linda-frey-controls.play-pause').removeClass('s-active');
            $('#linda-frey-controls.play-pause').children().attr('class', 'icon-play'); 
         }
     });

     $('#linda-frey-controls.play-pause').click(function() {

        var state = $('#linda-frey-controls.play-pause').attr('class');
        if (state === 'play-pause') {
            $('#linda-frey-controls.play-pause').removeClass('s-active');
            $('#linda-frey-controls.play-pause').children().attr('class', 'icon-play');   
            document.getElementById('linda-frey').pause(); 
        } else {
            $('#linda-frey-controls.play-pause').addClass('s-active');
            $('#linda-frey-controls.play-pause').children().attr('class', 'icon-pause-1');
             document.getElementById('linda-frey').play();   
        }
    });


     $('#florencio-abad-2-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('florencio-abad-2').play();
               $('#florencio-abad-2-controls.play-pause').addClass('s-active');
            $('#florencio-abad-2-controls.play-pause').children().attr('class', 'icon-pause-1'); 
         } else {
             // element has gone out of viewport
             document.getElementById('florencio-abad-2').pause();
               $('#florencio-abad-2-controls.play-pause').removeClass('s-active');
            $('#florencio-abad-2-controls.play-pause').children().attr('class', 'icon-play'); 
         }
     });

     $('#florencio-abad-2-controls.play-pause').click(function() {

        var state = $('#florencio-abad-2-controls.play-pause').attr('class');
        if (state === 'play-pause') {
            $('#florencio-abad-2-controls.play-pause').removeClass('s-active');
            $('#florencio-abad-2-controls.play-pause').children().attr('class', 'icon-play');   
            document.getElementById('florencio-abad-2').pause(); 
        } else {
            $('#florencio-abad-2-controls.play-pause').addClass('s-active');
            $('#florencio-abad-2-controls.play-pause').children().attr('class', 'icon-pause-1');
             document.getElementById('florencio-abad-2').play();   
        }
    });


    $('#stella-dawson-2-container.inview').bind('inview', function(event, visible) {
         if (visible == true) {
             // element is now visible in the viewport
            document.getElementById('stella-dawson-2').play();
            document.getElementById('florencio-abad-2').pause();
               $('#stella-dawson-2-controls.play-pause').addClass('s-active');
            $('#stella-dawson-2-controls.play-pause').children().attr('class', 'icon-pause-1'); 
         } else {
             // element has gone out of viewport
             document.getElementById('stella-dawson-2').pause();
               $('#stella-dawson-2-controls.play-pause').removeClass('s-active');
            $('#stella-dawson-2-controls.play-pause').children().attr('class', 'icon-play'); 
         }
     });

     $('#stella-dawson-2-controls.play-pause').click(function() {

        var state = $('#stella-dawson-2-controls.play-pause').attr('class');
        if (state === 'play-pause') {
            $('#stella-dawson-2-controls.play-pause').removeClass('s-active');
            $('#stella-dawson-2-controls.play-pause').children().attr('class', 'icon-play');   
            document.getElementById('stella-dawson-2').pause(); 
        } else {
            $('#stella-dawson-2-controls.play-pause').addClass('s-active');
            $('#stella-dawson-2-controls.play-pause').children().attr('class', 'icon-pause-1');
             document.getElementById('stella-dawson-2').play();   
        }
    });
});