import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { map } from 'rxjs';
import { AlertService } from './alert/alert.service';
import { BasketService } from './basket/basket.service';

export const basketEmptyGuard: CanMatchFn = (route, segments) => {
  const alertService = inject(AlertService);
  const basketService = inject(BasketService);
  return basketService.numberOfItems$.pipe(
    map((nbItems) => {
      if (nbItems === 0) {
        alertService.addDanger('Le panier est vide');
        return true;
      }
      return false;
    }),
  );
};
