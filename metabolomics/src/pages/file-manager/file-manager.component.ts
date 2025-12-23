import { Component } from '@angular/core';
import { FileReaderService } from '../../services/file-reader.service';
import { PdfService } from '../../services/file-export.service';
import { take } from 'rxjs';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { StaticDataService } from '../../services/static-data.service';
import { IndexPageComponent } from '../../components/pdf-pages/index-page/index-page.component';
import { PresentationPageComponent } from '../../components/pdf-pages/presentation-page/presentation-page.component';

@Component({
  selector: 'metabolomics-file-manager',
  imports: [
    TranslateModule,
    TranslatePipe,
    IndexPageComponent,
    PresentationPageComponent,
  ],
  templateUrl: './file-manager.component.html',
  styleUrl: './file-manager.component.scss',
})
export class FileManagerComponent {
  public company: string = 'Val Sambro';
  public file: any;
  public inputFileName: string;
  public outputFileName = 'output.pdf';
  public isDragOver: boolean = false;

  constructor(
    private readonly fileReaderService: FileReaderService,
    private pdfService: PdfService,
    private staticdataService: StaticDataService
  ) {}

  onFileSelected(event: Event) {
    this.fileReaderService
      .generateJSON(event)
      .pipe(take(1))
      .subscribe((data) => {
        this.file = data.json;
        this.inputFileName = data.fileName;
      });
  }

  // Drag & drop
  onFileDropped(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.loadFile(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    this.isDragOver = false;
  }

  loadFile(file: File) {
    this.fileReaderService
      .generateJSONFromDrop(file)
      .pipe(take(1))
      .subscribe((data) => {
        this.file = data.json;
        const jsonString = JSON.stringify(this.file);
        console.log(jsonString);
        this.inputFileName = data.fileName;
      });
  }

  async download() {
    try {
      const path = await this.pdfService.exportElementById(
        'pdf-section',
        this.outputFileName
      );
      alert('PDF salvato in: ' + path);
    } catch (err) {
      alert('Errore: ' + err);
    }
  }
}
