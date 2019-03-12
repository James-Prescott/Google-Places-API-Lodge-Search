import { Injectable, EventEmitter } from '@angular/core';
import { Lodge } from 'src/app/classes/Lodge';

@Injectable({
	providedIn: 'root'
})
export class SearchHandlerService {
	constructor() {}

	private lodges: Lodge[];

	public itemsUpdated: EventEmitter<Lodge[]> = new EventEmitter(true);

	/**
	 * Is called when new lodges are searched for & maps
	 * the data into an array in the format of the Lodge
	 * class
	 * @param data - GoogleAPI response data
	 */
	public listItems(data: {[k: string]: any}) {
		if (data.error) {
			alert('A ' + data.statusCode + 'error occurred. Please try again later.');
			return;
		}
		if (data.status === 'ZERO_RESULTS') {
			alert('There were no results found for those co-ordinates.');
			return;
		}
		if (this.lodges) {
			this.lodges.splice(0, this.lodges.length); // clear the array
		}
		data.results.forEach(element => {
			if (!this.lodges) {
				this.lodges = [
					new Lodge(
						element.name,
						element.rating,
						element.opening_hours
						)
				];
			}
			else {
				this.lodges.push(
					new Lodge(
						element.name,
						element.rating,
						element.opening_hours
					)
				);
			}
		});
		this.itemsUpdated.emit(this.lodges);
	}
}
