import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SearchHandlerService } from 'src/app/services/search-handler.service';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
	selector: 'app-search-box',
	templateUrl: './search-box.component.html',
	styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

	value = '';

	constructor(
		private apiService: ApiService,
		private searchHandler: SearchHandlerService,
		private geolocationService: GeolocationService
	) { }

	ngOnInit() { }

	/**
	 * Gets current location from geolocation.service & sets value
	 * On failiure, alerts user
	 */
	async locationClick() {
		this.value = 'Calculating your position...';
		this.geolocationService.getLatLong(
			(pos) => {
				this.value = pos.coords.latitude.toString() +
				', ' +
				pos.coords.longitude.toString();
			},
			(err) => {
				alert('Your browser does not support geolocation.');
			}
		);
	}

	/**
	 * Search button onClick handler
	 */
	searchClick() {
		if (this.sanityCheck(this.value) === false) {
			alert(this.value + ' doesn\'t look like a set of co-ordinates to me...');
		}
		else {
			const lat = this.getLat(this.value);
			const lon = this.getLon(this.value);
			this.apiService.generateRequest(lat, lon).subscribe((response) => {
				this.searchHandler.listItems(response);
			});
		}
	}

	/**
	 * Gets the first value of a string with 2 values
	 * separated by a '/' or ','
	 * @param value - string separated by a '/' or ','
	 */
	private getLat(value: string) {
		value.replace(' ', ''); // remove spaces
		if (value.includes('/')) {
			return (value.split('/')[0]);
		}
		if (value.includes(',')) {
			return (value.split(',')[0]);
		}
	}

	/**
	 * Gets the second value of a string with 2 values
	 * separated by a '/' or ','
	 * @param value - string separated by a '/' or ','
	 */
	private getLon(value: string) {
		value.replace(' ', ''); // remove spaces
		if (value.includes('/')) {
			return (value.split('/')[1]);
		}
		if (value.includes(',')) {
			return (value.split(',')[1]);
		}
	}

	/**
	 * Checks given string and returns false if there are
	 * invalid characters. Returns true if string is sanitised.
	 * @param value - any string
	 */
	private sanityCheck(value: string) {
		let returnVal = true;
		value.split('').forEach(letter => {
			if (this.letterCheck(letter) === false) {
				returnVal = false;
			}
		});
		return(returnVal);
	}

	/**
	 * Checks a given character against an array of acceptable
	 * characters. Returns false if the character is not in the
	 * array. Returns true if the character is in the array.
	 * @param letter - single character
	 */
	private letterCheck(letter: string) {
		const ACCEPTABLE_CHARS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', ',', '.', '/', ' '];
		let returnVal = false;
		ACCEPTABLE_CHARS.forEach(acceptableChar => {
			if (letter === acceptableChar) {
				returnVal = true;
			}
		});
		return(returnVal);
	}
}
