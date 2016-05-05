/*jshint esversion: 6 */
(function(document) {
	'use strict';

	const AGENCY_CARD = 0;
	const ROUTE_CARD = 1;
	const DEPARTURE_CARD = 2;
	const DESTINATION_CARD = 3;
	const DEPARTURE_TIMES_CARD = 4;
	const DESTINATION_TIMES_CARD = 5;
	const DURATION_INFO_CARD = 6; 

	let app = document.querySelector('#app');
	app.agencytext = '';
	app.agencyjson = Object.create(null);
	app.isDeparture = false;
	app.loading = false;
	app.routes = [];

	let _isOpening = false;

	app.gtfsErrorFiles = function(err) {

		console.log('Error updating json from files: ', err);

	};

	// See https://github.com/Polymer/polymer/issues/1381
  	window.addEventListener('WebComponentsReady', function() {

  		/**
		 * Show the toast!
		 * @param  {object} worker 
		 * 
		 */
		function updateToast(worker) {

			app.reloadPage = function() {

				worker.postMessage({action: 'skipWaiting'});

				app.$.reloadtoast.close();

				window.location.reload();

			};

			app.$.reloadtoast.open();

		}

  		let neededScripts = [];

		//These should already be shimemed for IE but in case were on a non IE browser that doesn't support them
		if(!('CustomEvent' in self)) {

			neededScripts.push('/bower_components/EventListener/EventListener.js');

		}

		if(!('Promise' in self)) {

			neededScripts.push('/bower_components/es6-promise/es6-promise.min.js');

		}

		//Load the needed scripts
		appmods.ScriptLoader.loadScripts(neededScripts, function() {

			let _realTimeData = new appmods.RealTimeData();

			let _db = new appmods.PublicTransportationDB();

			_db.open();

			setTimeout(function() {

				app.selected = AGENCY_CARD;

			});

	  		app.goBack = function() {

	  			switch(app.selected) {

	  				case ROUTE_CARD:
	  					app.selected = AGENCY_CARD;
	  					break;
	  				case DEPARTURE_CARD:
	  					app.selected = ROUTE_CARD;
	  					break;			
	  				case DESTINATION_CARD:
	  					app.selected = DEPARTURE_TIMES_CARD;
	  					break;
	  				case DEPARTURE_TIMES_CARD:
	  					app.selected = DEPARTURE_CARD;
	  					break;
	  				case DESTINATION_TIMES_CARD:
	  					app.selected = DESTINATION_CARD;
	  					break;
	  				case DURATION_INFO_CARD:
	  					app.selected = DESTINATION_TIMES_CARD;
	  					break;			
	  			}

	  		};

	  		app.allowGoBack = function (selected) {

	  			if(!selected || selected === AGENCY_CARD) {

	  				return true;

	  			}

	  			return false;

	  		};

	  		/**
			 * Populate the agency list
			 * @function populateAgencies
			 *
			 */
	  		app.populateAgencies = function() {

	  			_isOpening = !_isOpening;
	  			app.set('showDirectionsList', false);

	  			if(_isOpening) {

	  				app.loading = true;
	  				app.isDeparture = true;

	  				_realTimeData.getAgencies().then( data => {

  						app.set('agencyList', []);

						data.forEach( agency => {

							app.push('agencyList', agency);

						});

						app.loading = false;

	  				}).catch( error => {

	  					console.log('Error: ', error);

	  					app.loading = false;

	  				});

	  			}

	  		};

	  		app.populateAgencies();

	  		/**
	  		 * Selected an agency from the map card
	  		 * @param  {object} e event
	  		 */
	  		app.agencySelected = function(e, val) {

	  			e.stopPropagation();

	  			app.loading = true;
  				app.isDeparture = false;

  				_realTimeData.getRoutes(app.selectedAgency).then( data => {

  					app.set('routeList', []);

  					data.forEach( route => {

  						app.push('routeList', route);

  					});

					app.loading = false;

					app.selected = ROUTE_CARD;

  				}).catch( error => {

  					console.log('Error: ', error);

  					app.loading = false;	

  				});

	  		};

	  		/**
	  		 * Selected route from the card
	  		 * @param  {object} e   event
	  		 * @param  {object} val selected value
	  		 */
	  		app.routeSelected = function(e, val) {

	  			e.stopPropagation();

	  			app.set('stopList', []);

	  			app.loading = true;

  				_realTimeData.getStopTimes(app.selectedAgency.agencyName, app.selectedRoute.tripId).then( stopTimes => {

						_realTimeData.getStops(app.selectedAgency.agencyName, app.selectedRoute.code, '', app.selectedRoute.tripId).then( data => {

	  					data.forEach( stop => {

	  						let stopObj = Object.create(null);
							stopObj.code = stop.code;
							stopObj.name = stop.name;
							stopObj.stopTimes = [];

  							stopTimes.forEach( stopTime => {

  								if(stopTime.stopId === stop.code && stopTime.departureTime
.length > 0) {

  									stopObj.stopTimes.push(stopTime);	

  								}

  							});

							if(stopObj.stopTimes.length > 0) {

  								app.push('stopList', stopObj);

  							}

	  					});

	  					app.loading = false;

	  					if(app.stopList.length > 0) {

	  						app.selected = DEPARTURE_CARD;

	  					}

	  				}).catch( error => {

	  					app.loading = true;

	  					console.log('Error: ', error);

	  				});

					});

	  		};

	  		/**
	  		 * Selected departure
	  		 * @param  {object} e   event
	  		 * @param  {object} val selected value
	  		 */
	  		app.departureSelected = function(e, val) {

	  			app.selected = DEPARTURE_TIMES_CARD;

	  		};

	  		/**
	  		 * Selected departing time
	  		 * @param  {object} e   event
	  		 * @param  {object} val selected value
	  		 */
	  		app.departureTimeSelected = function(e, val) {

	  			app.selected = DESTINATION_CARD;

	  		};

	  		/**
	  		 * Selected destination
	  		 * @param  {object} e   event
	  		 * @param  {object} val selected value
	  		 */
	  		app.destinationSelected = function(e, val) {

	  			app.selected = DESTINATION_TIMES_CARD;

	  		};

	  		app.destinationTimeSelected = function(e, val) {

	  			app.selected = DURATION_INFO_CARD;

	  		};

	  		if(navigator.serviceWorker) {

				navigator.serviceWorker.register('./sw.js').then( reg => {

				    if (!navigator.serviceWorker.controller) {

				      return;

				    }

				    if (reg.waiting) {

				    	updateToast(reg.waiting);

				     	return;

				    }

				    if (reg.installing) {

				      	reg.installing.addEventListener('statechange', function() {

							if (reg.installing.state == 'installed') {

								updateToast(reg.installing);

							}

						});

				      	return;

				    }

				    reg.addEventListener('updatefound', function() {

				    	if (reg.installing) {

				    		reg.installing.addEventListener('statechange', function() {

								if (reg.installing.state == 'installed') {

									updateToast(reg.installing);

								}

							});

				    	}	

				    });

				}).catch( err => {

					console.log('Service Worker Error', err);

				});

				navigator.serviceWorker.addEventListener('message', event => {

					//If we get a map error we know we are in offline mode
					switch(event.data) {

						case 'skipWaiting':
							console.log('Calling skipwaiting');
							navigator.serviceWorker.skipWaiting();
							break;

					}

				});

			}

		});
  		
  	});

})(document);	