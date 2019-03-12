import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(private http: HttpClient) {}

	/**
	 * Constructs & calls dispatch funciton for API request for /places
	 * @param lat Latitude for search
	 * @param lon Longitude for search
	 */
	public generateRequest(lat: string, lon: string) {
		const request = {
			url: 'http://localhost:3000/places',
			values: {
				lat: lat,
				lon: lon
			}
		};
		console.log(lat + ', '  + lon);
		return this.sendRequest(request); // TODO: Some error handling, but I don't have the time to implement it right now
	}

	/**
	 * Sends a http POST request to an endpoint with lat/long values
	 * @param request - Object: url for request & lat/long values
	 */
	private sendRequest(request: { url: string, values: { lat: string, lon: string } }) {
		return this.http.post(request.url, { lat: request.values.lat, lon: request.values.lon });
	}
}
