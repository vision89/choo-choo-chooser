/*jshint esversion: 6 */
var appmods = appmods || Object.create(null);

appmods.RealTimeData = (function(document) {
  'use strict';

  	return class RealTimeData {

  		constructor() {

	    }

	    /**
	     * Gets the agencies
	     * @function
	     * 
	     */
	    getAgencies() {

	    	return new Promise(function(resolve, reject) {

	    		//Get the departure data
				fetch('http://services.my511.org/Transit2.0/GetAgencies.aspx?token=9506841f-7aad-4b10-b015-8eb38a2d6223',{
					method: 'GET',
					mode: 'cors',
					headers: new Headers({
						'Content-Type': 'text/xml; charset=utf-8'
					})
					}).then(function(response) {

						response.text().then(function(data) {

							resolve(data);

						});

					}).catch(function(error) {

						reject(error);

					});

		    	});


	    }

	    /**
	     * Gets routes
	     * @function
	     * 
	     */
	    getRoutes(agency) {

	    	return new Promise(function(resolve, reject) {

	    		//Get the departure data
				fetch('http://services.my511.org/Transit2.0/GetRoutesForAgency.aspx?token=9506841f-7aad-4b10-b015-8eb38a2d6223&agencyName=' + agency,{
					method: 'GET',
					mode: 'cors',
					headers: new Headers({
						'Content-Type': 'text/xml; charset=utf-8'
					})
					}).then(function(response) {

						response.text().then(function(data) {

							resolve(data);

						});

					}).catch(function(error) {

						reject(error);

					});

		    	});


	    }

	    /**
	     * Gets stops
	     * @function
	     * 
	     */
	    getStops(agency, routeCode) {

	    	return new Promise(function(resolve, reject) {

	    		//Get the departure data
				fetch('http://services.my511.org/Transit2.0/GetStopsForRoute.aspx?token=9506841f-7aad-4b10-b015-8eb38a2d6223&routeIDF=' + agency + '~' + routeCode,{
					method: 'GET',
					mode: 'cors',
					headers: new Headers({
						'Content-Type': 'text/xml; charset=utf-8'
					})
					}).then(function(response) {

						response.text().then(function(data) {

							resolve(data);

						});

					}).catch(function(error) {

						reject(error);

					});

		    	});


	    }

  	};

})(document);  