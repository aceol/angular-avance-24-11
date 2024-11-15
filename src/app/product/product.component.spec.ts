import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { Product } from './product.types';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), ProductComponent],
    });

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = { id: 'id', title: 'title', description: 'description', photo: 'photo', price: 10, stock: 2 };

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display product price', () => {
    // given
    const nativeElement = fixture.nativeElement as HTMLElement;
    // when
    const cardText = nativeElement.querySelector('.card-text');
    // then
    expect(cardText?.textContent).toContain('€10.00');
  });

  it('should emit product when clicking on the button', () => {
    // given
    const addToBasketSpy = spyOn(component.addToBasket, 'emit');
    const nativeElement = fixture.nativeElement as HTMLElement;

    // when
    nativeElement.querySelector('button')?.click();

    // then
    expect(addToBasketSpy).toHaveBeenCalledOnceWith(component.product);

    nativeElement.querySelector<HTMLButtonElement>('[data-test="addToBasket"]')?.click();
  });
});
