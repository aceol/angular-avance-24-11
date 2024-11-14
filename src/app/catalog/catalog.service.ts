import { inject, Injectable } from '@angular/core';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  items: Product[] = [];


  private apiService = inject(ApiService);

  fetch(): Observable<Product[]> {
    return this.apiService.getProducts().pipe(tap((items) => (this.items = items)));
  }

  get isStockEmpty() {
   return this.items.every(({ stock }) => stock === 0);
  }

  isAvailable(product: Product): boolean {
    return product.stock > 0;
  }

  decreaseStock(productId: string): void {
    this.items = this.items.map((product: Product) => {
      if(productId === product.id){
        return {...product, stock: product.stock -1}
      }
      return product;
    });
  }

}
