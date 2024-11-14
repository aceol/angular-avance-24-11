import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../product/product.types';
import { BasketService } from '../basket/basket.service';
import { CatalogService } from './catalog.service';
import { WELCOME_MSG } from '../app.token';
import { catchError, EMPTY, Observable, tap, zip } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ProductComponent } from '../product/product.component';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    standalone: true,
    imports: [
    RouterLink,
    ProductComponent,
    AsyncPipe,
    CurrencyPipe
],
})
export class CatalogComponent {
  protected get isStockEmpty$(): Observable<boolean> {
    return this.catalogService.isStockEmpty$;
  }


  protected get basketTotal$(): Observable<number> {
    return this.basketService.total;
  }

  private basketService = inject(BasketService);
  private catalogService = inject(CatalogService);
  protected welcomeMsg = inject(WELCOME_MSG);
  protected alertService = inject(AlertService);

  protected get products$(){
    return this.catalogService.products$
  }

  protected addToBasket(product: Product): void {
    this.basketService.addItem(product.id).subscribe(() => {
      this.decreaseStock(product);
    });
  }

  private decreaseStock(product: Product): void {
    this.catalogService.decreaseStock$(product.id);
  }

  protected isAvailable(product: Product): boolean {
    return this.catalogService.isAvailable(product);
  }
}
