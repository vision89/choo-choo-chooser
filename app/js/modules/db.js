/*jshint esversion: 6 */
var appmods = appmods || Object.create(null);

appmods.PublicTransportationDB = (function() {
	'use strict';

	const dbname = 'public-transportation-db-v1';

	return class PublicTransportationDB {

		constructor() {

		}

		/**
		 * Open the db
		 * @function
		 * @public
		 * 
		 */
		open() {

			idb.open(dbname, 1, upgradeDb => {

				switch(upgradeDb) {

					case 0:

						console.log('In DB');
						//fetch('')

						//upgradeDB.createObjectStore('key-val');

				}

			});

		}

	};

});