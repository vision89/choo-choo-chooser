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

	let _fileNames = [

		{
		  file: 'agency.txt',
		  prop: 'agency'
		},
		{
		  file: 'stops.txt',
		  prop: 'stops'
		},
		{
		  file: 'routes.txt',
		  prop: 'routes'
		},
		{
		  file: 'trips.txt',
		  prop: 'trips'
		},
		{
		  file: 'stop_times.txt',
		  prop: 'stop_times'
		},
		{
		  file: 'calendar.txt',
		  prop: 'calendar'
		},
		{
		  file: 'calendar_dates.txt',
		  prop: 'calendar_dates'
		},
		{
		  file: 'fare_attributes.txt',
		  prop: 'fare_attributes'
		},
		{
		  file: 'fare_rules.txt',
		  prop: 'fare_rules'
		},
		{
		  file: 'shapes.txt',
		  prop: 'shapes'
		},
		{
		  file: 'frequencies.txt',
		  prop: 'frequencies'
		},
		{
		  file: 'transfers.txt',
		  prop: 'transfers'
		},
		{
		  file: 'feed_info.txt',
		  prop: 'feed_info'
		}

	];

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

		static parseFile(files) {

			let tally = 0;
			let total = files.length;
			let json = 	Object.create(null);

			return new Promise((resolve, reject) => {

		        try {

		          files.forEach(url => {

		            let prop = '';

		            for(let i = 0; i < _fileNames.length; ++i) {

		              if(url.endsWith(_fileNames[i].file)) {

		                prop = _fileNames[i].prop;

		              }

		            }

		            if(prop) {

		              Papa.parse(url, {
		              download: true,
		              header: true,
		              skipEmptyLines: true,
		              before: (url, inputElem) =>
		                {
		                  // executed before parsing each file begins;
		                  // what you return here controls the flow
		                },
		                error: (err, file, inputElem, reason) =>
		                {
		                  // executed if an error occurs while loading the file,
		                  // or if before callback aborted for some reason

		                  //Still counts against our files
		                  ++tally;

		                  //If this is the last file alert the parent
		                  if(tally === total) {

		                    return reject(err);

		                  }

		                },
		                complete: results =>
		                {

		                  //If this is the last file alert the parent
		                  ++tally;
		                  if(tally === total) {

		                    return resolve(results);

		                  }

		                }
		              });

		            } else {

		              return reject('File does not conform to gtfs standard');

		            }

		          });

		        } catch( err ) {

		          return reject(err);

		        }

	      });

		}

		static parseFiles(files) {

			let promises = [];

			files.forEach(url => {

				promises.push(

					new Promise((resolve, reject) => {

						Papa.parse(url, {
							download: true,
							header: true,
							skipEmptyLines: true,
							before: (url, inputElem) =>
							{
							  // executed before parsing each file begins;
							  // what you return here controls the flow
							},
							error: (err, file, inputElem, reason) =>
							{
							  // executed if an error occurs while loading the file,
							  // or if before callback aborted for some reason

							  return reject(err);

							},
							complete: results =>
							{

							  //If this is the last file alert the parent
							  return resolve(results);

							}
						});

					})

				);	

			});

			return Promise.all(promises);

		}

	};	

})();
