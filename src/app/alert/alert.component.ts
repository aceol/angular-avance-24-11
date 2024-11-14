import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertService } from './alert.service';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, AsyncPipe],
})
export class AlertComponent {
  protected alerts$ = inject(AlertService).alerts$;
}
