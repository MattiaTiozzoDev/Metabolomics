import { Component } from '@angular/core';
import { FileReaderService } from '../../services/file-reader.service';
import { PdfService } from '../../services/file-export.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  public file: any;
  public inputFileName: string;
  public outputFileName = 'output.pdf';
  public isDragOver: boolean = false;
  
  constructor(
    private readonly fileReaderService: FileReaderService,
    private pdfService: PdfService
  ){}

  onFileSelected(event: Event) {
    this.fileReaderService.generateJSON(event).pipe(take(1)).subscribe((data)=> {
      this.file = data.json;
      this.inputFileName = data.fileName
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
    this.fileReaderService.generateJSONFromDrop(file).pipe(take(1)).subscribe((data) => {
      this.file = data.json;
      this.inputFileName = data.fileName
    });
  }

  async download() {
    try {
      const path = await this.pdfService.exportElementById('pdf-section', this.outputFileName);
      alert('PDF salvato in: ' + path);
    } catch (err) {
      alert('Errore: ' + err);
    }
  }

}
