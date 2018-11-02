import { TestBed, inject } from '@angular/core/testing';

import { AuthHelperService } from './auth-helper.service';

describe('AuthHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthHelperService]
    });
  });

  it('should be created', inject([AuthHelperService], (service: AuthHelperService) => {
    expect(service).toBeTruthy();
  }));
});
