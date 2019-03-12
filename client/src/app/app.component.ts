import { Component, OnInit } from '@angular/core';
import { SearchHandlerService } from './services/search-handler.service';
import { Lodge } from './classes/Lodge';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'magicseaweed-coding-test-James-Prescott';
	dataDisplayed = false;

	constructor(private searchHandlerService: SearchHandlerService) { }

	ngOnInit() {
		this.searchHandlerService.itemsUpdated.subscribe((data: Lodge[]) => {
			this.dataDisplayed = true;
		});
	}
}
