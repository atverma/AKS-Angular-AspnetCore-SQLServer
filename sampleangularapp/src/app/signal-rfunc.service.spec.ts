import { TestBed, inject } from '@angular/core/testing';

import { SignalRFuncService } from './signal-rfunc.service';

describe('SignalRFuncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignalRFuncService]
    });
  });

  it('should be created', inject([SignalRFuncService], (service: SignalRFuncService) => {
    expect(service).toBeTruthy();
  }));
});
