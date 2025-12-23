import { Component } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header.component';
import { PageFooter } from '../../shared/page-footer/page-footer';

@Component({
  selector: 'app-explanation-page.component',
  imports: [PageHeader, PageFooter],
  templateUrl: './explanation-page.component.html',
  styleUrl: './explanation-page.component.scss',
})
export class ExplanationPageComponent {}
