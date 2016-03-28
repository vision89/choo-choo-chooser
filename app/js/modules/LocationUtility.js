/*jshint esversion: 6 */
var appmods = appmods || Object.create(null);

appmods.LocationUtility = (function(document) {
  'use strict';

  	return class LocationUtility {

  		constructor() {}

  		/**
	     * Gets the users location
	     * @function
	     * @static
	     * 
	     */
  		static getLocation() {

  			return new Promise(function(resolve, reject) {

  				if(navigator.geolocation) {

					navigator.geolocation.getCurrentPosition(function(position) {

						var loc = Object.create(null);

						loc.latitude = position.coords.latitude;
						loc.longitude = position.coords.longitude;

						return resolve(loc);

					}, function(err) {

						return reject(err);

					});
				}

  			});	

  		}

  	};	

 })(document);