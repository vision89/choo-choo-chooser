/*jshint esversion: 6 */
self.addEventListener('install', function(event) {

	event.waitUntil(

		caches.open('public-transportation-static-v1').then(function(cache) {

			return cache.addAll([

				'/',
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
				'bower_components/paper-input/paper-input.html',
				'bower_components/google-map/google-map.html',
				'bower_components/google-map/google-map-directions.html',
				'bower_components/google-map/google-map-marker.html',
				'bower_components/google-map/google-map-point.html',
				'elements/map-page.html',
				'elements/schedule-page.html',
				'elements/shared-styles.html',
				'bower_components/EventListener/EventListener.js',
				'bower_components/EventListener/EventListener.oldie.js',
				'bower_components/webcomponentsjs/webcomponents-lite.js',
				'js/all.js',
				'bower_components/EventListener/EventListener.js',
				'bower_components/es6-promise/es6-promise.min.js'

			]);

		})

	);

});

//https://maps.googleapis.com/maps/api/js?callback=https___maps_googleapis_co…ization_api_loaded&v=3.exp&libraries=drawing,geometry,places,visualization
//If this route fails we are not connected to get the map

self.addEventListener('fetch', function(event) {

	if(event.request.url.indexOf('maps.googleapis.com') > -1) {

		return fetch(event.request).then(function(response) {

			self.clients.matchAll().then((clients) => {

				clients.map((client) => {

					return client.postMessage('Map Good');

				});

			});

			return response;

		}).catch(function() {

			// Broadcast to all open clients
			self.clients.matchAll().then((clients) => {

				clients.map((client) => {

					return client.postMessage('Map Error');

				});

			});

		});

	}

	event.respondWith(

		caches.match(event.request).then(function(response) {

			if(response) {

				return response;

			}

			return fetch(event.request);

		}));

});