import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationBrowserListComponent } from './publication-browser-list.component';

describe('PublicationBrowserListComponent', () => {
  let component: PublicationBrowserListComponent;
  let fixture: ComponentFixture<PublicationBrowserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationBrowserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationBrowserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
