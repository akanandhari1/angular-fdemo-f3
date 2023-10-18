import { Component, OnInit, Input, Inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { IProviderService } from 'src/app/provider/i-provider.service';
import { Appointments } from 'src/app/modal/appointment';
import { MatSnackBar } from '@angular/material/snack-bar';

import { user } from 'src/app/modal/users';
@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss'],
})
export class UserManageComponent implements OnInit {
  //@ViewChild('labTestInput') labTestInput: ElementRef<HTMLInputElement>;

  constructor(
    public dialog: MatDialog,
    public oService: IProviderService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserManageComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public userDetails: any
  ) {
    this.dialogRef.disableClose = true;
    console.log(this.userDetails);
    this.form = this.createForm(this.userDetails);
  }
  public form: FormGroup;
  ngOnInit(): void {}
  createForm(item: any = null): FormGroup {
    console.log(item);
    if (item) {
      console.log('SDF');
      return this.fb.group({
        firstName: [
          item.firstName,
          [Validators.required, this.noWhitespaceValidator],
        ],

        lastName: [
          item.lastName,
          [Validators.required, this.noWhitespaceValidator],
        ],
        email: [item.email, [Validators.required, Validators.email]],
        role: [item.role, [Validators.required]],
        sendAutomaticPasswordTo: [
          item.sendAutomaticPasswordTo,
          [Validators.required, Validators.email],
        ],

        // status:  [null, [Validators.required, this.noWhitespaceValidator]],
        // lastSignIn: [null, [Validators.required, this.noWhitespaceValidator]],
      });
    } else {
      return this.fb.group({
        firstName: [null, [Validators.required, this.noWhitespaceValidator]],

        lastName: [null, [Validators.required, this.noWhitespaceValidator]],
        email: [null, [Validators.required, Validators.email]],
        role: [null, [Validators.required]],
        sendAutomaticPasswordTo: [
          'admin@shcgroup.in',
          [Validators.required, Validators.email],
        ],
      });
    }
  }
  noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
  openSnackBar(errorMessage = '', action = 'success') {
    this._snackBar.open(errorMessage, 'Close', {
      panelClass: action == 'success' ? 'success-snackbar' : 'failure-snackbar',
      duration: 6000,
      verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
}
