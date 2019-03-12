import { TestBed } from '@angular/core/testing';

import { GeolocationService } from './geolocation.service';

describe('GeolocationService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: GeolocationService = TestBed.get(GeolocationService);
		expect(service).toBeTruthy();
	});

	it('should give client location', () => {
		// const service: GeolocationService = TestBed.get(GeolocationService);
		// const position = service.getLatLong();
		// expect(position).toBe(jasmine.any(String));

		// this is something I'd have to look into testing as it's not straightforward
	});
});
