import { Component } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header.component';
import { PageFooter } from '../../shared/page-footer/page-footer';

@Component({
  selector: 'app-profile-page.component',
  imports: [PageHeader, PageFooter],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {}
