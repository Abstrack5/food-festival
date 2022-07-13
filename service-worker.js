const APP_PREFIX = "FoodFest-";
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
  "./index.html",
  "./events.html",
  "./tickets.html",
  "./schedule.html",
  "./assets/css/style.css",
  "./assets/css/bootstrap.css",
  "./assets/css/tickets.css",
  "./dist/app.bundle.js",
  "./dist/events.bundle.js",
  "./dist/tickets.bundle.js",
  "./dist/schedule.bundle.js",
];


// We use e.waitUntil to tell the browser to wait until the work is complete before
// terminating the service worker. This ensures that the service worker doesn't move
// on from the installing phase until it's finished executing all of its code.

// We use caches.open to find the specific cache by name, then add every file in the
// FILES_TO_CACHE array to the cache.
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("installing cache : " + CACHE_NAME);
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// In the activation step, we clear out any old data from the cache and, in the same step,
// tell the service worker how to manage caches.
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      let cacheKeeplist = keyList.filter(function (key) {
        return keylist.indexOf(APP_PREFIX);
        // .keys() returns an array of all cache names, which we're calling keyList. keyList is a
        // parameter that contains all cache names under <username>.github.io. Because we may host many
        // sites from the same URL, we should filter out caches that have the app prefix. We'll capture
        // the ones that have that prefix, stored in APP_PREFIX, and save them to an array called cacheKeeplist
        // using the .filter() method.
      });
      // we need to add the current cache to the keeplist in the activate event listener
      cacheKeeplist.push(CACHE_NAME);

      // This last bit of the activate listener returns a Promise that resolves once all old versions of the
      // cache have been deleted.
      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheKeeplist.indexOf(key) === -1) {
            console.log("deleting cache : " + keyList[i]);
            return caches.delete(keyList[i]);
          }``
        })
      );
    })
  );
});


// Here, we listen for the fetch event, log the URL of the requested resource, and then begin to 
// define how we will respond to the request.
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
// Notice that we're using a method on the event object called respondWith to intercept the fetch 
// request. In the code that we'll be writing next, the following lines will check to see if the request 
// is stored in the cache or not. If it is stored in the cache, e.respondWith will deliver the resource 
// directly from the cache; otherwise the resource will be retrieved normally.
    e.respondWith(
        // we use .match() to determine if the resource already exists in caches. If it does, we'll log 
        // the URL to the console with a message and then return the cached resource
        caches.match(e.request).then(function (request) {
            if(request)  { // if cache is available, respond with cache
                console.log('responding with cache : ' + e.request.url)
                return request
            }  else { // if there are no cache, try fetching request
        //if the resource is not in caches, we allow the resource to be retrieved from the online network as usual
                console.log('file is not cached, fetching : ' + e.request.url)
                return fetch(e.request)
            }

        // You can omit if/else for console.log & put one line below like this too.
        // return request || fetch(e.request)    

        })

    )
})




// npm run start:dev
// npx serve ./
