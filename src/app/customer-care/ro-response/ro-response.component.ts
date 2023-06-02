import { Component, OnInit, Input, Inject } from '@angular/core';
import { InsuranceProvider } from 'src/app/modal/iInsuranceProvider';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { SearchDctComponent } from '../search-dct/search-dct.component';
import { IProviderService } from 'src/app/provider/i-provider.service';
import {
  Appointments,
  Appointment,
  DcDetails,
} from 'src/app/modal/appointment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-ro-response',
  templateUrl: './ro-response.component.html',
  styleUrls: ['./ro-response.component.scss'],
})
export class RoResponseComponent implements OnInit {
  public appointments: Appointments = new Appointments();
  public showComments: boolean = false;
  public comment: any = '';

  constructor(
    public dialog: MatDialog,
    public oService: IProviderService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RoResponseComponent>,
    @Inject(MAT_DIALOG_DATA)
    public appointmentedit: Appointments
  ) {
    this.dialogRef.disableClose = true;
    if (this.appointmentedit) {
      this.appointments = this.appointmentedit;
    } else {
    }
  }
  onChange(event: any) {
    this.showComments = false;
    console.log('va', event?.value);
    if (event?.value.trim() == 'Others') {
      this.showComments = true;
      console.log(this.showComments);
    }
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
  noResponse() {
    if (this.showComments == true && this.comment == '') {
      this.openSnackBar('Kindly fill all fields', 'failure');
    } else {
      this.openSnackBar('No Response Notified');
      this.dialogRef.close(this.appointments);
    }
  }
}
