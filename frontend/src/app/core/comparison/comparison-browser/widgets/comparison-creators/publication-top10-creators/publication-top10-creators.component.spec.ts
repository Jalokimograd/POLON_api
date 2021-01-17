import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationTop10CreatorsComponent } from './publication-top10-creators.component';

describe('PublicationTop10CreatorsComponent', () => {
  let component: PublicationTop10CreatorsComponent;
  let fixture: ComponentFixture<PublicationTop10CreatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationTop10CreatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationTop10CreatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
