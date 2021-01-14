import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphWrapperComponent } from './graph-wrapper.component';

describe('GraphWrapperComponent', () => {
  let component: GraphWrapperComponent;
  let fixture: ComponentFixture<GraphWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
