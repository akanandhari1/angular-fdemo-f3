import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[alphaNumeric]',
})
export class AlphaNumericDirective {
  private regex: RegExp = new RegExp(/^[a-zA-Z0-9]+$/);
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowUp',
    'ArrowDown',
  ];

  constructor(private el: ElementRef) {}
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    // console.log(current.length);
    let next: string = current.concat(event.key);

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    // Allow Backspace, tab, end, and home keys

    let current: any = this.el.nativeElement.value;
    // console.log(current.length);
    let clipboardData:any = event.clipboardData;
    let next: any = current.concat(clipboardData.getData('text'));

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}

@Directive({
  selector: '[alphabetOnly]',
})
export class AlphabetDirective {
  private regex: RegExp = new RegExp(/^[a-z ]+$/i);
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowUp',
    'ArrowDown',
    'Space',
  ];

  constructor(private el: ElementRef) {}
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    // console.log(current.length);
    let next: string = current.concat(event.key);

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    // Allow Backspace, tab, end, and home keys

    let current: any = this.el.nativeElement.value;
    // console.log(current.length);
    let clipboardData:any = event.clipboardData;
    let next: any = current.concat(clipboardData.getData('text'));

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
// [a-zA-Z,', ,-]

@Directive({
  selector: '[alphabetwithSpecial]',
})
export class CustomerAlphabetDirective {
  private regex: RegExp = new RegExp(/^[a-z '/-]+$/i);
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowUp',
    'ArrowDown',
    'Space',
  ];

  constructor(private el: ElementRef) {}
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    // console.log(current.length);
    let next: string = current.concat(event.key);

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    // Allow Backspace, tab, end, and home keys

    let current: any = this.el.nativeElement.value;
    // console.log(current.length);
    let clipboardData:any = event.clipboardData;
    let next: any = current.concat(clipboardData.getData('text'));

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
