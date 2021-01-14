import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonOverviewComponent } from './comparison-overview.component';

describe('ComparisonOverviewComponent', () => {
  let component: ComparisonOverviewComponent;
  let fixture: ComponentFixture<ComparisonOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
