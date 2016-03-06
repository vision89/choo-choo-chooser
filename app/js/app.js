/*jshint esversion: 6 */
(function(document) {
	'use strict';

	var _app = document.querySelector('#app');

	// See https://github.com/Polymer/polymer/issues/1381
  	window.addEventListener('WebComponentsReady', function() {

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
  		_app.viewSchedule = function () {

  			_app.selected = 1;

  		};
  		
  	});


})(document);	