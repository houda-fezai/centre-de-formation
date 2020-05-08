import { TestBed, async, inject } from '@angular/core/testing';

import { AuthTrGuard } from './auth-tr.guard';

describe('AuthTrGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthTrGuard]
    });
  });

  it('should ...', inject([AuthTrGuard], (guard: AuthTrGuard) => {
    expect(guard).toBeTruthy();
  }));
});
