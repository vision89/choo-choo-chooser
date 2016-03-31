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
	const _version_store =			'public-transportation-version';

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
		 * Version Store Name
		 * @return {string} versionStore
		 * @memberof PublicTransportationDB
		 * @type {string}
		 * 
		 */
		static get versionStore() {

			return _version_store;

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
						upgradeDb.createObjectStore(_agency_store, {keyPath: 'agency_id'});
						upgradeDb.createObjectStore(_calendar_store, {keyPath: 'service_id'});
						upgradeDb.createObjectStore(_calendar_dates_store);
						upgradeDb.createObjectStore(_routes_store, {keyPath: 'route_id'});
						upgradeDb.createObjectStore(_stop_times_store);
						upgradeDb.createObjectStore(_stops_store, {keyPath: 'stop_id'});
						upgradeDb.createObjectStore(_trips_store);
						upgradeDb.createObjectStore(_version_store, {keyPath: 'version'});

				}
				

			});

		}

		/**
		 * Insert a value
		 * @function
		 * @public
		 * @param  {string} storeNamme The object store
		 * @param  {string} key   The object key
		 * @param  {string} value The value to be stored
		 * @return {object}       promise
		 * 
		 */
		put(storeName, key, value) {

			return _dbPromise.then(function(db) {

				let tx = db.transaction(storeName, 'readwrite');
				let store = tx.objectStore(storeName);
				store.put(value, key);
				return tx.complete;

			});

		}

		/**
		 * Check number of records in the store
		 * @param  {string} storeName The object store
		 * @return {object}       promise
		 */
		count(storeName) {

			return _dbPromise.then(function(db) {

				let tx = db.transaction(storeName, 'readwrite');
				let store = tx.objectStore(storeName);
				
				return store.count();

			});

		}

		/**
		 * Get all the values
		 * @param  {string} storeName The object store
		 * @return {object}       promise
		 */
		getAll(storeName) {

			return _dbPromise.then(function(db) {

				let tx = db.transaction(storeName, 'readwrite');
				let store = tx.objectStore(storeName);

				return store.getAll();

			});

		}

	};

})();