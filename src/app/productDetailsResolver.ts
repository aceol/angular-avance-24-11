import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { AlertService } from './alert/alert.service';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details/product-details.config';
import { Product } from './product/product.types';
import { ApiService } from './shared/services/api.service';

export const productDetailsResolver: ResolveFn<Product> = (route) => {
  const apiService = inject(ApiService);
  const alertService$ = inject(AlertService);

  return apiService.getProduct(route.params[PRODUCT_DETAILS_PARAM_KEY]).pipe(
    tap(console.log),
    catchError((e) => {
      alertService$.addDanger('Probleme pour recupérer le produit');
      return EMPTY;
    }),
  );
};
