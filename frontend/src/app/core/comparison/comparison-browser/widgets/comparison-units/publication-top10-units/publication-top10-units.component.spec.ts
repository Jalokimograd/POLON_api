import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationTop10UnitsComponent } from './publication-top10-units.component';

describe('PublicationTop10UnitsComponent', () => {
  let component: PublicationTop10UnitsComponent;
  let fixture: ComponentFixture<PublicationTop10UnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationTop10UnitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationTop10UnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
