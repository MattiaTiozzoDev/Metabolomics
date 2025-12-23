import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'metabolomics-presentation-page',
  imports: [TranslatePipe],
  templateUrl: './presentation-page.component.html',
  styleUrl: './presentation-page.component.scss',
})
export class PresentationPageComponent {}
