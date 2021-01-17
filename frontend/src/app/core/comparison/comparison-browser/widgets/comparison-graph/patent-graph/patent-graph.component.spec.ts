import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentGraphComponent } from './patent-graph.component';

describe('PatentGraphComponent', () => {
  let component: PatentGraphComponent;
  let fixture: ComponentFixture<PatentGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatentGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
