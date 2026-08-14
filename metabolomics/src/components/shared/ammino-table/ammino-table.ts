import { Component, Input } from '@angular/core';
import { RoundedValuePipe } from '../../../pipes/rounded-value.pipe';
import { TranslatePipe } from '@ngx-translate/core';
import { MetabolomicsBarComponent } from '../metabolomics-table/metabolomics-bar/metabolomics-bar.component';
import { NgClass } from '@angular/common';
import { CustomersDataService } from '../../../services/customers-data.service';
import { map, Observable } from 'rxjs';
import { AMMINO_TABLES } from '../../../configs/ammino-tables';

@Component({
  selector: 'ammino-table',
  imports: [NgClass, MetabolomicsBarComponent, TranslatePipe, RoundedValuePipe],
  templateUrl: './ammino-table.html',
  styleUrl: './ammino-table.scss',
})
export class AmminoTable {
  @Input() data: any;
  @Input() type: number;
}
