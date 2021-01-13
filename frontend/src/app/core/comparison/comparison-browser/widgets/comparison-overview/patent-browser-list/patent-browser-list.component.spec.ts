import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentBrowserListComponent } from './patent-browser-list.component';

describe('PatentBrowserListComponent', () => {
  let component: PatentBrowserListComponent;
  let fixture: ComponentFixture<PatentBrowserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatentBrowserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentBrowserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
