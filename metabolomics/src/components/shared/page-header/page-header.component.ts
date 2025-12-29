import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomersDataService } from '../../../services/customers-data.service';
import { Customer } from '../../../types/customers.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'metabolomics-page-header',
  imports: [TranslatePipe],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeader {
  @Input() customer: Customer;
}
