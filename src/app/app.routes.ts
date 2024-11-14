import { Routes } from '@angular/router';
import { basketEmptyGuard } from './basket-empty.guard';
import { catalogResolver } from './catalog/catalog.resolver';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details/product-details.config';
import { productDetailsResolver } from './productDetailsResolver';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./catalog/catalog.component').then((m) => m.CatalogComponent),
    resolve: { _: catalogResolver },
  },
  {
    path: 'basket',
    loadComponent: () => import('./basket/basket-empty.component').then((m) => m.BasketEmptyComponent),
    canMatch: [basketEmptyGuard],
  },
  {
    path: 'basket',
    loadComponent: () => import('./basket/basket.component').then((m) => m.BasketComponent),
    // canActivate: [basketGuard],
  },
  {
    path: `products/:${PRODUCT_DETAILS_PARAM_KEY}`,
    loadComponent: () => import('./product-details/product-details.component').then((m) => m.ProductDetailsComponent),
    resolve: {
      product: productDetailsResolver,
    },
  },
  {
    path: `**`,
    loadComponent: () => import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
