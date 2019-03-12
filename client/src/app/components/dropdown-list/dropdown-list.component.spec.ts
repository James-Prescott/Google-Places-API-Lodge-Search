import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownListComponent } from './dropdown-list.component';
import { Lodge } from 'src/app/classes/Lodge';

describe('DropdownListComponent', () => {
	let component: DropdownListComponent;
	let fixture: ComponentFixture<DropdownListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DropdownListComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DropdownListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
		expect(component.hidden).toBe(true);
		expect(component.dropdownItems.length).toBe(0);
	});

	it('should update the list', () => {
		const testData: Lodge[] = [
			new Lodge ('lodge1', '2.3', 'open'),
			new Lodge ('lodge2', '2.7', 'closed')
		];
		component.updateList(testData);
		expect(component.hidden).toBe(false);
		expect(component.dropdownItems).toBe(testData);
	});
});
