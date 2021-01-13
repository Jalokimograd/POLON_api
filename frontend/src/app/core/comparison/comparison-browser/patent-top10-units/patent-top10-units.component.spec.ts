import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentTop10UnitsComponent } from './patent-top10-units.component';

describe('PatentTop10UnitsComponent', () => {
  let component: PatentTop10UnitsComponent;
  let fixture: ComponentFixture<PatentTop10UnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatentTop10UnitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentTop10UnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
