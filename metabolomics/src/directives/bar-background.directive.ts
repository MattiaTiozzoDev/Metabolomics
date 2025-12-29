import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[BarBackgroundDirective]',
})
export class BarBackgroundDirective implements OnChanges {
  @Input() yellInf!: number;
  @Input() grInf!: number;
  @Input() grSup!: number;
  @Input() yellSup!: number;

  private START = 5; // %
  private readonly END = 95; // %
  private readonly RANGE = 90; // 95 - 5
  private readonly NUANCE_INTERVAL = 5;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (!this.isValid()) {
      return;
    }

    if (
      simpleChanges['yellInf'] &&
      simpleChanges['yellInf'].currentValue === 0
    ) {
      this.START = 0;
    }

    const greenStart =
      this.START +
      ((this.grInf - this.yellInf) / (this.yellSup - this.yellInf)) *
        this.RANGE;

    const greenEnd =
      this.START +
      ((this.grSup - this.yellInf) / (this.yellSup - this.yellInf)) *
        this.RANGE;

    const gradient = `
      linear-gradient(
        to right,
        ${this.START == 0 ? '' : '#E62138 0%,'}
        #FBD500 ${this.START == 0 ? 0 : this.START + 5}%,

        #FBD500 ${greenStart - this.NUANCE_INTERVAL / 2}%,

        #0B9667 ${greenStart + this.NUANCE_INTERVAL}%,

        #0B9667 ${greenEnd - this.NUANCE_INTERVAL}%,

        #FBD500 ${greenEnd + this.NUANCE_INTERVAL / 2}%,
        #FBD500 ${this.END - 5}%,
        #E62138 100%
      )
    `;

    this.renderer.setStyle(this.el.nativeElement, 'background', gradient);
  }

  private isValid(): boolean {
    return (
      this.yellInf != null &&
      this.grInf != null &&
      this.grSup != null &&
      this.yellSup != null &&
      this.yellInf <= this.grInf &&
      this.grInf <= this.grSup &&
      this.grSup <= this.yellSup
    );
  }
}
