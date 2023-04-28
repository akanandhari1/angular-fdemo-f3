import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DcService } from 'src/app/DC/dc.service';
import { DC } from 'src/app/modal/dc';
import { IProviderService } from 'src/app/provider/i-provider.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'edit-dc',
  templateUrl: './edit-dc.component.html',
  styleUrls: ['./edit-dc.component.scss'],
})
export class EditDcComponent implements OnInit {
  @Output()
  public navigatetoDetail = new EventEmitter();
  public form: FormGroup;
  public dc: DC = new DC();
  public stateList: any[];
  constructor(
    public oService: DcService,
    public gService: IProviderService,
    public dialog: MatDialog
  ) {
    this.oService.currentDC.subscribe((result) => {
      this.form = DC.createForm(result);
    });

    this.gService.getState().subscribe((states) => {
      this.stateList = states.map((s: any) => {
        return s.state;
      });
      console.log(this.stateList);
    });
  }
  back() {
    this.navigatetoDetail.emit(2);
  }
  ngOnInit(): void {}
  reset() {
    this.form.reset();
    this.form.markAsUntouched();
    this.form.markAsPristine();
    this.form.setValue(new DC(), { emitEvent: false });
  }
  onFormSubmit() {
    console.log(this.form);
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
  }
  captureEmit(event: any, name: any) {
    this.form.controls[name].setValue(event);
  }
}
