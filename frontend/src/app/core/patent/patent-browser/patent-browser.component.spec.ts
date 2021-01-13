import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentBrowserComponent } from './patent-browser.component';

describe('PatentBrowserComponent', () => {
  let component: PatentBrowserComponent;
  let fixture: ComponentFixture<PatentBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatentBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
