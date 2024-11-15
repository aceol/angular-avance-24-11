import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog.component';
import { WELCOME_MSG } from '../app.token';
import { BasketService } from '../basket/basket.service';
import { MockBasketService } from '../basket/basket.service.mock';
import { CatalogService } from './catalog.service';
import { MockCatalogService } from './catalog.service.mock';
import { BasketComponent } from '../basket/basket.component';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalogComponent],
      providers: [
        provideRouter([{ path: 'basket', component: BasketComponent }]),
        {
          provide: BasketService,
          useValue: MockBasketService,
        },
        {
          provide: CatalogService,
          useValue: MockCatalogService,
        },
        {
          provide: WELCOME_MSG,
          useValue: 'Welcome to unit testing',
        },
      ],
    });

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to the basket view when clicking on "Go to basket" button', waitForAsync(async () => {
    // given
    const router = TestBed.inject(Router);
    const nativeElement = fixture.nativeElement as HTMLElement;

    // when
    nativeElement.querySelector<HTMLAnchorElement>('p > a')?.click();

    await fixture.whenStable();

    // then
    console.log(router.url);
    expect(router.url).toBe('/basket');
  }));
});
