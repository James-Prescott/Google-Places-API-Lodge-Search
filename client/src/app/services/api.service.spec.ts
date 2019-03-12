import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {
	HttpClientTestingModule,
	HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const testData = {
	values: {
		name: 'name',
		open: 'Open now',
		rating: '4/5'
	}
};

describe('ApiService', () => {
	let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;

	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		})
	);

	beforeEach(() => {
		// Inject the http service and test controller for each test
		httpClient = TestBed.get(HttpClient);
		httpTestingController = TestBed.get(HttpTestingController);
	});

	it('should be created', () => {
		const service: ApiService = TestBed.get(ApiService);
		expect(service).toBeTruthy();
	});

	describe('generateRequest()', () => {
		it('should send a request to the API & recieve valid response', () => {
			const service: ApiService = TestBed.get(ApiService);
			service.generateRequest('1', '2').subscribe((data) => {
				expect(data).toBe(testData);
			});
			const req = httpTestingController.expectOne('http://localhost:3000/places');
			expect(req.request.method).toEqual('POST');
			req.flush(testData);
		});
	});

	afterEach(() => {
		// After every test, assert that there are no more pending requests.
		httpTestingController.verify();
	});
});
