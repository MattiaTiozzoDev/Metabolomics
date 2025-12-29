import { Component, Input } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header.component';
import { PageFooter } from '../../shared/page-footer/page-footer';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomersDataService } from '../../../services/customers-data.service';

@Component({
  selector: 'metabolomics-index-page',
  imports: [PageHeader, PageFooter, TranslatePipe],
  templateUrl: './index-page.component.html',
  styleUrl: './index-page.component.scss',
})
export class IndexPageComponent {
  @Input() customer: any;

  constructor() {}
}
