import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonCreatorsComponent } from './comparison-creators.component';

describe('ComparisonCreatorsComponent', () => {
  let component: ComparisonCreatorsComponent;
  let fixture: ComponentFixture<ComparisonCreatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonCreatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonCreatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
