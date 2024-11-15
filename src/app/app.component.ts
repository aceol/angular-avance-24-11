import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  animations: [
    trigger('routeAnimation', [
      transition(':increment', [
        animate(
          '300ms ease-out',
          keyframes([
            style({ opacity: 0, transform: 'translateY(-1rem)', display: 'block' }),
            style({ opacity: 1, transform: 'translateY(0px)' }),
          ]),
        ),
      ]),
    ]),
  ],
  imports: [MenuComponent, AlertComponent, RouterOutlet, FooterComponent, AsyncPipe],
})
export class AppComponent {
  protected increment$ = new BehaviorSubject(0);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.increment$.next(this.increment$.value + 1));
  }
}
