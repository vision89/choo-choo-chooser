/*jshint esversion: 6 */
var appmods = appmods || Object.create(null);

appmods.RealTimeData = (function(document) {
  'use strict';

  	let _db = new appmods.PublicTransportationDB();

  	let _agenciesFromDb = function() {

  		return new Promise(function(resolve, reject) {

			_db.getAll(appmods.PublicTransportationDB.agencyStore).then( agencies => {

				return resolve(agencies);

			}, error => {

				return reject(error);

			});	

		});

  	};

  	let _routesFromDb = function(departure) {

  		return new Promise(function(resolve, reject) {

  			try {

  				_db.getAllByIndex(appmods.PublicTransportationDB.calendarStore,
				appmods.PublicTransportationDB.calendarAgencyIndex,
				departure).then(function(calendars) {

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
						departure).then( routes => {

							let tripFile = appmods.FileUtility.getTripFile(departure);

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

						});

					}

				});

  			} catch(error) {

  				return reject(error);

  			}

  		});

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

	    	return new Promise(function(resolve, reject) {

	    		//Get the departure data
				fetch('http://services.my511.org/Transit2.0/GetAgencies.aspx?token=9506841f-7aad-4b10-b015-8eb38a2d6223',{
					method: 'GET',
					mode: 'cors',
					headers: new Headers({
						'Content-Type': 'text/xml; charset=utf-8'
					})
					}).then( response => {

						response.text().then( data => {

							appmods.ParseHelper.parseXML(data).then( parsedData => {

								let agencyList = [];

								parsedData.forEach( agency => {

									let agencyObj = Object.create(null);

									agencyObj.agency_name = agency._attr.Name._value;

									agencyList.push(agencyObj);

								});

								return resolve(agencyList);

							}, error => {

								return resolve(_agenciesFromDb());

							});

						});

					}).catch( error => {

						return resolve(_agenciesFromDb());

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
				}).then( response => {

					response.text().then( data => {

						let routes = [];

						appmods.ParseHelper.parseXML(data).then( parsedData => {

							parsedData.forEach( agency => {

  								agency.RouteList.forEach( routeList => {

  									routeList.Route.forEach( route => {

  										if(route._attr.Code._value && route._attr.Name._value) {

  											let routeObj = Object.create(null);

											routeObj.agency = 			agency._attr.Name._value;
											routeObj.code = 			route._attr.Code._value;
											routeObj.name = 			route._attr.Name._value;
											routeObj.directionList = 	route.RouteDirectionList || [];

											routes.push(routeObj);

  										}

	  								});

  								});

  							});

							return resolve(routes);

						}, error => {

							return _routesFromDb(agency);

						});

					});

				}).catch( error => {

					return resolve(_routesFromDb(agency));

				});

	    	});


	    }

	    /**
	     * Gets stops
	     * @function
	     * 
	     */
	    getStops(agency, routeCode, directionCode, tripId) {

	    	return new Promise(function(resolve, reject) {

	    		//Get the departure data
				fetch('http://services.my511.org/Transit2.0/GetStopsForRoute.aspx?token=9506841f-7aad-4b10-b015-8eb38a2d6223&routeIDF=' + agency + '~' + routeCode + '~' + directionCode,{
					method: 'GET',
					mode: 'cors',
					headers: new Headers({
						'Content-Type': 'text/xml; charset=utf-8'
					})
					}).then( response => {

						let stops = [];

						response.text().then( data => {

							appmods.ParseHelper.parseXML(data).then( parsedData => {

								parsedData.forEach( agency => {

									if(agency.RouteList) {

										agency.RouteList.forEach( route => {

											route.Route.forEach( r => {

												if(r.DirectionList) {

													r.RouteDirectionList.forEach( direction => {

														direction.RouteDirection.forEach( d => {

															_stopLoop(d, stops);

														});

													});

												} else if(r.StopList) {

													_stopLoop(r, stops);

												}

											});

										});

									}

								});

								return resolve(stops);

							}, error => {

								return resolve(_stopsFromFile(agency, routeCode, directionCode, tripId));

							});

						});

					}).catch( error => {

						return resolve(_stopsFromFile(agency, routeCode, directionCode, tripId));

					});

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