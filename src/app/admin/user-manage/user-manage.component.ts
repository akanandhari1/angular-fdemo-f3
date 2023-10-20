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
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';
import { IProviderService } from 'src/app/provider/i-provider.service';
import { Appointments } from 'src/app/modal/appointment';
import { MatSnackBar } from '@angular/material/snack-bar';

import { user } from 'src/app/modal/users';
import { LastvisitHistoryComponent } from '../lastvisit-history/lastvisit-history.component';
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
    public confirmDialog: ConfirmationDialogService,
    @Inject(MAT_DIALOG_DATA)
    public userDetails: any
  ) {
    this.dialogRef.disableClose = true;
    console.log(this.userDetails);
    this.form = this.createForm(this.userDetails);
    if (this.userDetails) {
      this.changeEdit();
    }
  }
  public form: FormGroup;
  disableEdit: boolean = false;
  ngOnInit(): void {}
  createForm(item: any = null): FormGroup {
    console.log(item);
    if (item) {
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

  changeEdit() {
    this.disableEdit = !this.disableEdit;
    //  console.log(this.form);
    if (!this.disableEdit) {
      for (let control in this.form.controls) {
        this.form.controls[control].enable();

        // obj.disabled=false;
      }
    } else {
      for (let control in this.form.controls) {
        this.form.controls[control].disable();

        // obj.disabled=false;
      }
    }
  }
  lastvisit() {
    const dialogRef = this.dialog.open(LastvisitHistoryComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);
      }
    });
  }

  resetPassword(item: any) {
    this.openSnackBar(
      'The Password has been reset and sent to admin@shcgroup.in'
    );
  }
  block(item: any) {
    this.confirmDialog
      .confirm(
        'Confrim Action',
        'Are you sure want to block this user',
        'Yes',
        'No',
        false
      )
      .subscribe((result) => {
        if (result) {
          item.status = 'Blocked';
          this.openSnackBar('The user has been Blocked successfully.');
        }
      });
  }
  unblock(item: any) {
    this.confirmDialog
      .confirm(
        'Confrim Action',
        'Are you sure want to unblock this user',
        'Yes',
        'No',
        false
      )
      .subscribe((result) => {
        if (result) {
          item.status = 'Active';
          this.openSnackBar('The user has been Unblocked successfully.');
        }
      });
  }
  noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
  save() {
    if (this.userDetails) {
      this.openSnackBar('The user modified successfully.');
    } else {
      this.openSnackBar('The user added successfully.');
    }
    this.dialogRef.close(this.form.value);
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
