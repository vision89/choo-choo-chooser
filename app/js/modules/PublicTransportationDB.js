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
	const _agency_name_index =		'agency_name';
	const _calendar_agency_index =	'calendar_agency_index';

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
		 * Agency Name Index
		 * @return {string} agencyNameIndex
		 * @memberof PublicTransportationDB
		 * @type {string}
		 * 
		 */
		static get agencyNameIndex() {

			return _agency_name_index;

		}

		/**
		 * Calendar Agency Index
		 * @return {string} calendarAgencyIndex
		 * @memberof PublicTransportationDB
		 * @type {string}
		 * 
		 */
		static get calendarAgencyIndex() {

			return _calendar_agency_index;

		}

		/**
		 * Open the db
		 * @function
		 * @public
		 * 
		 */
		open() {

			_dbPromise = idb.open(_dbname, 2, upgradeDb => {

				let agencyStore;
				let calendarStore;
				let calendarDatesStore;
				let routeStore;
				let stopTimesStore;
				let stopsStore;
				let tripsStore;
				let versionStore;
				
				switch(upgradeDb.oldVersion) {

					case 0:
						agencyStore = 			upgradeDb.createObjectStore(_agency_store, {keyPath: 'id', autoIncrement:true});
						calendarStore = 		upgradeDb.createObjectStore(_calendar_store, {keyPath: 'id', autoIncrement:true});
						calendarDatesStore = 	upgradeDb.createObjectStore(_calendar_dates_store, {keyPath: 'id', autoIncrement:true});
						routeStore = 			upgradeDb.createObjectStore(_routes_store, {keyPath: 'route_id'});
						stopTimesStore = 		upgradeDb.createObjectStore(_stop_times_store, {keyPath: 'id', autoIncrement:true});
						stopsStore = 			upgradeDb.createObjectStore(_stops_store, {keyPath: 'stop_id'});
						tripsStore = 			upgradeDb.createObjectStore(_trips_store, {keyPath: 'id', autoIncrement:true});
						versionStore = 			upgradeDb.createObjectStore(_version_store, {keyPath: 'version'});
					case 1:
						routeStore.createIndex(_agency_name_index, _agency_name_index, { unique: false });
						calendarStore.createIndex(_calendar_agency_index, _agency_name_index, { unique: false });

				}
				

			});

		}

		/**
		 * Insert a value
		 * @function
		 * @public
		 * @param  {string} storeNamme The object store
		 * @param  {string} value The value to be stored
		 * @return {object}       promise
		 * 
		 */
		put(storeName, value) {

			return _dbPromise.then(function(db) {

				if (!db) return;

				let tx = db.transaction(storeName, 'readwrite');
				let store = tx.objectStore(storeName);
				store.put(value);
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

				if (!db) return;

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

				if (!db) return;

				let tx = db.transaction(storeName, 'readwrite');
				let store = tx.objectStore(storeName);

				return store.getAll();

			});

		}

		/**
		 * Get where
		 * @param  {string} storeName 	The object store
		 * @param  {string} indexName 	The index for the store
		 * @param  {string} value 		The value to match
		 * @return {object}       promise
		 */
		getAllByIndex(storeName, indexName, value) {

			return _dbPromise.then(function(db) {

				if (!db) return;

				let tx = db.transaction(storeName, 'readwrite');
				let store = tx.objectStore(storeName);
				let index = store.index(indexName);

				return index.getAll(value);

			});

		}

	};

})();