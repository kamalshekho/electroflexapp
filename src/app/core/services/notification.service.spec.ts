/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificatioService } from './notificatio.service';

describe('Service: Notificatio', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificatioService]
    });
  });

  it('should ...', inject([NotificatioService], (service: NotificatioService) => {
    expect(service).toBeTruthy();
  }));
});
