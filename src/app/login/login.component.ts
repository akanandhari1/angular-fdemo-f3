import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { User } from '../modal/login';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../admin/forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public readonly form = this.createForm();
  hide = true;
  IsInvalidCredentials = false;

  constructor(
    public fb: FormBuilder,
    public authservice: AuthGuardService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.setItem('SessionUser', this.form.value.UserName);
  }
  onFormSubmit() {
    if (!this.form.valid) {
      this.form.markAsTouched();
      return;
    }
    this.authservice.login(this.form.value.UserName).subscribe(
      (val) => {
        console.log(val);
        this.IsInvalidCredentials = false;
        if (val === undefined || val === null) {
          this.IsInvalidCredentials = true;
        } else {
          if (val.role === 'provider') {
            this.router.navigate(['./insuranceProvider']);
          } else if (val.role === 'QC') {
            this.router.navigate(['./qc']);
          } else if (val.role === 'manager') {
            this.router.navigate(['./shc']);
          } else if (val.role === 'customer') {
            this.router.navigate(['./home']);
          } else if (val.role === 'dc') {
            this.router.navigate(['./dc']);
          } else if (val.role === 'saveAdmin') {
            this.router.navigate(['./userProfile']);
          }
          this.authservice.LoginUser.next(val);
        }
      },
      (err) => {
        this.IsInvalidCredentials = true;
      }
    );
  }
  createForm() {
    return this.fb.group({
      UserName: [null],
      Password: [null],
    });
  }
  ForGotPassword() {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, { data: '' });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (result) {
          this._snackBar.open(
            'A new password has been sent to your email address. kindly check your inbox',
            'Close',
            {
              panelClass: 'success-snackbar',
              duration: 6000,
              verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
              horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
            }
          );
        }
        // this.showAppoinment = false;
      }
    });
  }
}
