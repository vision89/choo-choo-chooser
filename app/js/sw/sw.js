/*jshint esversion: 6 */
console.log('Service Worker');
self.addEventListener('fetch', function(event) {

	console.log('url: ', event.request.url);

	if(event.request.url.endsWith('.jpg')) {

		console.log('Getting the image!!!!');

		event.respondWith(
			fetch('/assets/images/stock-photo-46082604-fast-train-with-motion-blur.jpg')
		);

	}

});