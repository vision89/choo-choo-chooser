/*jshint esversion: 6 */
(function(document) {
	'use strict';

	let _app = document.querySelector('#app');
	let _isOpening = false;

	_app.files = [
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

	_app.updatedJsonFiles = function() {

		console.log('Json from files: ', _app.filesJson);

	};

	_app.gtfsErrorFiles = function(err) {

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

			_app.reloadPage = function() {

				worker.postMessage({action: 'skipWaiting'});

				_app.$.reloadtoast.close();

				window.location.reload();

			};

			_app.$.reloadtoast.open();

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
		App.ScriptLoader.loadScripts(neededScripts, function() {

			/**
			 * Selected view
			 * @type {number}
			 */
	  		_app.selected = 0;

	  		/**
			 * Show the map view
			 * @function viewMap
			 *
			 */
	  		_app.viewMap = function() {

	  			app.selected = 0;

	  		};

	  		/**
			 * Show the schedule view
			 * @function viewSchedule
			 *
			 */
	  		_app.viewSchedule = function() {

	  			_app.selected = 1;

	  		};

	  		/**
			 * Populate drawer with departure info
			 * @function populateDeparture
			 *
			 */
	  		_app.populateDeparture = function() {

	  			_isOpening = !_isOpening;

	  			if(_isOpening) {

	  				//Get the departure data
	  				fetch('http://services.my511.org/Transit2.0/GetAgencies.aspx?token=9506841f-7aad-4b10-b015-8eb38a2d6223',{
	  					method: 'GET',
						mode: 'cors',
						headers: new Headers({
							'Content-Type': 'text/xml; charset=utf-8'
						})
					}).then(function(response) {

						console.log('Response: ', response);

	  					response.text().then(function(data) {

	  						console.log('Data: ', data);

	  					});

	  				}).catch(function(error) {

	  					console.log('Error! ', error);

	  				});

	  			}

	  			_app.$.paperDrawerPanel.togglePanel();

	  		};

	  		/**
			 * Populate drawer with destination info
			 * @function populateDeparture
			 *
			 */
	  		_app.populateDestination = function() {

	  			_isOpening = !_isOpening;

	  			if(_isOpening) {

	  				//Get the departure data
	  				
	  			}

	  			_app.$.paperDrawerPanel.togglePanel();

	  		};

	  		/**
	  		 * Received the agencies
	  		 * @param  {object} response list of agencies
	  		 */
	  		_app.agencyResponse = function(response) {

	  			console.log('Agencies: ', response);

	  		};

	  		/**
	  		 * Parse the gtfs files
	  		 */
	  		_app.$.gtfsfiles.parseFiles();

			/**

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
							_app.online = false;
							break;
						case 'Map Good':
							_app.online = true;
							break;
						case 'skipWaiting':
							console.log('Calling skipwaiting');
							navigator.serviceWorker.skipWaiting();
							break;

					}

				});

			}

			**/

		});
  		
  	});

})(document);	