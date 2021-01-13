import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentTop10CreatorsComponent } from './patent-top10-creators.component';

describe('PatentTop10CreatorsComponent', () => {
  let component: PatentTop10CreatorsComponent;
  let fixture: ComponentFixture<PatentTop10CreatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatentTop10CreatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentTop10CreatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
