import { Component } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header.component';
import { PageFooter } from '../../shared/page-footer/page-footer';
import { IndexPageComponent } from '../index-page/index-page.component';
import { PresentationPageComponent } from '../presentation-page/presentation-page.component';

@Component({
  selector: 'app-table-page.component',
  imports: [
    PageHeader,
    PageFooter,
    IndexPageComponent,
    PresentationPageComponent,
  ],
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.scss',
})
export class TablePageComponent {}
