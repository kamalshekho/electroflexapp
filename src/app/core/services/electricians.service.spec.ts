/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElectriciansService } from './electricians.service';

describe('Service: Electricians', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElectriciansService]
    });
  });

  it('should ...', inject([ElectriciansService], (service: ElectriciansService) => {
    expect(service).toBeTruthy();
  }));
});
