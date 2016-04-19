/*jshint esversion: 6 */
var appmods = appmods || Object.create(null);

appmods.RealTimeData = (function(document) {
  'use strict';

  	let _db = new appmods.PublicTransportationDB();

  	let _agenciesFromDb = function() {

  		return new Promise(function(resolve, reject) {

			_db.getAll(appmods.PublicTransportationDB.agencyStore).then(function(agencies) {

				return resolve(agencies);

			}, function(error) {

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

					let weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'tursday', 'friday', 'saturday'];
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
						departure).then(function(routes) {

							let tripFile = appmods.FileUtility.getTripFile(app.departure);

							if(tripFile) {

								let trips = [];

			  					appmods.FileUtility.parseFile([tripFile]).then(function(parsedTrips) {

			  						parsedTrips.data.forEach(trip => {

			  							if(todaysCalendar.service_id === trip.service_id) {

			  								trips.push(trip);

			  							}

			  						});

			  						trips.forEach(trip=> {

			  							routes.forEach(route => {

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

  				appmods.FileUtility.parseFile([stopTimesFile]).then(function(parsedTimes) {

  					parsedTimes.forEach(function(stopTime) {

  						if(stopTime.trip_id === val.item.tripId) {

							stopTimes.push(stopTime);

						}

  					});

  					let stopsFile = appmods.FileUtility.getStopsFile(app.departure);

  					if(stopsFile) {

  						appmods.FileUtility.parseFile([stopsFile]).then(function(parsedStops) {

  							stopTimes.forEach(function(stopTime) {

  								parsedStops.forEach(function(stop) {

  									if(stopTime.stop_id === stop.stop_id) {

										let index = -1;

										for(let i = 0;i < stops.length; ++i) {

											if(stops[i].stop_id === stop.stop_id) {

												index = i;
												break;

											}

										}

										if(index === -1) {

											stops.push(stop);

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

							appmods.ParseHelper.parseXML(data).then(function(parsedData) {

								let agencyList = [];

								parsedData.forEach(agency => {

									let agencyObj = Object.create(null);

									agencyObj.agency_name = agency._attr.Name._value;

									agencyList.push(agencyObj);

								});

								return resolve(agencyList);

							}, function(error) {

								return resolve(_agenciesFromDb());

							});

						});

					}).catch(function(error) {

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
				}).then(function(response) {

					response.text().then(function(data) {

						let routes = [];

						appmods.ParseHelper.parseXML(data).then(function(parsedData) {

							parsedData.forEach(agency => {

  								agency.RouteList.forEach(routeList => {

  									routeList.Route.forEach(route => {

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

						}, function(error) {

							return _routesFromDb(agency);

						});

					});

				}).catch(function(error) {

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
					}).then(function(response) {

						let stops = [];

						response.text().then(function(data) {

							appmods.ParseHelper.parseXML(data).then(function(parsedData) {

								parsedData.forEach(function(agency) {

									agency.RouteList.forEach(route => {

										route.Route.forEach(r => {

											r.RouteDirectionList.forEach(direction => {

												direction.RouteDirection.forEach(d => {

													d.StopList.forEach(stop => {

														stop.Stop.forEach(s => {

															let stopObj = Object.create(null);
															stopObj.code = s._attr.StopCode._value;
															stopObj.name = s._attr.name._value;

															stops.push(stopObj);

														});

													});

												});

											});

										});

									});

								});

								return resolve(stops);

							}, function(error) {

								return resolve(_stopsFromFile(agency, routeCode, directionCode, tripId));

							});

						});

					}).catch(function(error) {

						return resolve(_stopsFromFile(agency, routeCode, directionCode, tripId));

					});

		    	});


	    }

  	};

})(document);  