import { Component, inject } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { animate, animation, group, keyframes, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  animations: [
    trigger('basketIncrement', [
      transition(':enter', [animate('300ms ease-out', style({ transform: 'scale(3)', color: 'yellow' }))]),
      transition(':increment', [animate('300ms ease-out', style({ transform: 'scale(3)', color: 'red' }))]),
    ]),
  ],
})
export class MenuComponent {
  private basketService = inject(BasketService);

  protected get numberOfBasketItems$() {
    return this.basketService.numberOfItems$;
  }
}
