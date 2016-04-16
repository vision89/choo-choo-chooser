/*jshint esversion: 6 */
var appmods = appmods || Object.create(null);

appmods.ParseHelper = (function(document) {
    'use strict';

    return class ParseHelper {

		constructor() {

		}

		/**
		 * Parse xml to json
		 * @function
		 * 
		 */
	    static parseXML(xml) {

			return new Promise(function(resolve, reject) {

				try {

					let vals = xmlToJSON.parseString(xml);

					let jsonObj = Object.create(null);

					var updated = false;

					if(vals.RTT && vals.RTT.length > 0 && vals.RTT[0].AgencyList && vals.RTT[0].AgencyList.length > 0 && vals.RTT[0].AgencyList[0] && vals.RTT[0].AgencyList[0].Agency) {
					  
						return resolve(vals.RTT[0].AgencyList[0].Agency);

					}

				} catch(err) {

					return reject(err);

				}

			});

	    }

	};	

})(document);  