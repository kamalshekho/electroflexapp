import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Electricians } from './electricians';

describe('Electricians', () => {
  let component: Electricians;
  let fixture: ComponentFixture<Electricians>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Electricians]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Electricians);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
