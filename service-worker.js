/**
 * Check out https://googlechrome.github.io/sw-toolbox/docs/master/index.html for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';

self.addEventListener('fetch', function(event) {
  console.log('Event:', event);
  if (event.request.url.indexOf('http://') === 0) {
    event.stopImmediatePropagation();
    console.log('Bypassing HTTP request to "' + event.request.url + '"');
  }
});

importScripts('./sw-toolbox.js');

self.toolbox.options = {
  debug: true,
  networkTimeoutSeconds: 30,
  cache: {
    name: 'cache',
    maxAgeSeconds: 60 * 60 * 24 // 1d
  }
};

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.networkFirst);

// Don't cache any 3rd party content, as it may not be HTTPS and fail
self.toolbox.router.default = self.toolbox.networkFirst;
