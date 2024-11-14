import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { provideHttpClient } from '@angular/common/http';
import { WELCOME_MSG } from './app/app.token';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule),
        provideHttpClient(),
        {
            provide: WELCOME_MSG,
            useValue: 'Bienvenue sur Zenika Ecommerce',
        },
    ]
})
  .catch((err) => console.error(err));
