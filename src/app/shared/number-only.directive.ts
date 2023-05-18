import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
  selector: '[NumberOnly]',
})
export class NumberOnlyDirective {
  constructor(private _el: ElementRef) {}
  private regex: RegExp = new RegExp(/[^0-9]*/g);
  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this._el.nativeElement.value;

    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
    if (this._el.nativeElement.value == 0) {
      this._el.nativeElement.value = '';
    }
  }
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    // Allow Backspace, tab, end, and home keys

    let current: any = this._el.nativeElement.value;
    // console.log(current.length);
    let clipboardData: any = event.clipboardData;
    let next: any = current.concat(clipboardData.getData('text'));

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}

@Directive({
  selector: '[landline]',
})
export class landlineNumberDirective {
  constructor(private _el: ElementRef) {}
  private regex: RegExp = new RegExp(/[^0-9]*/g);
  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this._el.nativeElement.value;

    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    // Allow Backspace, tab, end, and home keys

    let current: any = this._el.nativeElement.value;
    // console.log(current.length);
    let clipboardData: any = event.clipboardData;
    let next: any = current.concat(clipboardData.getData('text'));

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
