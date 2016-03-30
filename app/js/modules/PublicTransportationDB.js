/*jshint esversion: 6 */
var appmods = appmods || Object.create(null);

appmods.PublicTransportationDB = (function() {
	'use strict';

	const _dbname = 				'public-transportation-db-v1';
	const _agency_store = 			'public-transportation-agency';
	const _calendar_store = 		'public-transportation-calendar';
	const _calendar_dates_store = 	'public-transportation-calendar-dates';
	const _routes_store = 			'public-transportation-routes';
	const _stop_times_store = 		'public-transportation-stop-times';
	const _stops_store = 			'public-transportations-stops';
	const _trips_store = 			'public-transportation-trips';

	let _dbPromise;

	return class PublicTransportationDB {

		constructor() {

		}

		/**
		 * Agency Store Name
		 * @return {string} agencyStore
		 * @memberof PublicTransportationDB
		 * @type {string}
		 * 
		 */
		static get agencyStore() {

			return _agency_store;

		}

		/**
		 * Calendar Store Name
		 * @return {string} calendarStore
		 * @memberof PublicTransportationDB
		 * @type {string}
		 * 
		 */
		static get calendarStore() {

			return _calendar_store;
			
		}

		/**
		 * Calendar Store Name
		 * @return {string} calendarDatesStore
		 * @memberof PublicTransportationDB
		 * @type {string}
		 * 
		 */
		static get calendarDatesStore() {

			return _calendar_dates_store;
			
		}

		/**
		 * Routes Store Name
		 * @return {string} routesStore
		 * @memberof PublicTransportationDB
		 * @type {string}
		 * 
		 */
		static get routesStore() {

			return _routes_store;
			
		}

		/**
		 * Stop Times Store Name
		 * @return {string} stopTimesStore
		 * @memberof PublicTransportationDB
		 * @type {string}
		 * 
		 */
		static get stopTimesStore() {

			return _stop_times_store;
			
		}

		/**
		 * Stops Store Name
		 * @return {string} stopsStore
		 * @memberof PublicTransportationDB
		 * @type {string}
		 * 
		 */
		static get stopsStore() {

			return _stops_store;
			
		}

		/**
		 * Trips Store Name
		 * @return {string} tripsStore
		 * @memberof PublicTransportationDB
		 * @type {string}
		 * 
		 */
		static get tripsStore() {

			return _trips_store;
			
		}

		/**
		 * Open the db
		 * @function
		 * @public
		 * 
		 */
		open() {

			_dbPromise = idb.open(_dbname, 1, upgradeDb => {

				
				switch(upgradeDb.oldVersion) {

					case 0:
						upgradeDB.createObjectStore(_agency_store, {keyPath: 'agency_id'});
						upgradeDB.createObjectStore(_calendar_store, {keyPath: 'service_id'});
						upgradeDB.createObjectStore(_calendar_dates_store);
						upgradeDB.createObjectStore(_routes_store, {keyPath: 'route_id'});
						upgradeDB.createObjectStore(_stop_times_store);
						upgradeDB.createObjectStore(_stops_store, {keyPath: 'stop_id'});
						upgradeDB.createObjectStore(_trips_store);

				}
				

			});

		}

		/**
		 * Insert a value
		 * @function
		 * @public
		 * 
		 */
		put(store, key, value) {

			return _dbPromise.then(function(db) {

				let tx = db.transaction(store, 'write');
				let store = tx.objectStore(store);
				store.put(value, key);
				return tx.complete;

			});

		}

	};

})();