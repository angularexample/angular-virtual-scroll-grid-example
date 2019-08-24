import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xxx-header',
  styleUrls: ['./xxx-header.component.scss'],
  templateUrl: './xxx-header.component.html'
})

export class XxxHeaderComponent {
  @Input() appTitle: string;
}
