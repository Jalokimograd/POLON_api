import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserFilterComponent } from './browser-filter.component';

describe('PatentBrowserFilterComponent', () => {
  let component: BrowserFilterComponent;
  let fixture: ComponentFixture<BrowserFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowserFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
