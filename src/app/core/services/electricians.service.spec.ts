import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ElectriciansService } from './electricians.service';

describe('ElectriciansService', () => {
  let service: ElectriciansService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ElectriciansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
