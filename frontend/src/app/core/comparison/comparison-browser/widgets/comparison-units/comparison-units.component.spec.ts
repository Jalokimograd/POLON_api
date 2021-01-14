import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonUnitsComponent } from './comparison-units.component';

describe('ComparisonUnitsComponent', () => {
  let component: ComparisonUnitsComponent;
  let fixture: ComponentFixture<ComparisonUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonUnitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
