import { TestBed, async, inject } from '@angular/core/testing';

import { AuthStGuard } from './auth-st.guard';

describe('AuthStGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthStGuard]
    });
  });

  it('should ...', inject([AuthStGuard], (guard: AuthStGuard) => {
    expect(guard).toBeTruthy();
  }));
});
