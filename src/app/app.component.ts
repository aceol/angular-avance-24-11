import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { AlertComponent } from './alert/alert.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        MenuComponent,
        AlertComponent,
        RouterOutlet,
        FooterComponent,
    ],
})
export class AppComponent {}
