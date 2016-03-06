/*jshint esversion: 6 */
(function(document) {
	'use strict';

	var _app = document.querySelector('#app');
	_app.selected = 0;

	// See https://github.com/Polymer/polymer/issues/1381
  	window.addEventListener('WebComponentsReady', function() {

  		_app.selected = 0;
  		
  	});


})(document);	