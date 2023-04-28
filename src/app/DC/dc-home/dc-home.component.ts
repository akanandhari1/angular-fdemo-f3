import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dc-home',
  templateUrl: './dc-home.component.html',
  styleUrls: ['./dc-home.component.scss'],
})
export class DcHomeComponent implements OnInit {
  selectedTab = 0;
  constructor() {}
  public Dchomescreen = true;
  ngOnInit(): void {}
  navigate(event: any) {
    if (event == 1) {
      this.Dchomescreen = false;
    } else {
      this.Dchomescreen = true;
    }
    this.selectedTab = 1;
  }
}
