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
  @Input()
  public user: user = new user();

  //@ViewChild('labTestInput') labTestInput: ElementRef<HTMLInputElement>;

  constructor(
    public dialog: MatDialog,
    public oService: IProviderService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserManageComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public appointmentedit: Appointments
  ) {
    this.dialogRef.disableClose = true;
  }
  public form = this.createForm();
  ngOnInit(): void {}
  createForm(): FormGroup {
    return this.fb.group({
      firstName: [null, [Validators.required, this.noWhitespaceValidator]],

      lastName: [null, [Validators.required, this.noWhitespaceValidator]],
      email: [null, [Validators.required, Validators.email]],
      role: [null, [Validators.required]],
      sendAutomaticPasswordTo: [
        'admin@shcgroup.in',
        [Validators.required, Validators.email],
      ],

      // status:  [null, [Validators.required, this.noWhitespaceValidator]],
      // lastSignIn: [null, [Validators.required, this.noWhitespaceValidator]],
    });
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
