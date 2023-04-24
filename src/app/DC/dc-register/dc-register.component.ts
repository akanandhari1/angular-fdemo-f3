import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DcService } from 'src/app/DC/dc.service';
import { DC } from 'src/app/modal/dc';
import { IProviderService } from 'src/app/provider/i-provider.service';

@Component({
  selector: 'app-dc-register',
  templateUrl: './dc-register.component.html',
  styleUrls: ['./dc-register.component.scss'],
})
export class DcRegisterComponent implements OnInit {
  public form: FormGroup;
  public dc: DC = new DC();
  public stateList: any[];
  constructor(public oService: DcService, public gService: IProviderService) {
    this.form = DC.createForm();
    this.gService.getState().subscribe((states) => {
      this.stateList = states.map((s: any) => {
        return s.state;
      });
      console.log(this.stateList);
    });
  }

  ngOnInit(): void {}
  reset() {
    this.form.reset();
  }
  onFormSubmit() {}
}
