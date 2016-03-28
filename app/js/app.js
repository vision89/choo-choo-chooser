/*jshint esversion: 6 */
(function(document) {
	'use strict';

	let app = document.querySelector('#app');
	app.agencytext = '';
	app.agencyjson = Object.create(null);
	app.isDeparture = false;
	app.loading = false;
	app.routes = [];

	let _isOpening = false;

	app.files = [
		'../../assets/GTFS Caltrain Devs/agency.txt',
		'../../assets/GTFS Caltrain Devs/calendar.txt',
		'../../assets/GTFS Caltrain Devs/calendar_dates.txt',
		'../../assets/GTFS Caltrain Devs/fare_attributes.txt',
		'../../assets/GTFS Caltrain Devs/fare_rules.txt',
		'../../assets/GTFS Caltrain Devs/feed_info.txt',
		'../../assets/GTFS Caltrain Devs/routes.txt',
		'../../assets/GTFS Caltrain Devs/stop_times.txt',
		'../../assets/GTFS Caltrain Devs/stops.txt',
		'../../assets/GTFS Caltrain Devs/trips.txt'
	];

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

			/**
			 * Selected view
			 * @type {number}
			 */
	  		app.selected = 0;

	  		/**
			 * Show the map view
			 * @function viewMap
			 *
			 */
	  		app.viewMap = function() {

	  			app.selected = 0;

	  		};

	  		/**
			 * Show the schedule view
			 * @function viewSchedule
			 *
			 */
	  		app.viewSchedule = function() {

	  			app.selected = 1;

	  		};

	  		/**
			 * Populate drawer with departure info
			 * @function populateDeparture
			 *
			 */
	  		app.populateDeparture = function() {

	  			_isOpening = !_isOpening;

	  			if(_isOpening) {

	  				app.loading = true;
	  				app.isDeparture = true;

	  				_realTimeData.getAgencies().then(function(data) {

	  					app.set('agencytext', String(data));

  						app.$.gtfsagency.parseXML();

  						app.loading = false;

	  				}).catch(function(error) {

	  					console.log('Error! ', error);

	  					app.loading = false;

	  				});

	  			}

	  			app.$.paperDrawerPanel.togglePanel();

	  		};

	  		/**
			 * Populate drawer with destination info
			 * @function populateDeparture
			 *
			 */
	  		app.populateRoutes = function() {

	  			_isOpening = !_isOpening;

	  			if(_isOpening) {

	  				app.loading = true;
	  				app.isDeparture = false;

	  				_realTimeData.getRoutes(app.departure).then(function(data) {

	  					app.set('routestext', String(data));

  						app.$.gtfsroutes.parseXML();

  						app.loading = false;

	  				}).catch(function(error) {

	  					console.log('Error! ', error);

	  					app.loading = false;

	  				});
	  				
	  			}

	  			app.$.paperDrawerPanel.togglePanel();

	  		};

	  		app.updatedAgenciesXML = function(e) {

	  			e.stopPropagation();

	  			console.log('Agencies: ', app.gtfsJson.agencyList);

	  		};

	  		/**
	  		 * Received the routes
	  		 */
	  		app.updatedRoutesXML = function(e) {

	  			e.stopPropagation();

	  			app.set('routes', []);

	  			try {

	  				app.set('routes', app.gtfsRoutesJson.agencyList[0].RouteList[0].Route);

	  			} catch (e) {

	  				console.log('Error: ', e);

	  			}

	  		};

	  		app.updatedStopsXML = function(e) {

	  			e.stopPropagation();

	  			console.log('Stops: ', app.gtfsStopsJson);

	  		};

	  		/**
	  		 * Selected an agency from the map card
	  		 * @param  {object} e event
	  		 */
	  		app.agencySelected = function(e, val) {

	  			e.stopPropagation();

	  			app.departure = val.item.value._attr.Name._value;

	  			app.$.paperDrawerPanel.closeDrawer();
	  			_isOpening = false;

	  		};

	  		/**
	  		 * Selected route from the card
	  		 * @param  {object} e   event
	  		 * @param  {object} val selected value
	  		 */
	  		app.routeSelected = function(e, val) {

	  			e.stopPropagation();

	  			app.set('selectedRoute', val.item.value._attr.Name._value);

	  			app.$.paperDrawerPanel.closeDrawer();
	  			_isOpening = false;

	  			_realTimeData.getStops(app.departure, val.item.value._attr.Code._value).then(function(data) {

  					app.set('stopstext', String(data));

					app.$.gtfsstops.parseXML();

  				}).catch(function(error) {

  					console.log('Error! ', error);

  				});

	  		};

	  		/**
	  		 * Get the users location
	  		 * @param  {object} data users location
	  		 * 
	  		 */
	  		appmods.LocationUtility.getLocation().then(function(data) {

	  			app.set('loc', data);

	  		}).catch(function(error) {

	  			//If we can't get the users location assume we are offline
	  			app.set('online', false);

	  		});

	  		/**
	  		 * Parse the gtfs files
	  		 */
	  		app.$.gtfsfiles.parseFiles();

	  		if(navigator.serviceWorker) {

				navigator.serviceWorker.register('./sw.js').then(function(reg) {

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

				}).catch(function(err) {

					console.log('Service Worker Error', err);

				});

				navigator.serviceWorker.addEventListener('message', (event) => {

					//If we get a map error we know we are in offline mode
					switch(event.data) {

						case 'Map Error':
							app.online = false;
							break;
						case 'Map Good':
							app.online = true;
							break;
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