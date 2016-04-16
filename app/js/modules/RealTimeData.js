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

  	}

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

			  					appmods.FileUtility.parseFiles([tripFile]).then(function(parsedTrips) {

			  						parsedTrips.forEach(trip => {

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

												for(let i = 0; i < routes.length; ++i) {

													if(routes[i].name === routeObj.name) {

														index = i;
														break;

													}

												}

												if(index === -1) {

													return resolve(routeObj);

												}

			  								}

			  							});

			  						});

			  					});

							}

						});

					}

				});

  			} catch(error) {

  				return reject(error);

  			}

  		});

  	}

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

							return reject(error);

						});

					});

				}).catch(function(error) {

					return reject(error);

				});

	    	});


	    }

	    /**
	     * Gets stops
	     * @function
	     * 
	     */
	    getStops(agency, routeCode, directionCode) {

	    	return new Promise(function(resolve, reject) {

	    		//Get the departure data
				fetch('http://services.my511.org/Transit2.0/GetStopsForRoute.aspx?token=9506841f-7aad-4b10-b015-8eb38a2d6223&routeIDF=' + agency + '~' + routeCode + '~' + directionCode,{
					method: 'GET',
					mode: 'cors',
					headers: new Headers({
						'Content-Type': 'text/xml; charset=utf-8'
					})
					}).then(function(response) {

						response.text().then(function(data) {

							appmods.ParseHelper.parseXML(data).then(function(parsedData) {

								return resolve(parsedData);

							}, function(error) {

								return reject(error);

							});

						});

					}).catch(function(error) {

						reject(error);

					});

		    	});


	    }

  	};

})(document);  