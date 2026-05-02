import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrders } from './service-orders';

describe('ServiceOrders', () => {
  let component: ServiceOrders;
  let fixture: ComponentFixture<ServiceOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOrders],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
