import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGarage } from './my-garage';

describe('MyGarage', () => {
  let component: MyGarage;
  let fixture: ComponentFixture<MyGarage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyGarage],
    }).compileComponents();

    fixture = TestBed.createComponent(MyGarage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
