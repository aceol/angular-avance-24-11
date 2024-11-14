import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { basketEmptyGuard } from './basket-empty.guard';

describe('basketEmptyGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => basketEmptyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
