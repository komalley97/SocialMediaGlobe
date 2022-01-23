/**
 * Setup map class with predefined attributes
 * Add init method to create promise to renderMap function
 */
 import {renderMap} from './gMap/gMap';
 import GoogleMapsApi from './gMap/GoogleMapsApi';

 export class GoogleMap {
   constructor() {
    
    this.gApiKey = 'googleapikey';

   }

   init() {
    document.addEventListener('DOMContentLoaded', (event) => {
        const mapEl = document.querySelector('smglobe-gmap');

        mapEl.innerHTML = `
          <div class="hearbyMap js-map">
          </div>
          `;
        // set defaults for now
        mapEl.style.width = '500px';
        mapEl.style.height =  '400px';

        const gmapApi = new GoogleMapsApi(this.gApiKey);
        // Call map renderer
        gmapApi.load().then(() => {
          renderMap(this, mapEl);
        });
      });
    }
  }