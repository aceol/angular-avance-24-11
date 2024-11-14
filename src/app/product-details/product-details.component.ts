import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details.config';
import { catchError, EMPTY, Observable } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
    AsyncPipe,
    CurrencyPipe
],
})
export class ProductDetailsComponent {
  protected product$: Observable<Product>;

  #apiService = inject(ApiService);
  #activatedRoute = inject(ActivatedRoute);
  #changeDetectorRef = inject(ChangeDetectorRef);
  #alertService$ = inject(AlertService)

  constructor(
  ) {
    this.product$ = this.#apiService
      .getProduct(this.#activatedRoute.snapshot.params[PRODUCT_DETAILS_PARAM_KEY]).pipe(catchError((e) => {
        this.#alertService$.addDanger('Probleme pour recup le produit');
        return EMPTY;
      }))
  }
}
