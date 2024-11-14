import { inject, Injectable } from '@angular/core';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  #products$ = new BehaviorSubject<Product[]>([]);

  products$ = this.#products$.asObservable();

  private apiService = inject(ApiService);

  fetch(): Observable<Product[]> {
    return this.apiService.getProducts().pipe(tap((products) => this.#products$.next(products)));
  }

  isStockEmpty$: Observable<boolean> = this.#products$.pipe(
    map((products) => products.every(({ stock }) => stock === 0)),
  );

  isAvailable(product: Product): boolean {
    return product.stock > 0;
  }

  decreaseStock$(productId: string): void {
    this.#products$.next(
      this.#products$.value.map((product) => {
        if (product.id === productId) {
          return { ...product, stock: product.stock - 1 };
        }
        return product;
      }),
    );
  }

}
