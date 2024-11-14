import { Component, inject } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    standalone: true,
    imports: [
    RouterLink,
    AsyncPipe
],
})
export class MenuComponent {

  private basketService = inject(BasketService);

  protected get numberOfBasketItems$() {
    return this.basketService.numberOfItems$;
  }
}
