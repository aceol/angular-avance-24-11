import { inject } from '@angular/core';
import { catchError, EMPTY, zip } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { BasketService } from '../basket/basket.service';
import { CatalogService } from './catalog.service';

export const catalogResolver = () => {
  const alertService = inject(AlertService);
  const basketService = inject(BasketService);
  const catalogService = inject(CatalogService);
  return zip([basketService.fetch(), catalogService.fetch()])
    .pipe(
      catchError((e) => {
        alertService.addDanger('Impossible de récuperer les données');
        console.error(e.message);
        return EMPTY;
      }),
    )
    .subscribe();
};
