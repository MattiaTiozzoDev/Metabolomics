import { Component } from '@angular/core';
import { PresentationPageComponent } from '../../components/pdf-pages/presentation-page/presentation-page.component';
import { IndexPageComponent } from '../../components/pdf-pages/index-page/index-page.component';

@Component({
  selector: 'metabolomics-pdf-container',
  imports: [PresentationPageComponent, IndexPageComponent],
  templateUrl: './pdf-container.component.html',
  styleUrl: './pdf-container.component.scss',
})
export class PdfContainerComponent {}
