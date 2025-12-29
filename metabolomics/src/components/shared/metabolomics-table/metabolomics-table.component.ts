import { NgClass } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MetabolomicsBarComponent } from './metabolomics-bar/metabolomics-bar.component';
import { CustomersDataService } from '../../../services/customers-data.service';
import { Subscription } from 'rxjs';
import { CustomerType } from '../../../enums/customerType.enum';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'metabolomics-table',
  imports: [NgClass, MetabolomicsBarComponent, TranslatePipe],
  templateUrl: './metabolomics-table.component.html',
  styleUrl: './metabolomics-table.component.scss',
})
export class MetabolomicsTableComponent implements OnChanges {
  public customerType = CustomerType;

  @Input() data: any;
  @Input() type: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] && changes['type'].currentValue) {
      this.setType(changes['type'].currentValue);
    }
  }

  private setType(type) {
    switch (type) {
      case this.customerType.CHILD:
        this.type = 'pdfpages.metabolomicstable.child';
        break;
      case this.customerType.MAN:
        this.type = 'pdfpages.metabolomicstable.man';
        break;
      case this.customerType.WOMAN:
        this.type = 'pdfpages.metabolomicstable.woman';
        break;
    }
  }
}
