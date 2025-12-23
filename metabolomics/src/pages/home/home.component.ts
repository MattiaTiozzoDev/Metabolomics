import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'metabolomics-home',
  imports: [TranslateModule, TranslatePipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
