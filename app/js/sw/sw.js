/*jshint esversion: 6 */
self.addEventListener('fetch', function(event) {

	console.log(event.request);
	console.log('Hello SW!');

});