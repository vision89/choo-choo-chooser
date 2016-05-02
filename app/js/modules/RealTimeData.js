/*jshint esversion: 6 */
var appmods = appmods || Object.create(null);

appmods.RealTimeData = (function(document) {
  'use strict';

  	let _db = new appmods.PublicTransportationDB();

  	const BARTAGENCYFILE = 		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/agency.txt';
  	const BARTROUTESFILE =  	'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/routes.txt';
  	const BARTSTOPSFILE = 		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/stops.txt';
  	const BARTCALENDARFILE = 	'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/calendar.txt';
  	const BARTTRIPSFILE = 		'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/trips.txt';
  	const BARTSTOPTIMESFILE = 	'../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/stop_times.txt';

  	const COUNTYAGENCYFILE = 		'../assets/gtfs-files/county-connection_20160110_0842/agency.txt';
  	const COUNTYROUTESFILE = 		'../assets/gtfs-files/county-connection_20160110_0842/routes.txt';
  	const COUNTSTOPSFILE = 			'../assets/gtfs-files/county-connection_20160110_0842/stops.txt';
  	const COUNTYCALENDARFILE = 		'../assets/gtfs-files/county-connection_20160110_0842/calendar.txt';
  	const COUNTYTRIPSFILE = 		'../assets/gtfs-files/county-connection_20160110_0842/trips.txt';
  	const COUNTYSTOPTIMESFILE = 	'../assets/gtfs-files/county-connection_20160110_0842/stop_times.txt';

  	const CALAGENCYFILE = 		'../assets/gtfs-files/GTFS Caltrain Devs/agency.txt';
  	const CALROUTESFILE = 		'../assets/gtfs-files/GTFS Caltrain Devs/routes.txt';
  	const CALSTOPSFILE = 		'../assets/gtfs-files/GTFS Caltrain Devs/stops.txt';
  	const CALCALENDARFILE = 	'../assets/gtfs-files/GTFS Caltrain Devs/calendar.txt';
  	const CALTRIPSFILE = 		'../assets/gtfs-files/GTFS Caltrain Devs/trips.txt';
  	const CALSTOPTIMESFILE = 	'../assets/gtfs-files/GTFS Caltrain Devs/stop_times.txt';

  	const ACAGENCYFILE = 		'../assets/gtfs-files/gtfsmarch202016b/agency.txt';
  	const ACROUTESFILE = 		'../assets/gtfs-files/gtfsmarch202016b/routes.txt';
  	const ACSTOPSFILE = 		'../assets/gtfs-files/gtfsmarch202016b/stops.txt';
  	const ACCALENDARFILE = 		'../assets/gtfs-files/gtfsmarch202016b/calendar.txt';
  	const ACTRIPSFILE = 		'../assets/gtfs-files/gtfsmarch202016b/trips.txt';
  	const ACSTOPTIMESFILE = 	'../assets/gtfs-files/gtfsmarch202016b/stop_times.txt';

  	const LAVTAAGENCYFILE = 	'../assets/gtfs-files/LAVTA/agency.txt';
  	const LAVTAROUTESFILE = 	'../assets/gtfs-files/LAVTA/routes.txt';
  	const LAVTASTOPSFILE = 		'../assets/gtfs-files/LAVTA/stops.txt';
  	const LAVTACALENDARFILE = 	'../assets/gtfs-files/LAVTA/calendar.txt';
  	const LAVTATRIPSFILE = 		'../assets/gtfs-files/LAVTA/trips.txt';
  	const LAVTASTOPTIMESFILE = 	'../assets/gtfs-files/LAVTA/stop_times.txt';

  	const MARINAGENCYFILE = 	'../assets/gtfs-files/marin-transit_20160122_0121/agency.txt';
  	const MARINROUTESFILE = 	'../assets/gtfs-files/marin-transit_20160122_0121/routes.txt';
  	const MARINSTOPSFILE = 		'../assets/gtfs-files/marin-transit_20160122_0121/stops.txt';
  	const MARINCALENDARFILE = 	'../assets/gtfs-files/marin-transit_20160122_0121/calendar.txt';
  	const MARINTRIPSFILE = 		'../assets/gtfs-files/marin-transit_20160122_0121/trips.txt';
  	const MARINSTOPTIMESFILE = 	'../assets/gtfs-files/marin-transit_20160122_0121/stop_times.txt';

  	const SAMAGENCYFILE = 		'../assets/gtfs-files/SamTrans/agency.txt';
  	const SAMROUTESFILE = 		'../assets/gtfs-files/SamTrans/routes.txt';
  	const SAMSTOPSFILE = 		'../assets/gtfs-files/SamTrans/stops.txt';
  	const SAMCALENDARFILE = 	'../assets/gtfs-files/SamTrans/calendar.txt';
  	const SAMTRIPSFILE = 		'../assets/gtfs-files/SamTrans/trips.txt';
  	const SAMSTOPTIMESFILE = 	'../assets/gtfs-files/SamTrans/stop_times.txt';

  	const STMTAAGENCYFILE = 	'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/agency.txt';
  	const STMTAROUTESFILE = 	'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/routes.txt';
  	const STMTASTOPSFILE = 		'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/stops.txt';
  	const STMTACALENDARFILE = 	'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/calendar.txt';
  	const STMTATRIPSFILE = 		'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/trips.txt';
  	const STMTASTOPTIMESFILE = 	'../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/stop_times.txt';

  	const SRCBAGENCYFILE = 		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/agency.txt';
  	const SRCBROUTESFILE = 		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/routes.txt';
  	const SRCBSTOPSFILE = 		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/stops.txt';
  	const SRCBCALENDARFILE = 	'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/calendar.txt';
  	const SRCBTRIPSFILE = 		'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/trips.txt';
  	const SRCBSTOPTIMESFILE = 	'../assets/gtfs-files/santa-rosa-citybus_20130423_1906/stop_times.txt';

  	const VTAAGENCYFILE = 		'../assets/gtfs-files/VTA/agency.txt';
  	const VTAROUTESFILE = 		'../assets/gtfs-files/VTA/routes.txt';
  	const VTASTOPSFILE = 		'../assets/gtfs-files/VTA/stops.txt';
  	const VTACALENDARFILE = 	'../assets/gtfs-files/VTA/calendar.txt';
  	const VTATRIPSFILE = 		'../assets/gtfs-files/VTA/trips.txt';
  	const VTASTOPTIMESFILE = 	'../assets/gtfs-files/VTA/stop_times.txt';

  	/**
  	 * Populate agencies in the db
  	 * @return {Promise} Promise
  	 */
  	let _populateAgencies = function() {

  		return new Promise((resolve, reject) => {

  			try {

  				appmods.FileUtility.parseFiles([BARTAGENCYFILE, COUNTYAGENCYFILE,
	  			CALAGENCYFILE, ACAGENCYFILE, LAVTAAGENCYFILE, MARINAGENCYFILE,
	  			SAMAGENCYFILE, STMTAAGENCYFILE, SRCBAGENCYFILE, VTAAGENCYFILE]).then(data => {

		  			data.forEach(datum => {

		  				datum.data.forEach( d => {

		  					_db.put(appmods.PublicTransportationDB.agencyStore, {

		  						agencyId: d.agency_id,
								agencyLang: d.agency_lang,
								agencyName: d.agency_name,
								agencyTimezone: d.agency_timezone,
								agencyUrl: d.agency_url

		  					});

		  				});

		  			});

		  			return resolve();

	  			});

  			} catch(err) {

  				return reject(err);

  			}

  		});

  	};

  	/**
  	 * Populate calendar items in the db
  	 * @param  {Object} agencyName Selected agency name
  	 * @return {Promise}            Promise
  	 */
  	let _populateCalendars = function(agencyName) {

  		try {

	  		let fileRef = '';

	  		switch(agencyName) {

	  			case 'Bay Area Rapid Transit':
	  				fileRef = BARTCALENDARFILE;
	  				break;
	  			case 'County Connection':
	  				fileRef = COUNTYCALENDARFILE;
	  				break;
	  			case 'Caltrain':
	  				fileRef = CALCALENDARFILE;
	  				break;
	  			case 'AC Transit':
	  				fileRef = ACCALENDARFILE;
	  				break;
	  			case 'Wheels Bus':
	  				fileRef = LAVTACALENDARFILE;
	  				break;
	  			case 'Marin Transit':
	  				fileRef = MARINCALENDARFILE;
	  				break;
	  			case 'SamTrans':
	  				fileRef = SAMCALENDARFILE;
	  				break;
	  			case 'San Francisco Municipal Transportation Agency':
	  				fileRef = STMTACALENDARFILE;
	  				break;
	  			case 'Santa Rosa CityBus':
	  				fileRef = SRCBCALENDARFILE;
	  				break;
	  			case 'VTA':
	  				fileRef = VTACALENDARFILE;
	  				break;						

	  		}

	  		if(fileRef !== '') {

	  			return new Promise((resolve, reject) => {

	  				appmods.FileUtility.parseFiles([fileRef]).then(data => {

			  			data.forEach(datum => {

			  				datum.data.forEach( d => {

			  					_db.put(appmods.PublicTransportationDB.calendarStore, {

			  						endDate: 	d.end_date,
									friday: 	d.friday,
									monday: 	d.monday,
									saturday: 	d.saturday,
									serviceId: 	d.service_id,
									startDate: 	d.start_date,
									sunday: 	d.sunday,
									thursday: 	d.thursday,
									tuesday: 	d.tuesday,
									wednesday: 	d.wednesday,
									agency_name: agencyName	

			  					});

			  				});

			  			});

			  			return resolve();

		  			});

	  			});

	  		} else {

	  			return reject();

	  		}

  		} catch(err) {

			return reject(err);

		}

  	};

  	let _populateRoutes = function(agencyName) {

  		try {

	  		let fileRef = '';

	  		switch(agencyName) {

	  			case 'Bay Area Rapid Transit':
	  				fileRef = BARTROUTESFILE;
	  				break;
	  			case 'County Connection':
	  				fileRef = COUNTYROUTESFILE;
	  				break;
	  			case 'Caltrain':
	  				fileRef = CALROUTESFILE;
	  				break;
	  			case 'AC Transit':
	  				fileRef = ACROUTESFILE;
	  				break;
	  			case 'Wheels Bus':
	  				fileRef = LAVTAROUTESFILE;
	  				break;
	  			case 'Marin Transit':
	  				fileRef = MARINROUTESFILE;
	  				break;
	  			case 'SamTrans':
	  				fileRef = SAMROUTESFILE;
	  				break;
	  			case 'San Francisco Municipal Transportation Agency':
	  				fileRef = STMTAROUTESFILE;
	  				break;
	  			case 'Santa Rosa CityBus':
	  				fileRef = SRCBROUTESFILE;
	  				break;
	  			case 'VTA':
	  				fileRef = VTAROUTESFILE;
	  				break;						

	  		}

	  		if(fileRef !== '') {

	  			return new Promise((resolve, reject) => {

	  				appmods.FileUtility.parseFiles([fileRef]).then(data => {

			  			data.forEach(datum => {

			  				datum.data.forEach( d => {

			  					_db.put(appmods.PublicTransportationDB.routesStore, {

			  						agencyId: 		d.agency_id,
									routeColor: 	d.route_color,
									routeId: 		d.route_id,
									routeLongName: 	d.route_long_name,
									routeShortName: d.route_short_name,
									routeTextColor: d.route_text_color,
									routeType:    	d.route_type,
									agency_name:   	agencyName	

			  					});

			  				});

			  			});

			  			return resolve();

		  			});

	  			});

	  		} else {

	  			return reject();

	  		}

  		} catch(err) {

			return reject(err);

		}

  	};

  	let _stopsFromFile = function(agency, routeCode, directionCode, tripId) {

  		let stopTimesFile = appmods.FileUtility.getStopTimesFile(agency);
  		let stops = [];
  		let stopTimes = [];

  		return new Promise(function(resolve, reject) {

  			if(stopTimesFile) {

  				appmods.FileUtility.parseFile([stopTimesFile]).then( parsedTimes => {

  					parsedTimes.data.forEach(function(stopTime) {

  						if(stopTime.trip_id === tripId) {

							stopTimes.push(stopTime);

						}

  					});

  					let stopsFile = appmods.FileUtility.getStopsFile(agency);

  					if(stopsFile) {

  						appmods.FileUtility.parseFile([stopsFile]).then( parsedStops => {

  							stopTimes.forEach( stopTime => {

  								parsedStops.data.forEach( stop => {

  									if(stopTime.stop_id === stop.stop_id) {

										let index = -1;

										for(let i = 0;i < stops.length; ++i) {

											if(stops[i].stop_id === stop.stop_id) {

												index = i;
												break;

											}

										}

										if(index === -1) {

											let stopObj = Object.create(null);
											stopObj.name = stop.stop_name;
											stopObj.code = stop.stop_id;

											stops.push(stopObj);

										}

									}

  								});

  							});

  							return resolve(stops);

  						});	

  					} else {

  						return reject('Stop file not found');

  					}

  				});	

  			} else {

  				return reject('Stop time file not found');

  			}

  		});

  	};

  	let _stopLoop = function(container, list) {

  		container.StopList.forEach( stop => {

			stop.Stop.forEach( s => {

				let stopObj = Object.create(null);
				stopObj.code = s._attr.StopCode._value;
				stopObj.name = s._attr.name._value;

				list.push(stopObj);

			});

		});

  	};

  	return class RealTimeData {

  		constructor() {

	    }

	    /**
	     * Gets the agencies
	     * @function
	     * 
	     */
	    getAgencies() {

	    	let that = this;

	    	return new Promise(function(resolve, reject) {

				_db.getAll(appmods.PublicTransportationDB.agencyStore).then( agencies => {

					if(agencies.length === 0) {

						return _populateAgencies().then(function() {

							return resolve(that.getAgencies());

						});					

					}

					return resolve(agencies);

				}, error => {

					return reject(error);

				});	

			});


	    }

	    /**
	     * Gets routes
	     * @function
	     * 
	     */
	    getRoutes(agency) {

	    	let that = this;

	    	return new Promise(function(resolve, reject) {

	  			try {

	  				_db.getAllByIndex(appmods.PublicTransportationDB.calendarStore,
					appmods.PublicTransportationDB.calendarAgencyIndex,
					agency.agencyName).then(function(calendars) {

						if(calendars.length ===0) {

							_db.clear(appmods.PublicTransportationDB.calendarStore).then(function() {

								return _populateCalendars(agency.agencyName).then(function() {

									return resolve(that.getRoutes(agency));

								});

							});

						} else {

							let weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
							let d = new Date();
							let day = weekdays[d.getDay()];
							let todaysCalendar;
							let returnRoutes = [];

							for(let i=0; i < calendars.length; ++i) {

								if(calendars[i][day] === "1") {

									todaysCalendar = calendars[i];
									break;

								}

							}

							if(todaysCalendar) {

								_db.getAllByIndex(appmods.PublicTransportationDB.routesStore, 
								appmods.PublicTransportationDB.agencyNameIndex, 
								agency.agencyName).then( routes => {

									if(routes.length === 0) {

										return _db.clear(appmods.PublicTransportationDB.routesStore).then(function() {

											return _populateRoutes(agency.agencyName).then(function() {

												return resolve(that.getRoutes(agency));

											});

										});

									} else {

										let tripFile = appmods.FileUtility.getTripFile(agency.agencyName);

										if(tripFile) {

											let trips = [];

						  					appmods.FileUtility.parseFile([tripFile]).then( parsedTrips => {

						  						parsedTrips.data.forEach( trip => {

						  							if(todaysCalendar.service_id === trip.service_id) {

						  								trips.push(trip);

						  							}

						  						});

						  						trips.forEach( trip=> {

						  							routes.forEach( route => {

						  								if(route.agency_name && route.route_id && route.route_id === trip.route_id) {

						  									let routeObj = Object.create(null);

							  								routeObj.agency = 			route.agency_name;
							  								routeObj.code = 			route.route_id;
															routeObj.name = 			route.route_short_name || route.route_long_name;
															routeObj.tripId =			trip.trip_id;
															routeObj.directionList = 	[];

															let index = -1;

															for(let i = 0; i < returnRoutes.length; ++i) {

																if(returnRoutes[i].name === routeObj.name) {

																	index = i;
																	break;

																}

															}

															if(index === -1) {

																returnRoutes.push(routeObj);

															}

						  								}

						  							});

						  						});

						  						return resolve(returnRoutes);

						  					});

										}

									}

								});

							}

						}

					});

	  			} catch(error) {

	  				return reject(error);

	  			}

	  		});


	    }

	    /**
	     * Gets stops
	     * @function
	     * 
	     */
	    getStops(agency, routeCode, directionCode, tripId) {

	    	return new Promise(function(resolve, reject) {

	    		return resolve(_stopsFromFile(agency, routeCode, directionCode, tripId));

		    });


	    }

	    /**
	     * Gets stop times
	     * @function
	     * 
	     */
	    getStopTimes(departure, tripId) {

	    	let stopTimesFile = appmods.FileUtility.getStopTimesFile(departure);
	    	let stopTimes = [];

	    	return new Promise( (resolve, reject) => {

	    		if(stopTimesFile) {

		    		appmods.FileUtility.parseFile([stopTimesFile]).then( parsedTimes => {

		    			parsedTimes.data.forEach( stopTime => {

		    				if(stopTime.trip_id === tripId) {

		    					let timeObj = Object.create(null);

		    					timeObj.arrivalTime = 		stopTime.arrival_time;
		    					timeObj.departureTime = 	stopTime.departure_time;
		    					timeObj.dropOffType = 		stopTime.drop_off_type;
		    					timeObj.pickupType = 		stopTime.pickup_type;
		    					timeObj.shapeDistTraveled = stopTime.shape_dist_traveled;
		    					timeObj.stopHeadsign =		stopTime.stop_headsign;
		    					timeObj.stopId =			stopTime.stop_id;
		    					timeObj.stopSequence =		stopTime.stop_sequence;
		    					timeObj.timepoint =			stopTime.timepoint;
		    					timeObj.tripId =			stopTime.trip_id; 

								stopTimes.push(timeObj);

							}

		    			});

		    			return resolve(stopTimes);

		    		});	

		    	} else {

		    		return reject('Stop time file not found');

		    	}

	    	});

	    }

  	};

})(document);  