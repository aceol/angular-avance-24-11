import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer/customer.types';
import { BasketItem } from './basket.types';
import { BasketService } from './basket.service';
import { Observable } from 'rxjs';
import { NgFor, NgIf, AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        AsyncPipe,
        CurrencyPipe,
    ],
})
export class BasketComponent implements OnInit{

  ngOnInit(): void {
    this.basketService.fetch().subscribe();
  }

  protected customer: Customer = { name: '', address: '', creditCard: '' };

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
  private router = inject(Router);

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.basketService
    .checkout(this.customer)
    .subscribe(() => this.router.navigate(['']))
  }
}
