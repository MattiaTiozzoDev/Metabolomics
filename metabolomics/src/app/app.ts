import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StaticDataService } from '../services/static-data.service';
import { NavbarComponent } from '../components/shared/navbar/navbar.component';
import { FooterComponent } from '../components/shared/footer/footer.component';
import { PdfContainerComponent } from '../pages/pdf-container/pdf-container.component';
import { PresentationPageComponent } from '../components/pdf-pages/presentation-page/presentation-page.component';
import { IndexPageComponent } from '../components/pdf-pages/index-page/index-page.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    PdfContainerComponent,
    PresentationPageComponent,
    IndexPageComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(
    private translate: TranslateService,
    private readonly staticDataService: StaticDataService
  ) {
    this.translate.use('it');
  }
  ngOnInit(): void {
    this.staticDataService.loadLimit().subscribe();
    this.staticDataService.loadExplanations().subscribe();
  }
}
