import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GeolocationService {
	constructor() {}

	/**
	 * Returns lat/long string for devices current location using the JS geolocation API
	 */
	public getLatLong(callback, error) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(callback, error);
		}
		else {
			return '';
		}
	}
}
