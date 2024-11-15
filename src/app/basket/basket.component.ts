import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketFormComponent } from './basket-form.component';
import { BasketService } from './basket.service';
import { BasketItem } from './basket.types';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, BasketFormComponent],
})
export class BasketComponent implements OnInit {
  ngOnInit(): void {
    this.basketService.fetch().subscribe();
  }

  protected get basketTotal$(): Observable<number> {
    return this.basketService.total;
  }

  protected get basketItems$(): Observable<BasketItem[]> {
    return this.basketService.items$;
  }

  protected get length$(): Observable<number> {
    return this.basketService.numberOfItems$;
  }

  private basketService = inject(BasketService);
}
