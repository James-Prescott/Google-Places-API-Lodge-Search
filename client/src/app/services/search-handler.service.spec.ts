import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SearchHandlerService } from './search-handler.service';
import { Lodge } from '../classes/Lodge';

describe('SearchHandlerService', () => {

	const testData1 = {
		status: '',
		results: [
			{
				name: 'testItem1',
				rating: '3.2',
				opening_hours: 'open'
			},
			{
				name: 'testItem2',
				rating: '4.7',
				opening_hours: 'closed'
			}
		]
	};

	const testData2 = {
		status: '',
		results: [
			{
				name: 'testItem3',
				rating: '1.6',
				opening_hours: 'closed'
			},
			{
				name: 'testItem4',
				rating: '2.1',
				opening_hours: 'open'
			}
		]
	};

	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: SearchHandlerService = TestBed.get(SearchHandlerService);
		expect(service).toBeTruthy();
	});

	it('should create an array of lodges from API data', () => {
		const service: SearchHandlerService = TestBed.get(SearchHandlerService);
		service.itemsUpdated.subscribe((lodges: Lodge[]) => {
			expect(lodges[0].name).toBe('testItem1');
			expect(lodges[0].rating).toBe('3.2');
			expect(lodges[0].openingHours).toBe('open');
			expect(lodges[1].name).toBe('testItem2');
			expect(lodges[1].rating).toBe('4.7');
			expect(lodges[1].openingHours).toBe('closed');
		});
		service.listItems(testData1);
	});

	it('should not emit event when there are no results', fakeAsync(() => {
		const service: SearchHandlerService = TestBed.get(SearchHandlerService);
		let flag = false;

		expect(service.itemsUpdated.subscribe((lodges) => {
			flag = true;
		}));
		tick();
		expect(flag).toBe(false);
		service.listItems({status: 'ZERO_RESULTS'});
	}));

	it('should replace array of lodges when new data set is given', () => {
		const service: SearchHandlerService = TestBed.get(SearchHandlerService);
		let count = 0;
		service.itemsUpdated.subscribe((lodges: Lodge[]) => {
			expect(lodges[count].name).toBe(testData1.results[count].name);
			expect(lodges[count].rating).toBe(testData1.results[count].rating);
			expect(lodges[count].openingHours).toBe(testData1.results[count].opening_hours);
			expect(lodges[count + 1].name).toBe(testData1.results[count + 1].name);
			expect(lodges[count + 1].rating).toBe(testData1.results[count + 1].rating);
			expect(lodges[count + 1].openingHours).toBe(testData1.results[count + 1].opening_hours);
			count = 2;
			service.listItems(testData2);
		});
		service.listItems(testData1);
	});
});
