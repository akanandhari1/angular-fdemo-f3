import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qc-general',
  templateUrl: './qc-general.component.html',
  styleUrls: ['./qc-general.component.scss'],
})
export class QcGeneralComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  public customerhomescreen = true;

  navigate(event: any) {
    if (event == 1) {
      this.customerhomescreen = false;
    } else {
      this.customerhomescreen = true;
    }
  }
}
