/*jshint esversion: 6 */
var appmods = appmods || Object.create(null);

appmods.FileUtility = (function(document) {
  'use strict';

	const _ACTRANSIT = 			'AC Transit';
	const _BART = 				'Bay Area Rapid Transit';
	const _COUNTYCONNECTION = 	'County Connection';
	const _CALTRAIN =			'Caltrain';
	const _LAVTA =				'Wheels Bus';
	const _MARINTRANSIT =		'Marin Transit';
	const _SAMTRANS =			'SamTrans';
	const _SFMTA =				'San Francisco Municipal Transportation Agency';
	const _VTA =				'VTA';
	const _SRCB =				'Santa Rosa CityBus';

	return class FileUtility {

		constructor() {

		}

		/**
		 * AC Transit Agency
		 * @return {string} acTransit
		 * @memberof ParseFile
		 * @type {string}
		 * 
		 */
		static get acTransit() {

			return _ACTRANSIT;

		}

		/**
		 * Bart Agency
		 * @return {string} bart
		 * @memberof ParseFile
		 * @type {string}
		 * 
		 */
		static get bart() {

			return _BART;

		}

		/**
		 * County Connection Agency
		 * @return {string} countyConnection
		 * @memberof ParseFile
		 * @type {string}
		 * 
		 */
		static get countyConnection() {

			return _COUNTYCONNECTION;

		}

		/**
		 * Cal Train Agency
		 * @return {string} calTrain
		 * @memberof ParseFile
		 * @type {string}
		 * 
		 */
		static get calTrain() {

			return _CALTRAIN;

		}

		/**
		 * Lavta Agency
		 * @return {string} lavta
		 * @memberof ParseFile
		 * @type {string}
		 * 
		 */
		static get lavta() {

			return _LAVTA;

		}

		/**
		 * Marin Transit Agency
		 * @return {string} marinTransit
		 * @memberof ParseFile
		 * @type {string}
		 * 
		 */
		static get marinTransit() {

			return _MARINTRANSIT;

		}

		/**
		 * Sam Trans Agency
		 * @return {string} samTrans
		 * @memberof ParseFile
		 * @type {string}
		 * 
		 */
		static get samTrans() {

			return _SAMTRANS;

		}

		/**
		 * SFMTA Agency
		 * @return {string} sfmta
		 * @memberof ParseFile
		 * @type {string}
		 * 
		 */
		static get sfmta() {

			return _SFMTA;

		}

		/**
		 * VTA Agency
		 * @return {string} vta
		 * @memberof ParseFile
		 * @type {string}
		 * 
		 */
		static get vta() {

			return _VTA;

		}

		/**
		 * SRCB Agency
		 * @return {string} srcb
		 * @memberof ParseFile
		 * @type {string}
		 * 
		 */
		static get srcb() {

			return _SRCB;

		}

		/**
		 * Gets the trip file
		 * @function
		 * @param  {string} agency
		 * @return {string} file ref
		 * 
		 */
		static getTripFile(agency) {

			let file = '';

			switch(agency) {

				case _ACTRANSIT:
					file = '../assets/gtfs-files/gtfsmarch202016b/trips.txt';
					break;

				case _BART:
					file = '../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/trips.txt';
					break;

				case _COUNTYCONNECTION:
					file = '../assets/gtfs-files/county-connection_20160110_0842/trips.txt';
					break;

				case _CALTRAIN:
					file = '../assets/gtfs-files/GTFS Caltrain Devs/trips.txt';
					break;

				case _LAVTA:
					file = '../assets/gtfs-files/LAVTA/trips.txt';
					break;

				case _MARINTRANSIT:
					file = '../assets/gtfs-files/marin-transit_20160122_0121/trips.txt';
					break;

				case _SAMTRANS:
					file = '../assets/gtfs-files/SamTrans/trips.txt';
					break;

				case _SFMTA:
					file = '../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/trips.txt';
					break;

				case _VTA:
					file = '../assets/gtfs-files/VTA/trips.txt';
					break;

				case _SRCB:
					file = '../assets/gtfs-files/santa-rosa-citybus_20130423_1906/trips.txt';
					break;

			}

			return file;

		}

		/**
		 * Gets the stops file
		 * @function
		 * @param  {string} agency
		 * @return {string} file ref
		 * 
		 */
		static getStopsFile(agency) {

			let file = '';

			switch(agency) {

				case _ACTRANSIT:
					file = '../assets/gtfs-files/gtfsmarch202016b/stops.txt';
					break;

				case _BART:
					file = '../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/stops.txt';
					break;

				case _COUNTYCONNECTION:
					file = '../assets/gtfs-files/county-connection_20160110_0842/stops.txt';
					break;

				case _CALTRAIN:
					file = '../assets/gtfs-files/GTFS Caltrain Devs/stops.txt';
					break;

				case _LAVTA:
					file = '../assets/gtfs-files/LAVTA/stops.txt';
					break;

				case _MARINTRANSIT:
					file = '../assets/gtfs-files/marin-transit_20160122_0121/stops.txt';
					break;

				case _SAMTRANS:
					file = '../assets/gtfs-files/SamTrans/stops.txt';
					break;

				case _SFMTA:
					file = '../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/stops.txt';
					break;

				case _VTA:
					file = '../assets/gtfs-files/VTA/stops.txt';
					break;

				case _SRCB:
					file = '../assets/gtfs-files/santa-rosa-citybus_20130423_1906/stops.txt';
					break;

			}

			return file;	

		}

		/**
		 * Gets the stop times file
		 * @function
		 * @param  {string} agency
		 * @return {string} file ref
		 * 
		 */
		static getStopTimesFile(agency) {

			let file = '';

			switch(agency) {

				case _ACTRANSIT:
					file = '../assets/gtfs-files/gtfsmarch202016b/stop_times.txt';
					break;

				case _BART:
					file = '../assets/gtfs-files/bay-area-rapid-transit_20160122_0103/stop_times.txt';
					break;

				case _COUNTYCONNECTION:
					file = '../assets/gtfs-files/county-connection_20160110_0842/stop_times.txt';
					break;

				case _CALTRAIN:
					file = '../assets/gtfs-files/GTFS Caltrain Devs/stop_times.txt';
					break;

				case _LAVTA:
					file = '../assets/gtfs-files/LAVTA/stop_times.txt';
					break;

				case _MARINTRANSIT:
					file = '../assets/gtfs-files/marin-transit_20160122_0121/stop_times.txt';
					break;

				case _SAMTRANS:
					file = '../assets/gtfs-files/SamTrans/stop_times.txt';
					break;

				case _SFMTA:
					file = '../assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/stop_times.txt';
					break;

				case _VTA:
					file = '../assets/gtfs-files/VTA/stop_times.txt';
					break;

				case _SRCB:
					file = '../assets/gtfs-files/santa-rosa-citybus_20130423_1906/stop_times.txt';
					break;

			}

			return file;

		}

	}	

})();
