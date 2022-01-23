const _createClass = (function() {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

/**
 * GoogleMapsApi
 * Class to load google maps api with api key
 * and global Callback to init map after resolution of promise.
 *
 * @exports {GoogleMapsApi}
 * @example MapApi = new GoogleMapsApi();
 *          MapApi.load().then(() => {});
 */
const GoogleMapsApi = (function() {
  /**
   * Constructor
   * @property {string} apiKey
   * @property {string} callbackName
   */
  function GoogleMapsApi(gApiKey) {
    _classCallCheck(this, GoogleMapsApi);

    // api key for google maps
    this.apiKey = gApiKey;

    // Set global callback
    if (!window._GoogleMapsApi) {
      this.callbackName = '_GoogleMapsApi.mapLoaded';
      window._GoogleMapsApi = this;
      window._GoogleMapsApi.mapLoaded = this.mapLoaded.bind(this);
    }
  }

  /**
   * Load
   * Create script element with google maps
   * api url, containing api key and callback for
   * map init.
   * @return {promise}
   * @this {_GoogleMapsApi}
   */

  _createClass(GoogleMapsApi, [
    {
      key: 'load',
      value: function load() {
        const _this = this;

        if (!this.promise) {
          this.promise = new Promise(function(resolve) {
            _this.resolve = resolve;

            if (typeof window.google === 'undefined') {
              const script = document.createElement('script');
              script.src =
                '//maps.googleapis.com/maps/api/js?key=' +
                _this.apiKey +
                '&callback=' +
                _this.callbackName;
              script.async = true;
              document.body.append(script);
            } else {
              _this.resolve();
            }
          });
        }

        return this.promise;
      },

      /**
       * mapLoaded
       * Global callback for loaded/resolved map instance.
       * @this {_GoogleMapsApi}
       *
       */
    },
    {
      key: 'mapLoaded',
      value: function mapLoaded() {
        if (this.resolve) {
          this.resolve();
        }
      },
    },
  ]);

  return GoogleMapsApi;
})();

export default GoogleMapsApi;
