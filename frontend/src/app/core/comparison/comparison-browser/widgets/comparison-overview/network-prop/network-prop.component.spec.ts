import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkPropComponent } from './network-prop.component';

describe('NetworkPropComponent', () => {
  let component: NetworkPropComponent;
  let fixture: ComponentFixture<NetworkPropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkPropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
