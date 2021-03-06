import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationGraphComponent } from './publication-graph.component';

describe('PublicationGraphComponent', () => {
  let component: PublicationGraphComponent;
  let fixture: ComponentFixture<PublicationGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
