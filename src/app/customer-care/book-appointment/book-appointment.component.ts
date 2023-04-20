import {
  Component,
  OnInit,
  Input,
  Inject,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
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
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
})
export class BookAppointmentComponent implements OnInit {
  @Input()
  public customerInfo: InsuranceProvider;
  public appointments: Appointments = new Appointments();
  public showAppoinment = false;
  minDate: Date;
  maxDate: Date;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  labTestCtrl = new FormControl();
  filteredlabTests: Observable<any[]>;
  labTests: any[] = [];
  allLabTests: any[] = [];
  opened = false;
  //@ViewChild('labTestInput') labTestInput: ElementRef<HTMLInputElement>;
  @ViewChildren('labTestInput') labTestInput: QueryList<
    ElementRef<HTMLInputElement>
  >;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChildren('autocompleteTrigger')
  matACTrigger: QueryList<MatAutocompleteTrigger>;

  constructor(
    public dialog: MatDialog,
    public oService: IProviderService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BookAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA)
    public appointmentedit: Appointments
  ) {
    this.dialogRef.disableClose = true;
    this.filteredlabTests = this.labTestCtrl.valueChanges.pipe(
      startWith(null),
      map((labTest: string | null) =>
        labTest ? this._filter(labTest) : this.allLabTests.slice()
      )
    );
    if (this.appointmentedit) {
      this.appointments = this.appointmentedit;
    } else {
      this.addAppointment();
    }
    this.minDate = new Date();
    this.maxDate = new Date(new Date().getFullYear() + 1, 11, 31);
  }

  add(event: MatChipInputEvent, ctrl: any[]): void {
    const input = event.input;
    const value = event.value;

    // Add our labTest
    if ((value || '').trim()) {
      ctrl.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.labTestCtrl.setValue(null);
  }

  remove(labTest: string, ctrl: any[]): void {
    const index = ctrl.indexOf(labTest);

    if (index >= 0) {
      ctrl.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent, ctrl: any[], i: number): void {
    const newValue = event.option.viewValue;
    console.log(event);
    if (ctrl.includes(newValue)) {
      this.remove(newValue, ctrl);
    } else {
      ctrl.push(event.option.viewValue);
    }
    console.log(i);
    this.labTestInput.toArray()[i].nativeElement.value = '';
    this.labTestCtrl.setValue(null);

    // keep the autocomplete opened after each item is picked.
    requestAnimationFrame(() => {
      this.openAuto(this.matACTrigger.toArray()[i], i);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLabTests.filter(
      (labTest) => labTest.toLowerCase().indexOf(filterValue) >= 0
    );
  }

  openAuto(trigger: MatAutocompleteTrigger, i: number) {
    trigger.openPanel();
    console.log(this.labTestInput.toArray());
    this.labTestInput.toArray()[i].nativeElement.focus();
  }

  ngOnInit(): void {
    this.oService.currentCustomer.subscribe((result) => {
      this.customerInfo = result;
    });
    this.oService.labtest().subscribe((re) => {
      this.allLabTests = re.map((t: any) => t.name);
    });
  }
  searchDc(oAppointment: Appointment) {
    const dialogRef = this.dialog.open(SearchDctComponent, { data: '' });
    dialogRef.afterClosed().subscribe((result: DcDetails) => {
      oAppointment.dcDetails = result;
    });
  }
  public typeOfVisit: any[] = ['DC Visit', 'Home Visit'];
  public tests: any[] = ['ECG', 'Thyroid', '2D-Echo', 'CTMT', 'MER'];
  addAppointment() {
    let oAppointment: Appointment = new Appointment();
    this.appointments.appointments.push(oAppointment);
  }
  deleteAppoinment(i: any) {
    this.appointments.appointments.splice(i, 1);
  }
  deleteDc(appointment: Appointment) {
    appointment.dcDetails = new DcDetails();
  }
  validateAppointment(): any {
    if (this.appointments.appointments.length > 0) {
      let isValid = true;
      this.appointments.appointments.forEach((oAp: any) => {
        if (oAp.test != undefined && oAp.test.length > 0) {
        } else {
          isValid = false;
          return;
        }
        if (!oAp['typeOfVisit'] || oAp['typeOfVisit'].length == 0) {
          isValid = false;
          return;
        }
        if (!oAp['PreferredDate'] || oAp['PreferredDate'].length == 0) {
          isValid = false;
          return;
        }
        if (!oAp['PreferredTime'] || oAp['PreferredTime'].length == 0) {
          isValid = false;
          return;
        }

        if (oAp['typeOfVisit'] == 'DC Visit') {
          if (!oAp['dcDetails']) {
            isValid = false;
            return;
          }
          if (oAp['dcDetails'] && oAp['dcDetails'].name.length == 0) {
            isValid = false;
            return;
          }
        }
      });
      if (!isValid) {
        this.openSnackBar('kindly fill all Fields', 'failure');
      }
      return isValid;
    } else {
      this.openSnackBar('Kindly Add an Appointment to Confirm', 'failure');
      return false;
    }
  }
  confirmAppointment() {
    if (this.validateAppointment()) {
      this.openSnackBar('Appointment Confirmed');
      this.dialogRef.close(this.appointments);
    }
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
