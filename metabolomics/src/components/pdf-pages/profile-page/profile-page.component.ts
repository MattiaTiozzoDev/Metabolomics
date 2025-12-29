import { Component, Input } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header.component';
import { PageFooter } from '../../shared/page-footer/page-footer';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'metabolomics-profile-page',
  imports: [PageHeader, PageFooter, TranslatePipe],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  @Input() profile: any;
  @Input() customer: any;
}
