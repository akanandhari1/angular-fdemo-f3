import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { IProviderService } from 'src/app/provider/i-provider.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public oService: IProviderService,
    public fb: FormBuilder,

    public dialogRef: MatDialogRef<ForgotPasswordComponent>
  ) {}
  public form = this.createForm();
  createForm() {
    return this.fb.group({
      Email: [null, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}
  generateForgotPasword() {
    this.dialogRef.close(this.form.controls.Email.value);
  }
}
