import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonBrowserComponent } from './comparison-browser.component';

describe('PatentBrowserComponent', () => {
  let component: ComparisonBrowserComponent;
  let fixture: ComponentFixture<ComparisonBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
