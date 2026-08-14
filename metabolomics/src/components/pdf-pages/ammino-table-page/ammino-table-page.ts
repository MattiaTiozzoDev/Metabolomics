import { Component, Input } from '@angular/core';
import { PageFooter } from '../../shared/page-footer/page-footer';
import { PageHeader } from '../../shared/page-header/page-header.component';
import { TranslatePipe } from '@ngx-translate/core';
import { DateTransformPipe } from '../../../pipes/date-transform.pipe';
import { map, Subscription, tap } from 'rxjs';
import { AmminoTable } from '../../shared/ammino-table/ammino-table';
import { CustomersDataService } from '../../../services/customers-data.service';
import { AMMINO_TABLES } from '../../../configs/ammino-tables';

@Component({
  selector: 'ammino-table-page',
  imports: [
    PageHeader,
    PageFooter,
    AmminoTable,
    TranslatePipe,
    DateTransformPipe,
  ],
  templateUrl: './ammino-table-page.html',
  styleUrl: './ammino-table-page.scss',
})
export class AmminoTablePage {
  public tables: any;
  public tablesSubscription: Subscription;

  @Input() pageId: number;
  @Input() sectionTitle: string;
  @Input() customer: any;
  @Input() page: string;

  constructor(private readonly customerDataService: CustomersDataService) {}

  ngOnInit(): void {
    this.tablesSubscription = this.getTablesFromPageId(this.pageId)
      .pipe(
        tap((tables) => {
          this.tables = tables;
        }),
      )
      .subscribe();
  }

  public getTablesFromPageId(pageId: number) {
    return this.customerDataService.$customerData.pipe(
      map((data) => {
        return AMMINO_TABLES.filter(
          (table) => Number(table.pageId) === Number(pageId),
        ).map((table) => {
          return {
            ...table,
            rows: this.getrows(table.metaIds, data?.values),
          };
        });
      }),
    );
  }

  getrows(metaIds: number[], values: any) {
    return metaIds.map((metaId) =>
      values?.find((el) => Number(el.id) === Number(metaId)),
    );
  }

  ngOnDestroy(): void {
    this.tablesSubscription.unsubscribe();
  }
}
