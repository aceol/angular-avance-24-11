import { provideHttpClient, withFetch } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { WELCOME_MSG } from './app/app.token';

bootstrapApplication(AppComponent, appConfig()).catch((err) => console.error(err));

function appConfig() {
  return {
    providers: [
      //importProvidersFrom(BrowserModule, AppRoutingModule),

      provideRouter(appRoutes, withPreloading(PreloadAllModules), withComponentInputBinding()),
      provideHttpClient(withFetch()),
      {
        provide: WELCOME_MSG,
        useValue: 'Bienvenue sur Zenika Ecommerce',
      },
    ],
  };
}
