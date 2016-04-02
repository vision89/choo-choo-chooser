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

	app.bartFiles = [
		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/agency.txt'
		/**
		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/calendar.txt',
		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/calendar_dates.txt',
		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/routes.txt',
		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/stop_times.txt',
		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/stops.txt',
		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/trips.txt'
		**/
	];

	app.countyConnectionFiles = [
		'../assets/gtfs-files/county-connection_20160110_0842/agency.txt'
		/**
		'../assets/gtfs-files/county-connection_20160110_0842/calendar.txt',
		'../assets/gtfs-files/county-connection_20160110_0842/calendar_dates.txt',
		'../assets/gtfs-files/county-connection_20160110_0842/routes.txt',
		'../assets/gtfs-files/county-connection_20160110_0842/stop_times.txt',
		'../assets/gtfs-files/county-connection_20160110_0842/stops.txt',
		'../assets/gtfs-files/county-connection_20160110_0842/trips.txt'
		**/
	];

	app.calTrainFiles = [
		'../assets/gtfs-files/GTFS Caltrain Devs/agency.txt'
		/**
		'../assets/gtfs-files/GTFS Caltrain Devs/calendar.txt',
		'../assets/gtfs-files/GTFS Caltrain Devs/calendar_dates.txt',
		'../assets/gtfs-files/GTFS Caltrain Devs/routes.txt',
		'../assets/gtfs-files/GTFS Caltrain Devs/stop_times.txt',
		'../assets/gtfs-files/GTFS Caltrain Devs/stops.txt',
		'../assets/gtfs-files/GTFS Caltrain Devs/trips.txt'
		**/
	];

	app.acTransitFiles = [
		'../assets/gtfs-files/gtfsmarch202016b/agency.txt'
		/**
		'../assets/gtfs-files/gtfsmarch202016b/calendar.txt',
		'../assets/gtfs-files/gtfsmarch202016b/calendar_dates.txt',
		'../assets/gtfs-files/gtfsmarch202016b/routes.txt',
		'../assets/gtfs-files/gtfsmarch202016b/stop_times.txt',
		'../assets/gtfs-files/gtfsmarch202016b/stops.txt',
		'../assets/gtfs-files/gtfsmarch202016b/trips.txt'
		**/
	];

	app.lavtaFiles = [
		'../assets/gtfs-files/LAVTA/agency.txt'
		/**
		'../assets/gtfs-files/LAVTA/calendar.txt',
		'../assets/gtfs-files/LAVTA/calendar_dates.txt',
		'../assets/gtfs-files/LAVTA/routes.txt',
		'../assets/gtfs-files/LAVTA/stop_times.txt',
		'../assets/gtfs-files/LAVTA/stops.txt',
		'../assets/gtfs-files/LAVTA/trips.txt'
		**/
	];

	app.marinFiles = [
		'../assets/gtfs-files/marin-transit_20160122_0121/agency.txt'
		/**
		'../assets/gtfs-files/marin-transit_20160122_0121/calendar.txt',
		'../assets/gtfs-files/marin-transit_20160122_0121/calendar_dates.txt',
		'../assets/gtfs-files/marin-transit_20160122_0121/routes.txt',
		'../assets/gtfs-files/marin-transit_20160122_0121/stop_times.txt',
		'../assets/gtfs-files/marin-transit_20160122_0121/stops.txt',
		'../assets/gtfs-files/marin-transit_20160122_0121/trips.txt'
		**/
	];

	app.samTransFiles = [
		'../assets/gtfs-files/SamTrans/agency.txt'
		/**
		'../assets/gtfs-files/SamTrans/calendar.txt',
		'../assets/gtfs-files/SamTrans/calendar_dates.txt',
		'../assets/gtfs-files/SamTrans/routes.txt',
		'../assets/gtfs-files/SamTrans/stop_times.txt',
		'../assets/gtfs-files/SamTrans/stops.txt',
		'../assets/gtfs-files/SamTrans/trips.txt'
		**/
	];

	app.sfmtaFiles = [
		'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/agency.txt'
		/**
		'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/calendar.txt',
		'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/calendar_dates.txt',
		'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/routes.txt',
		'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/stop_times.txt',
		'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/stops.txt',
		'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/trips.txt'
		**/
	];

	app.srcbFiles = [
		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/agency.txt'
		/**
		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/calendar.txt',
		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/calendar_dates.txt',
		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/routes.txt',
		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/stop_times.txt',
		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/stops.txt',
		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/trips.txt'
		**/
	];

	app.vtaFiles = [
		'../assets/gtfs-files/VTA/agency.txt'
		/**
		'../assets/gtfs-files/VTA/calendar.txt',
		'../assets/gtfs-files/VTA/calendar_dates.txt',
		'../assets/gtfs-files/VTA/routes.txt',
		'../assets/gtfs-files/VTA/stop_times.txt',
		'../assets/gtfs-files/VTA/stops.txt',
		'../assets/gtfs-files/VTA/trips.txt'
		**/
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

			let _db = new appmods.PublicTransportationDB();

			_db.open();

			/**
			 * Handles inserting gtfs data into the db
			 * @param  {object} fileJson json for gtfs file
			 */
			function putGTFSValues(fileJson) {

				fileJson.agency.forEach(a => {

					_db.put(appmods.PublicTransportationDB.agencyStore, a);

				});

				/**
				fileJson.calendar.forEach(c => {

					_db.put(appmods.PublicTransportationDB.calendarStore, c);

				});
				
				fileJson.calendar_dates.forEach(cd => {

					_db.put(appmods.PublicTransportationDB.calendarDatesStore, cd);

				});
				
				fileJson.routes.forEach(r => {

					_db.put(appmods.PublicTransportationDB.routesStore, r);

				});

				fileJson.stop_times.forEach(st => {

					_db.put(appmods.PublicTransportationDB.stopTimesStore, st);

				});

				fileJson.stops.forEach(s => {

					_db.put(appmods.PublicTransportationDB.stopsStore, s);

				});

				fileJson.trips.forEach(t => {

					_db.put(appmods.PublicTransportationDB.tripsStore, t);

				});
				**/

			}

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

	  					_db.getAll(appmods.PublicTransportationDB.agencyStore).then(function(agencies) {

	  						console.log('Got agencies from the db: ', agencies);

	  					});

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

	  		_db.getAll(appmods.PublicTransportationDB.versionStore).then(function(data) {

	  			if(data.length === 0) {

	  				Promise.all([app.$.bartgtfsfiles.parseFiles(), app.$.countyconnectiongtfsfiles.parseFiles(), 
			  			app.$.calgtfsfiles.parseFiles(), app.$.actransitgtfsfiles.parseFiles(), 
			  			app.$.lavtagtfsfiles.parseFiles(), app.$.maringtfsfiles.parseFiles(),
			  			app.$.samtransgtfsfiles.parseFiles(), app.$.sfmtagtfsfiles.parseFiles(), 
			  			app.$.vtagtfsfiles.parseFiles(), app.$.srcbfiles.parseFiles()]).then(function() {

			  				putGTFSValues(app.acTransitJson);
			  				putGTFSValues(app.bartJson);
			  				putGTFSValues(app.countyConnectionJson);
			  				putGTFSValues(app.calJson);
			  				putGTFSValues(app.lavtaJson);
			  				putGTFSValues(app.marinJson);
			  				putGTFSValues(app.samTransJson);
			  				putGTFSValues(app.sfmtaJson);
			  				putGTFSValues(app.vtaJson);
			  				putGTFSValues(app.srcbJson);
			  				_db.put(appmods.PublicTransportationDB.versionStore, {'version': 1});

			  		});

	  			}

	  		});

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