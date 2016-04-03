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
		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/agency.txt',
		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/routes.txt',
		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/stops.txt',
		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/calendar.txt',
		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/trips.txt',
		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/stop_times.txt'
		/**
		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/calendar_dates.txt',
		**/
	];

	app.countyConnectionFiles = [
		'../assets/gtfs-files/county-connection_20160110_0842/agency.txt',
		'../assets/gtfs-files/county-connection_20160110_0842/routes.txt',
		'../assets/gtfs-files/county-connection_20160110_0842/stops.txt',
		'../assets/gtfs-files/county-connection_20160110_0842/calendar.txt',
		'../assets/gtfs-files/county-connection_20160110_0842/trips.txt',
		'../assets/gtfs-files/county-connection_20160110_0842/stop_times.txt'
		/**
		'../assets/gtfs-files/county-connection_20160110_0842/calendar_dates.txt',
		**/
	];

	app.calTrainFiles = [
		'../assets/gtfs-files/GTFS Caltrain Devs/agency.txt',
		'../assets/gtfs-files/GTFS Caltrain Devs/routes.txt',
		'../assets/gtfs-files/GTFS Caltrain Devs/stops.txt',
		'../assets/gtfs-files/GTFS Caltrain Devs/calendar.txt',
		'../assets/gtfs-files/GTFS Caltrain Devs/trips.txt',
		'../assets/gtfs-files/GTFS Caltrain Devs/stop_times.txt'
		/**
		'../assets/gtfs-files/GTFS Caltrain Devs/calendar_dates.txt',
		**/
	];

	app.acTransitFiles = [
		'../assets/gtfs-files/gtfsmarch202016b/agency.txt',
		'../assets/gtfs-files/gtfsmarch202016b/routes.txt',
		'../assets/gtfs-files/gtfsmarch202016b/stops.txt',
		'../assets/gtfs-files/gtfsmarch202016b/calendar.txt',
		'../assets/gtfs-files/gtfsmarch202016b/trips.txt',
		'../assets/gtfs-files/gtfsmarch202016b/stop_times.txt'
		/**
		'../assets/gtfs-files/gtfsmarch202016b/calendar_dates.txt',
		**/
	];

	app.lavtaFiles = [
		'../assets/gtfs-files/LAVTA/agency.txt',
		'../assets/gtfs-files/LAVTA/routes.txt',
		'../assets/gtfs-files/LAVTA/stops.txt',
		'../assets/gtfs-files/LAVTA/calendar.txt',
		'../assets/gtfs-files/LAVTA/trips.txt',
		'../assets/gtfs-files/LAVTA/stop_times.txt'
		/**
		'../assets/gtfs-files/LAVTA/calendar_dates.txt',
		**/
	];

	app.marinFiles = [
		'../assets/gtfs-files/marin-transit_20160122_0121/agency.txt',
		'../assets/gtfs-files/marin-transit_20160122_0121/routes.txt',
		'../assets/gtfs-files/marin-transit_20160122_0121/stops.txt',
		'../assets/gtfs-files/marin-transit_20160122_0121/calendar.txt',
		'../assets/gtfs-files/marin-transit_20160122_0121/trips.txt',
		'../assets/gtfs-files/marin-transit_20160122_0121/stop_times.txt'
		/**
		'../assets/gtfs-files/marin-transit_20160122_0121/calendar_dates.txt',
		**/
	];

	app.samTransFiles = [
		'../assets/gtfs-files/SamTrans/agency.txt',
		'../assets/gtfs-files/SamTrans/routes.txt',
		'../assets/gtfs-files/SamTrans/stops.txt',
		'../assets/gtfs-files/SamTrans/calendar.txt',
		'../assets/gtfs-files/SamTrans/trips.txt',
		'../assets/gtfs-files/SamTrans/stop_times.txt'
		/**
		'../assets/gtfs-files/SamTrans/calendar_dates.txt',
		**/
	];

	app.sfmtaFiles = [
		'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/agency.txt',
		'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/routes.txt',
		'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/stops.txt',
		'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/calendar.txt',
		'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/trips.txt',
		'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/stop_times.txt'
		/**
		'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/calendar_dates.txt',
		**/
	];

	app.srcbFiles = [
		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/agency.txt',
		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/routes.txt',
		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/stops.txt',
		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/calendar.txt',
		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/trips.txt',
		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/stop_times.txt'
		/**
		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/calendar_dates.txt',
		**/
	];

	app.vtaFiles = [
		'../assets/gtfs-files/VTA/agency.txt',
		'../assets/gtfs-files/VTA/routes.txt',
		'../assets/gtfs-files/VTA/stops.txt',
		'../assets/gtfs-files/VTA/calendar.txt',
		'../assets/gtfs-files/VTA/trips.txt',
		'../assets/gtfs-files/VTA/stop_times.txt'
		/**
		'../assets/gtfs-files/VTA/calendar_dates.txt',
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
			function putGTFSValues(fileJson, agency_name) {

				fileJson.agency.forEach(a => {

					_db.put(appmods.PublicTransportationDB.agencyStore, a);

				});

				fileJson.routes.forEach(r => {

					r.agency_name = agency_name;	//Not everyone includes the id for some annoying reason
					_db.put(appmods.PublicTransportationDB.routesStore, r);

				});

				fileJson.calendar.forEach(c => {

					c.agency_name = agency_name;	//Not everyone includes the id for some annoying reason
					_db.put(appmods.PublicTransportationDB.calendarStore, c);

				});

				/**
				fileJson.calendar_dates.forEach(cd => {

					_db.put(appmods.PublicTransportationDB.calendarDatesStore, cd);

				});

				fileJson.stops.forEach(s => {

					_db.put(appmods.PublicTransportationDB.stopsStore, s);

				});

				fileJson.stop_times.forEach(st => {

					_db.put(appmods.PublicTransportationDB.stopTimesStore, st);

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

  						app.$.gtfsagency.parseXML().then(function() {

  							app.set('agencyList', []);

  							app.gtfsJson.agencyList.forEach(agency => {

  								let agencyObj = Object.create(null);

  								agencyObj.agency_name = agency._attr.Name._value;

  								app.push('agencyList', agencyObj);

  							});

  							app.loading = false;

  						});

	  				}).catch(function(error) {

	  					_db.getAll(appmods.PublicTransportationDB.agencyStore).then(function(agencies) {

	  						app.set('agencyList', []);

	  						agencies.forEach(agency => {

	  							app.push('agencyList', agency);

	  						});

	  						app.loading = false;

	  					});

	  				});

	  			}

	  			app.$.paperDrawerPanel.togglePanel();

	  		};

	  		/**
			 * Populate drawer with destination info
			 * @function populateRoutes
			 *
			 */
	  		app.populateRoutes = function() {

	  			_isOpening = !_isOpening;

	  			if(_isOpening) {

	  				app.loading = true;
	  				app.isDeparture = false;

	  				app.set('routes', []);

	  				_realTimeData.getRoutes(app.departure).then(function(data) {

	  					app.set('routestext', String(data));

  						app.$.gtfsroutes.parseXML().then(function() {

  							app.gtfsRoutesJson.agencyList.forEach(agency => {

  								agency.RouteList.forEach(routeList => {

  									routeList.Route.forEach(route => {

  										if(route._attr.Code._value && route._attr.Name._value) {

  											let routeObj = Object.create(null);

											routeObj.agency = 	agency._attr.Name._value;
											routeObj.code = 	route._attr.Code._value;
											routeObj.name = 	route._attr.Name._value;

											app.push('routes', routeObj);

  										}

	  								});

  								});

  							});

  							app.loading = false;

  						});

	  				}).catch(function(error) {

	  					app.set('routes', []);

	  					_db.getAllByIndex(appmods.PublicTransportationDB.calendarStore,
	  						appmods.PublicTransportationDB.calendarAgencyIndex,
	  						app.departure).then(function(calendars) {

	  							let weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'tursday', 'friday', 'saturday'];
	  							let d = new Date();
	  							let day = weekdays[d.getDay()];
	  							let todaysCalendar;

	  							for(let i=0; i < calendars.length; ++i) {

	  								if(calendars[i][day] === "1") {

	  									todaysCalendar = calendars[i];
	  									break;

	  								}

	  							}

	  							if(todaysCalendar) {

	  								_db.getAllByIndex(appmods.PublicTransportationDB.routesStore, 
			  						appmods.PublicTransportationDB.agencyNameIndex, 
			  						app.departure).then(function(routes) {

			  							let tripFile = appmods.FileUtility.getTripFile(app.departure);

			  							if(tripFile) {

			  								app.set('gtfsFile', [tripFile]);

			  								let trips = [];

						  					app.$.fileParser.parseFiles().then(function() {

						  						app.parsedJson.trips.forEach(trip => {

						  							if(todaysCalendar.service_id === trip.service_id) {

						  								trips.push(trip);

						  							}

						  						});

						  						trips.forEach(trip=> {

						  							routes.forEach(route => {

						  								if(route.agency_name && route.route_id && route.route_id === trip.route_id) {

						  									let routeObj = Object.create(null);

							  								routeObj.agency = 	route.agency_name;
							  								routeObj.code = 	route.route_id;
															routeObj.name = 	route.route_short_name || route.route_long_name;
															routeObj.tripId =	trip.trip_id;

															let index = -1;

															for(let i = 0; i < app.routes.length; ++i) {

																if(app.routes[i].name === routeObj.name) {

																	index = i;
																	break;

																}

															}

															if(index === -1) {

																app.push('routes', routeObj);

															}

						  								}

						  							});

						  						});

						  					});

			  							}

			  						});

	  							}

		  					app.loading = false;

	  						});

	  				});
	  				
	  			}

	  			app.$.paperDrawerPanel.togglePanel();

	  		};

	  		/**
	  		 * Selected an agency from the map card
	  		 * @param  {object} e event
	  		 */
	  		app.agencySelected = function(e, val) {

	  			e.stopPropagation();

	  			app.departure = val.item.value.agency_name;

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

	  			app.set('selectedRoute', val.item.value.name);

	  			app.$.paperDrawerPanel.closeDrawer();
	  			_isOpening = false;

	  			_realTimeData.getStops(app.departure, val.item.value.code).then(function(data) {

  					app.set('stopstext', String(data));

					app.$.gtfsstops.parseXML();

  				}).catch(function(error) {

  					let stopTimesFile = appmods.FileUtility.getStopTimesFile(app.departure);
					let stops = app.parsedJson;
					app.set('stopTimes', []);
					app.set('stops', []);

					if(stopTimesFile) {

						app.set('gtfsFile', [stopTimesFile]);

						app.$.fileParser.parseFiles().then(function() {

							app.parsedJson.stop_times.forEach(stopTime => {

								if(stopTime.trip_id === val.item.value.tripId) {

									app.push('stopTimes', stopTime);

								}

							});

							let stopsFile = appmods.FileUtility.getStopsFile(app.departure);

		  					if(stopsFile) {

		  						app.set('gtfsFile', [stopsFile]);

		  						app.$.fileParser.parseFiles().then(function() {

		  							app.stopTimes.forEach(stopTime => {

										app.parsedJson.stops.forEach(stop => {

											if(stopTime.stop_id === stop.stop_id) {

												let index = -1;

												for(let i = 0;i < app.stops.length; ++i) {

													if(app.stops[i].stop_id === stop.stop_id) {

														index = i;
														break;

													}

												}

												if(index === -1) {

													app.stops.push(stop);

												}

											}

										});

									});

									console.log('Stop Times: ', app.stopTimes);
			  						console.log('Stops: ', app.stops);

			  					});

		  					}

						});

					}

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

			  				putGTFSValues(app.acTransitJson, ACTRANSIT);
			  				putGTFSValues(app.bartJson, BART);
			  				putGTFSValues(app.countyConnectionJson, COUNTYCONNECTION);
			  				putGTFSValues(app.calJson, CALTRAIN);
			  				putGTFSValues(app.lavtaJson, LAVTA);
			  				putGTFSValues(app.marinJson, MARINTRANSIT);
			  				putGTFSValues(app.samTransJson, SAMTRANS);
			  				putGTFSValues(app.sfmtaJson, SFMTA);
			  				putGTFSValues(app.vtaJson, VTA);
			  				putGTFSValues(app.srcbJson, SRCB);
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