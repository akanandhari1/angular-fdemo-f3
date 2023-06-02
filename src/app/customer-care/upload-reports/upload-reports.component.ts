import { Component, OnInit, Input, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointments } from 'src/app/modal/appointment';

@Component({
  selector: 'app-upload-reports',
  templateUrl: './upload-reports.component.html',
  styleUrls: ['./upload-reports.component.scss'],
})
export class UploadReportsComponent implements OnInit {
  file: any;
  public comment: any = '';
  public appointments: Appointments = new Appointments();
files:any;
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UploadReportsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public appointmentedit: Appointments
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {}
  openSnackBar(errorMessage = '', action = 'success') {
    this._snackBar.open(errorMessage, 'Close', {
      panelClass: action == 'success' ? 'success-snackbar' : 'failure-snackbar',
      duration: 6000,
      verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
  upload() {
    if(this.comment!='' && this.files?.length>0){
      this.openSnackBar('Reports uploaded successfully');
      this.dialogRef.close();
    }else{
    this.openSnackBar('Kindly fill all fields','failure');
    }
  }
  captureEmit(event:any, filed:any) {
this.files=event;
console.log(this.comment,this.files)
  }
}
