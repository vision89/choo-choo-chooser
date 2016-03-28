/*jshint esversion: 6 */
var appmods = appmods || Object.create(null);

appmods.ScriptLoader = (function(document) {
  'use strict';

  //Based this on the loadScripts from the wittr udacity app
  return class ScriptLoader {

    constructor() {

    }

    /**
     * Lazy load our scripts
     * @function
     * @static
     * 
     */
    static loadScripts(urls, yeyCallback, neyCallback) {

      let count = urls.length;
      let errored = false;

      if (urls.length === 0) {

        return yeyCallback();

      }  

      urls.forEach(url => {

        let script = document.createElement('script');

        script.onload = function() {

          if (errored) return;
          if (!--count) yeyCallback();

        };

        script.onerror = function() {

          if (errored) {

            return;

          }
            
          neyCallback();
          errored = true;

        };

        script.src = url;
        document.head.insertBefore(script, document.head.firstChild);

      });

    }

  };

})(document);