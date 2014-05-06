(function() {
	var triggerBttn = document.getElementById( 'trigger-dataoverlay' ),
		dataoverlay = document.querySelector( 'div.dataoverlay' ),
		closeBttn = dataoverlay.querySelector( 'button.dataoverlay-close' );
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggledataoverlay() {
		if( classie.has( dataoverlay, 'open' ) ) {
			classie.remove( dataoverlay, 'open' );
			classie.add( dataoverlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( dataoverlay, 'close' );
			};
			if( support.transitions ) {
				dataoverlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( dataoverlay, 'close' ) ) {
			classie.add( dataoverlay, 'open' );
		}
	}

	triggerBttn.addEventListener( 'click', toggledataoverlay );
	closeBttn.addEventListener( 'click', toggledataoverlay );
})();