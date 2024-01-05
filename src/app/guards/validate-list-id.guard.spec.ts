import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validateListIdGuard } from './validate-list-id.guard';

describe('validateListIdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validateListIdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
