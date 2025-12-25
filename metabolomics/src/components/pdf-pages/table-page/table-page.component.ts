import { Component } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header.component';
import { PageFooter } from '../../shared/page-footer/page-footer';

@Component({
  selector: 'app-table-page.component',
  imports: [PageHeader, PageFooter],
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.scss',
})
export class TablePageComponent {}
