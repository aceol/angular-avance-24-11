import { CanActivateFn } from '@angular/router';
import { AlertService } from './alert/alert.service';
import { inject } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { map } from 'rxjs';

export const basketGuard: CanActivateFn = (route, state) => {
  const alertService = inject(AlertService);
  const basketService = inject(BasketService);
  return basketService.numberOfItems$.pipe(map((nbItems) => {
    if(nbItems === 0) {
      alertService.addDanger('Le panier est vide');
      return false;
    }
    return true;
  }
));
};
