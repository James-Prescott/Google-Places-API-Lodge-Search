import { Component, OnInit } from '@angular/core';
import { SearchHandlerService } from 'src/app/services/search-handler.service';
import { Lodge } from 'src/app/classes/Lodge';

@Component({
	selector: 'app-dropdown-list',
	templateUrl: './dropdown-list.component.html',
	styleUrls: ['./dropdown-list.component.scss']
})
export class DropdownListComponent implements OnInit {

	dropdownItems: Lodge[] = [];
	hidden = true;

	constructor(private searchHandlerService: SearchHandlerService) {}

	ngOnInit() {
		this.searchHandlerService.itemsUpdated.subscribe(
			(items: Lodge[]) => this.updateList(items)
		);
	}

	/**
	 * Triggers when the search handler service emits "itemsUpdated"
	 * @param items - Array of Lodge objects
	 */
	updateList(items: Lodge[]) {
		this.dropdownItems = items;
		this.hidden = false;
	}
}
