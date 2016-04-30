/*jshint esversion: 6 */
(function(document) {
	'use strict';

	const AGENCY_CARD = 0;
	const ROUTE_CARD = 1;
	const DIRECTION_CARD = 2;
	const DEPARTURE_CARD = 3;
	const DESTINATION_CARD = 4;
	const DEPARTURE_TIMES_CARD = 5;
	const DESTINATION_TIMES_CARD = 6;
	const DURATION_INFO_CARD = 7; 

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

				fileJson.agency.forEach( a => {

					_db.put(appmods.PublicTransportationDB.agencyStore, a);

				});

				fileJson.routes.forEach( r => {

					r.agency_name = agency_name;	//Not everyone includes the id for some annoying reason
					_db.put(appmods.PublicTransportationDB.routesStore, r);

				});

				fileJson.calendar.forEach( c => {

					c.agency_name = agency_name;	//Not everyone includes the id for some annoying reason
					_db.put(appmods.PublicTransportationDB.calendarStore, c);

				});

			}

			setTimeout(function() {

				app.selected = AGENCY_CARD;

			});

	  		app.goBack = function() {

	  			switch(app.selected) {

	  				case ROUTE_CARD:
	  					app.selected = AGENCY_CARD;
	  					break;
	  				case DIRECTION_CARD:
	  					app.selected = ROUTE_CARD;
	  					break;
	  				case DEPARTURE_CARD:
	  					if(app.selectedDirection) {
	  						app.selected = DIRECTION_CARD;
	  					} else {
	  						app.selected = ROUTE_CARD;
	  					}
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

  				_realTimeData.getRoutes(app.selectedAgency.agency_name).then( data => {

  					if(app.selectedAgency.agency_name === "BART") {

	  					app.selectedAgency.agency_name = "Bay Area Rapid Transit";

	  				}

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

	  			if(app.selectedRoute.directionList.length === 0) {

	  				app.loading = true;

	  				_realTimeData.getStopTimes(app.selectedAgency.agency_name, app.selectedRoute.tripId).then( stopTimes => {

  						_realTimeData.getStops(app.selectedAgency.agency_name, app.selectedRoute.code, '', app.selectedRoute.tripId).then( data => {

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

	  			} else {

	  				app.selected = DIRECTION_CARD;

	  			}

	  		};

	  		/**
	  		 * Selected direction from the card
	  		 * @param  {object} e   event
	  		 * @param  {object} val selected value
	  		 */
	  		app.directionSelected = function(e, val) {

	  			e.stopPropagation();

	  			app.set('stopList', []);

	  			app.loading = true;

  				_realTimeData.getStopTimes(app.selectedAgency.agency_name, app.selectedRoute.tripId).then( stopTimes => {

					_realTimeData.getStops(app.selectedAgency.agency_name, app.selectedRoute.code, app.selectedDirection.code, app.selectedRoute.tripId).then( data => {

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

	  					if(app.stops.length > 0) {

	  						app.selected = DEPARTURE_CARD;

	  					}

	  				}).catch( error => {

	  					app.loading = false;

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

	  		_db.getAll(appmods.PublicTransportationDB.versionStore).then( data => {

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