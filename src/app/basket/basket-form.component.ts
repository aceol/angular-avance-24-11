import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { Customer } from '../customer/customer.types';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './basket-form.component.html',
  styleUrl: './basket-form.component.scss',
})
export class BasketFormComponent {
  private basketService = inject(BasketService);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private formBuilder = inject(FormBuilder);
  protected formGroup!: FormGroup;

  constructor() {
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.nonNullable.control('', [Validators.required]),
      address: this.formBuilder.nonNullable.control('', [Validators.required]),
      creditCard: this.formBuilder.nonNullable.control('', [Validators.required, Validators.pattern(/^\d{3}-\d{3}$/)]),
    });
  }

  protected customer: Customer = { name: '', address: '', creditCard: '' };

  protected checkout(event: Event): void {
    this.formGroup.disable;
    console.log('user', this.formGroup.value);
    event.stopPropagation();
    event.preventDefault();

    this.basketService.checkout(this.formGroup.value as Customer).subscribe({
      next: () => {
        this.formGroup.enable;
        this.router.navigate(['']);
      },
      error: () => {
        this.alertService.addDanger('Desole commande annulee');
        this.formGroup.enable;
      },
    });
  }
}
