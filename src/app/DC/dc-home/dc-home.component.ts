import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dc-home',
  templateUrl: './dc-home.component.html',
  styleUrls: ['./dc-home.component.scss'],
})
export class DcHomeComponent implements OnInit {
  selectedTab = 0;
  constructor() {}
  isView = false;
  public Dchomescreen = true;
  ngOnInit(): void {}
  navigate(event: any) {
    if (event == 1 || event == 2) {
      this.Dchomescreen = false;
    } else {
      this.Dchomescreen = true;
    }
    if (event == 2) {
      console.log('view');
      this.isView = true;
    } else {
      this.isView = false;
    }
    this.selectedTab = 1;
  }
}
