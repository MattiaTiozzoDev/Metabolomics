import { Component, Input } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header.component';
import { PageFooter } from '../../shared/page-footer/page-footer';

@Component({
  selector: 'ammino-intro-page',
  imports: [PageHeader, PageFooter],
  templateUrl: './ammino-intro-page.html',
  styleUrl: './ammino-intro-page.scss',
})
export class AmminoIntroPage {
  @Input() page: string = '';
}
