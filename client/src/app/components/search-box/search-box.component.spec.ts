import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SearchBoxComponent } from './search-box.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { Lodge } from 'src/app/classes/Lodge';
import { SearchHandlerService } from 'src/app/services/search-handler.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { EventEmitter } from '@angular/core';

describe('SearchBoxComponent', () => {
	let component: SearchBoxComponent;
	let fixture: ComponentFixture<SearchBoxComponent>;

	let ApiServiceStub: Partial<ApiService>;
	let SearchHandlerServiceStub: Partial<SearchHandlerService>;
	let GeolocationServiceStub: Partial<GeolocationService>;

	ApiServiceStub = {
		generateRequest: () => {
			return new Observable<Object>();
		}
	};

	SearchHandlerServiceStub = {
		itemsUpdated: new EventEmitter<Lodge[]>(),
		listItems: (data: {[k: string]: any}) => {}
	};

	GeolocationServiceStub = {
		getLatLong: () => {
			return '-4, 1';
		}
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SearchBoxComponent],
			imports: [FormsModule],
			providers:    [
				{
					provide: ApiService,
					useValue: ApiServiceStub
				},
				{
					provide: SearchHandlerService,
					usevalue: SearchHandlerServiceStub
				},
				{
					provide: GeolocationService,
					useValue: GeolocationServiceStub
				}
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
		expect(component.value).toBe('');
	});

	describe('when location selector is clicked', () => {
		it('should set the textbox value to the current location', () => {
			component.locationClick();
			expect(component.value).not.toBe('');
		});
	});

	describe('when user searches for a set of co-ordinates', () => {
		it('should accept valid co-ordinates', fakeAsync(() => {
			const apiService = fixture.debugElement.injector.get(ApiService);
			spyOn(apiService, 'generateRequest').and.callThrough();
			spyOn(window, 'alert');
			component.value = '12, -8.426';
			component.searchClick();
			tick();
			expect(apiService.generateRequest).toHaveBeenCalled();
			expect(window.alert).not.toHaveBeenCalledWith(component.value + ' doesn\'t look like a set of co-ordinates to me...');
		}));

		it('should reject invalid characters with an alert', () => {
			const apiService = fixture.debugElement.injector.get(ApiService);
			const searchHandlerService = fixture.debugElement.injector.get(SearchHandlerService);
			spyOn(apiService, 'generateRequest').and.callThrough();
			spyOn(window, 'alert');
			component.value = '12, YB8.426';
			component.searchClick();
			expect(apiService.generateRequest).not.toHaveBeenCalled();
			expect(window.alert).toHaveBeenCalledWith(component.value + ' doesn\'t look like a set of co-ordinates to me...');
		});
	});
});
