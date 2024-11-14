import { Component, inject, Inject, OnInit } from '@angular/core';
import { BasketItem } from '../basket/basket.types';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';
import { BasketService } from '../basket/basket.service';
import { CatalogService } from './catalog.service';
import { WELCOME_MSG } from '../app.token';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit{
  protected get isStockEmpty(): boolean {
    return this.catalogService.isStockEmpty;
  }


  protected get basketTotal(): number {
    return this.basketService.total;
  }

  private basketService = inject(BasketService);
  private catalogService = inject(CatalogService);
  protected welcomeMsg = inject(WELCOME_MSG);

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.basketService.fetch().subscribe();
    this.catalogService.fetch().subscribe();
  }

  protected get products(){
    return this.catalogService.items
  }

  protected addToBasket(product: Product): void {
    this.basketService.addItem(product.id).subscribe(() => {
      this.decreaseStock(product);
    });
  }

  private decreaseStock(product: Product): void {
    product.stock -= 1;
  }

  protected isAvailable(product: Product): boolean {
    return this.catalogService.isAvailable(product);
  }
}
