import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DcService } from 'src/app/DC/dc.service';
import { DC } from 'src/app/modal/dc';
import { IProviderService } from 'src/app/provider/i-provider.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  @Input() set isView(value: any) {
    this.oService.currentDC.subscribe((result) => {
      this.form = DC.createForm(result, value);
    });
  }

  public stateList: any[];
  constructor(
    public oService: DcService,
    public gService: IProviderService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.gService.getState().subscribe((states) => {
      this.stateList = states.map((s: any) => {
        return s.state;
      });
      console.log(this.stateList);
    });
  }
  back() {
    this.navigatetoDetail.emit(3);
  }
  ngOnInit(): void {}
  reset() {
    this.form.reset();
    this.form.markAsUntouched();
    this.form.markAsPristine();
    this.form.setValue(new DC(), { emitEvent: false });
  }
  onFormSubmit() {
    console.log('form', this.form);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this._snackBar.open('Submitted successfully', 'Close', {
        panelClass: 'success-snackbar',
        duration: 6000,
        verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
        horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      });
    }
  }
  captureEmit(event: any, name: any) {
    this.form.controls[name].setValue(event);
  }
}
