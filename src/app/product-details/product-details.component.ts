import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details.config';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  protected product$: Observable<Product>;

  #apiService = inject(ApiService);
  #activatedRoute = inject(ActivatedRoute);
  #changeDetectorRef = inject(ChangeDetectorRef);

  constructor(
  ) {
    this.product$ = this.#apiService
      .getProduct(this.#activatedRoute.snapshot.params[PRODUCT_DETAILS_PARAM_KEY]);
  }
}
