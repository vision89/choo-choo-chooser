/*jshint esversion: 6 */
(function() {
	'use strict';

	let staticCacheName = 'public-transportation-static-v1';

	//Awesomeness 6
	self.addEventListener('install', function(event) {

		event.waitUntil(

			caches.open('public-transportation-static-v1').then(function(cache) {

				return cache.addAll([

					'index.html',
					'bower_components/material-design-lite/material.min.css',
					'https://fonts.googleapis.com/icon?family=Material+Icons',
					'css/styles.css',
					'elements/elements.html',
					'bower_components/iron-flex-layout/iron-flex-layout-classes.html',
					'bower_components/iron-flex-layout/iron-flex-layout.html',
					'bower_components/iron-iconset/iron-iconset.html',
					'bower_components/iron-icons/iron-icons.html',
					'bower_components/iron-input/iron-input.html',
					'bower_components/iron-label/iron-label.html',
					'bower_components/iron-list/iron-list.html',
					'bower_components/iron-media-query/iron-media-query.html',
					'bower_components/neon-animation/neon-animated-pages.html',
					'bower_components/paper-button/paper-button.html',
					'bower_components/paper-drawer-panel/paper-drawer-panel.html',
					'bower_components/paper-header-panel/paper-header-panel.html',
					'bower_components/paper-toolbar/paper-toolbar.html',
					'bower_components/paper-listbox/paper-listbox.html',
					'bower_components/paper-fab/paper-fab.html',
					'bower_components/paper-card/paper-card.html',
					'bower_components/paper-icon-button/paper-icon-button.html',
					'bower_components/paper-item/paper-item.html',
					'bower_components/paper-spinner/paper-spinner.html',
					'bower_components/paper-input/paper-input.html',
					'bower_components/paper-dropdown-menu/paper-dropdown-menu.html',
					'bower_components/xmlToJSON.js/lib/xmlToJSON.js',
					'elements/agency-card.html',
					'elements/route-card.html',
					'elements/direction-card.html',
					'elements/departure-card.html',
					'elements/destination-card.html',
					'elements/departure-times-card.html',
					'elements/destination-times-card.html',
					'elements/duration-info-card.html',
					'elements/shared-styles.html',
					'bower_components/EventListener/EventListener.js',
					'bower_components/EventListener/EventListener.oldie.js',
					'bower_components/webcomponentsjs/webcomponents-lite.js',
					'js/all.js',
					'bower_components/EventListener/EventListener.js',
					'bower_components/es6-promise/es6-promise.min.js',
					'bower_components/paper-toast/paper-toast.html',
					'assets/images/stock-photo-46082604-fast-train-with-motion-blur.jpg',
					'bower_components/IndexedDBShim/dist/indexeddbshim.min.js',
					'bower_components/indexeddb-promised/lib/idb.js',
					'bower_components/gtfs-feed/dev/gtfs-feed.html',
					'assets/gtfs-files/bay-area-rapid-transit_20160122_0103/agency.txt',
					'assets/gtfs-files/bay-area-rapid-transit_20160122_0103/calendar.txt',
					'assets/gtfs-files/bay-area-rapid-transit_20160122_0103/calendar_dates.txt',
					'assets/gtfs-files/bay-area-rapid-transit_20160122_0103/routes.txt',
					'assets/gtfs-files/bay-area-rapid-transit_20160122_0103/stop_times.txt',
					'assets/gtfs-files/bay-area-rapid-transit_20160122_0103/stops.txt',
					'assets/gtfs-files/bay-area-rapid-transit_20160122_0103/trips.txt',
					'assets/gtfs-files/county-connection_20160110_0842/agency.txt',
					'assets/gtfs-files/county-connection_20160110_0842/calendar.txt',
					'assets/gtfs-files/county-connection_20160110_0842/calendar_dates.txt',
					'assets/gtfs-files/county-connection_20160110_0842/routes.txt',
					'assets/gtfs-files/county-connection_20160110_0842/stop_times.txt',
					'assets/gtfs-files/county-connection_20160110_0842/stops.txt',
					'assets/gtfs-files/county-connection_20160110_0842/trips.txt',
					'assets/gtfs-files/GTFS Caltrain Devs/agency.txt',
					'assets/gtfs-files/GTFS Caltrain Devs/calendar.txt',
					'assets/gtfs-files/GTFS Caltrain Devs/calendar_dates.txt',
					'assets/gtfs-files/GTFS Caltrain Devs/routes.txt',
					'assets/gtfs-files/GTFS Caltrain Devs/stop_times.txt',
					'assets/gtfs-files/GTFS Caltrain Devs/stops.txt',
					'assets/gtfs-files/GTFS Caltrain Devs/trips.txt',
					'assets/gtfs-files/gtfsmarch202016b/agency.txt',
					'assets/gtfs-files/gtfsmarch202016b/calendar.txt',
					'assets/gtfs-files/gtfsmarch202016b/calendar_dates.txt',
					'assets/gtfs-files/gtfsmarch202016b/routes.txt',
					'assets/gtfs-files/gtfsmarch202016b/stop_times.txt',
					'assets/gtfs-files/gtfsmarch202016b/stops.txt',
					'assets/gtfs-files/gtfsmarch202016b/trips.txt',
					'assets/gtfs-files/LAVTA/agency.txt',
					'assets/gtfs-files/LAVTA/calendar.txt',
					'assets/gtfs-files/LAVTA/calendar_dates.txt',
					'assets/gtfs-files/LAVTA/routes.txt',
					'assets/gtfs-files/LAVTA/stop_times.txt',
					'assets/gtfs-files/LAVTA/stops.txt',
					'assets/gtfs-files/LAVTA/trips.txt',
					'assets/gtfs-files/marin-transit_20160122_0121/agency.txt',
					'assets/gtfs-files/marin-transit_20160122_0121/calendar.txt',
					'assets/gtfs-files/marin-transit_20160122_0121/calendar_dates.txt',
					'assets/gtfs-files/marin-transit_20160122_0121/routes.txt',
					'assets/gtfs-files/marin-transit_20160122_0121/stop_times.txt',
					'assets/gtfs-files/marin-transit_20160122_0121/stops.txt',
					'assets/gtfs-files/marin-transit_20160122_0121/trips.txt',
					'assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/agency.txt',
					'assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/calendar.txt',
					'assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/calendar_dates.txt',
					'assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/routes.txt',
					'assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/stop_times.txt',
					'assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/stops.txt',
					'assets/gtfs-files/san-francisco-municipal-transportation-agency_20160202_0116/trips.txt',
					'assets/gtfs-files/santa-rosa-citybus_20130423_1906/agency.txt',
					'assets/gtfs-files/santa-rosa-citybus_20130423_1906/calendar.txt',
					'assets/gtfs-files/santa-rosa-citybus_20130423_1906/calendar_dates.txt',
					'assets/gtfs-files/santa-rosa-citybus_20130423_1906/routes.txt',
					'assets/gtfs-files/santa-rosa-citybus_20130423_1906/stop_times.txt',
					'assets/gtfs-files/santa-rosa-citybus_20130423_1906/stops.txt',
					'assets/gtfs-files/santa-rosa-citybus_20130423_1906/trips.txt',
					'assets/gtfs-files/VTA/agency.txt',
					'assets/gtfs-files/VTA/calendar.txt',
					'assets/gtfs-files/VTA/calendar_dates.txt',
					'assets/gtfs-files/VTA/routes.txt',
					'assets/gtfs-files/VTA/stop_times.txt',
					'assets/gtfs-files/VTA/stops.txt',
					'assets/gtfs-files/VTA/trips.txt'
				]);

			})

		);

	});

	self.addEventListener('activate', function(event) {

		event.waitUntil(

			caches.keys().then(function(cacheNames) {

				return Promise.all(

					cacheNames.filter(function(cacheName) {

						return cacheName.startsWith('public-transportation-static-') && cacheName !== staticCacheName;

					}).map(function(cacheName) {

						return cache.delete(cacheName);

					})

				);

			})

		);

	});

	self.addEventListener('fetch', function(event) {

		event.respondWith(

			caches.match(event.request).then(function(response) {

				if(response) {

					return response;

				}

				let fetchRequest = event.request.clone();

				return fetch(fetchRequest).then(function(response) {

					if(!response || response.status !== 200 || response.type !== 'basic') {

						return response;

					}

					let responseToCache = response.clone();

					 if(fetchRequest.method === 'GET') {

						caches.open(staticCacheName).then(function(cache) {

							cache.put(event.request, responseToCache);
							
						});

					}

					return response;

				});

			}));

	});

	/**
	 * Get messages from the front
	 * @param  {object} event
	 */
	self.addEventListener('message', function(event) {

		if (event.data.action === 'skipWaiting') {

			self.skipWaiting();
		
		}

	});

})();