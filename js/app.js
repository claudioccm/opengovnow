$(document).foundation();

$(document).ready(function() {
	
	var totalHeight = $('html').css('height');
	// $('.m-menu').css('height', totalHeight);
	console.log(totalHeight);

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
});












