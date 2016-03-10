/*jshint esversion: 6 */
(function(document) {
	'use strict';

	let _app = document.querySelector('#app');
	let _isOpening = false;

	// See https://github.com/Polymer/polymer/issues/1381
  	window.addEventListener('WebComponentsReady', function() {

  		let neededScripts = [];

		//These should already be shimemed for IE but in case were on a non IE browser that doesn't support them
		if(!('CustomEvent' in self)) {

			neededScripts.push('/bower_components/EventListener/EventListener.js');

		}

		if(!('Promise' in self)) {

			neededScripts.push('/bower_components/es6-promise/es6-promise.min.js');

		}

		//Load the needed scripts
		loadScripts(neededScripts, function() {

			/**
			 * Selected view
			 * @type {number}
			 */
	  		_app.selected = 0;

	  		/**
			 * Show the map view
			 * @function viewMap
			 *
			 */
	  		_app.viewMap = function() {

	  			app.selected = 0;

	  		};

	  		/**
			 * Show the schedule view
			 * @function viewSchedule
			 *
			 */
	  		_app.viewSchedule = function() {

	  			_app.selected = 1;

	  		};

	  		/**
			 * Populate drawer with departure info
			 * @function populateDeparture
			 *
			 */
	  		_app.populateDeparture = function() {

	  			_isOpening = !_isOpening;

	  			if(_isOpening) {

	  				//Get the departure data

	  			}

	  			_app.$.paperDrawerPanel.togglePanel()

	  		};

	  		/**
			 * Populate drawer with destination info
			 * @function populateDeparture
			 *
			 */
	  		_app.populateDestination = function() {

	  			_isOpening = !_isOpening;

	  			if(_isOpening) {

	  				//Get the departure data
	  				
	  			}

	  			_app.$.paperDrawerPanel.togglePanel()

	  		};

		});
  		
  	});


})(document);	