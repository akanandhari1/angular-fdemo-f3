import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  public firstForm: FormGroup;
  public sceondForm: FormGroup;
  public thirdForm: FormGroup;
  public fourthForm: FormGroup;
  public dc: DC = new DC();
  public stateList: any[];
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(
    public oService: DcService,
    public gService: IProviderService,
    private _snackBar: MatSnackBar
  ) {
    this.form = DC.createForm();
    this.firstForm = DC.firstForm();
    this.sceondForm = DC.sceondForm();
    this.thirdForm = DC.thirdForm();
    this.fourthForm = DC.fourthForm();
    this.gService.getState().subscribe((states) => {
      this.stateList = states.map((s: any) => {
        return s.state;
      });
      console.log(this.stateList);
    });
  }

  ngOnInit(): void {}
  resetForm(stepper: any, fromC: any) {
    //stepper.reset();
    fromC.resetForm();

    fromC.reset();
    fromC.markAsUntouched();
    // this.labTests = [];
    //fromC.setValue({}, { emitEvent: false });
  }
  reset() {
    this.form.reset();

    //this.form = DC.createForm();
    this.form.markAsUntouched();

    this.form.markAsPristine();
    this.form.setValue({} as DC, { emitEvent: false });
    // this.form.setValue({} as DC, { emitEvent: false });
    // Object.keys(this.form.controls).forEach((key) => {
    //   const control = this.form.controls[key];
    //   control.setErrors(null);
    //   control.markAsPristine();
    //   control.markAsUntouched();
    //   control.clearValidators();
    //   control.updateValueAndValidity();
    // });
    // setTimeout(() => this.formGroupDirective.resetForm(), 200);
  }
  onFormSubmit() {
    console.log('form', this.firstForm);
    if (this.firstForm.invalid) {
      this.firstForm.markAllAsTouched();
    }
    // } else {
    //   this._snackBar.open('Submitted successfully', 'Close', {
    //     panelClass: 'success-snackbar',
    //     duration: 6000,
    //     verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
    //     horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    //   });
    // }
  }
  captureEmit(event: any, name: any) {
    this.fourthForm.controls[name].setValue(event[0]);
  }
  formatBytes(bytes: any, decimals?: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
