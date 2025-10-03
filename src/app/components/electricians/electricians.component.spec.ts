import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ElectriciansComponent } from './electricians.component';

describe('Electricians', () => {
  let component: ElectriciansComponent;
  let fixture: ComponentFixture<ElectriciansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectriciansComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ElectriciansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
