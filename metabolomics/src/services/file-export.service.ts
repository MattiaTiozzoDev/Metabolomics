import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  /**
   * Esporta HTML in PDF tramite Electron
   * @param htmlContent stringa HTML completa
   */
  async exportHtml(htmlContent: string,fileName: string): Promise<string> {
    if (!(window as any).electronAPI?.exportPDF) {
      throw new Error('Electron API non disponibile');
    }

    try {
      const filePath = await (window as any).electronAPI.exportPDF({htmlContent,fileName});
      console.log('PDF salvato in:', filePath);
      return filePath;
    } catch (error) {
      console.error('Errore generazione PDF:', error);
      throw error;
    }
  }

  /**
   * Esporta il contenuto di un elemento HTML (anche nascosto)
   * @param elementId id dell'elemento
   */
    async exportElementById(elementId: string, fileName: string): Promise<string> {
    const element = document.getElementById(elementId);
    if (!element) throw new Error(`Elemento con id "${elementId}" non trovato`);

    // Clona il div invisibile
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.display = 'block'; // visibile solo per il PDF
    const container = document.createElement('div');
    container.appendChild(clone);
      debugger;
    // Passa il contenuto HTML al servizio Electron
    return this.exportHtml(container.innerHTML, fileName);
    }
}