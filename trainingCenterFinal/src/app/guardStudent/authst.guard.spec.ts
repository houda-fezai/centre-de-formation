import { TestBed, async, inject } from '@angular/core/testing';

import { AuthstGuard } from './authst.guard';

describe('AuthstGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthstGuard]
    });
  });

  it('should ...', inject([AuthstGuard], (guard: AuthstGuard) => {
    expect(guard).toBeTruthy();
  }));
});
