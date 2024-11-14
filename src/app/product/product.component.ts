import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from './product.types';
import { RouterLink } from '@angular/router';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    standalone: true,
    imports: [
        RouterLink,
        UpperCasePipe,
        CurrencyPipe,
    ],
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;

  @Output() addToBasket = new EventEmitter<Product>();

  protected onClick(): void {
    this.addToBasket.emit(this.product);
  }

  protected isTheLast(): boolean {
    return this.product.stock === 1;
  }
}
