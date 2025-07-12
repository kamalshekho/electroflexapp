import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectriciansComponent } from './electricians.component';

describe('Electricians', () => {
  let component: ElectriciansComponent;
  let fixture: ComponentFixture<ElectriciansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectriciansComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ElectriciansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
