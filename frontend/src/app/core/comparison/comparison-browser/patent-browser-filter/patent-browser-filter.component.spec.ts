import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentBrowserFilterComponent } from './patent-browser-filter.component';

describe('PatentBrowserFilterComponent', () => {
  let component: PatentBrowserFilterComponent;
  let fixture: ComponentFixture<PatentBrowserFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatentBrowserFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentBrowserFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
