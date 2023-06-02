import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InsuranceProvider } from 'src/app/modal/iInsuranceProvider';

import { FormBuilder, FormGroup } from '@angular/forms';
import { iList } from 'src/app/modal/iListInterface';
import { IProviderService } from 'src/app/provider/i-provider.service';
import { BookAppointmentComponent } from '../book-appointment/book-appointment.component';
import { Appointments } from 'src/app/modal/appointment';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';
import { RoResponseComponent } from '../ro-response/ro-response.component';
import { ScheduleHistoryComponent } from '../schedule-history/schedule-history.component';

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
import { UploadReportsComponent } from '../upload-reports/upload-reports.component';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
  public form: FormGroup;
  public cInfo: InsuranceProvider;
  public disableEdit = true;
  public SelectedLabTests: any;
  public appointments: Appointments;
  Status_NoResponse = false;
  @Output()
  public navigatetoDetail = new EventEmitter();
  public providerList: iList[] = [
    { id: 1, name: 'SBI' },
    { id: 2, name: 'HDFC' },
    { id: 3, name: 'TATA_AIG' },
  ];
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  labTestCtrl: FormControl = new FormControl();
  filteredlabTests: Observable<string[]>;
  labTests: string[] = [];
  allLabTests: string[] = [];
  opened = false;
  public LabTests: any[] = [];
  public genderList: string[] = ['Male', 'Female', 'other'];
  public stateList: any[];
  public statusList: iList[] = [
    { id: 1, name: 'Registered' },
    { id: 2, name: 'Appointment confirmed' },
  ];
  public maxDate = new Date();

  public showAppoinment = true;
  disable_Labtest = true;
  constructor(
    public oService: IProviderService,
    public dialog: MatDialog,
    public confirmDialog: ConfirmationDialogService,
    public fb: FormBuilder // @Inject(MAT_DIALOG_DATA) public cInfo: InsuranceProvider
  ) {
    this.oService.labtest().subscribe((re) => {
      this.allLabTests = re.map((t: any) => t.name);
    });
    this.oService.getState().subscribe((states) => {
      this.stateList = states.map((s: any) => {
        return s.state;
      });

      // console.log(this.stateList);
    });
    this.oService.currentCustomer.subscribe((result: InsuranceProvider) => {
      this.cInfo = result;
      this.form = InsuranceProvider.createForm(result);
    });
    //this.labTests = [];
    // this.labTestCtrl.setValue(this.LabTests);
    this.filteredlabTests = this.labTestCtrl.valueChanges.pipe(
      startWith(null),
      map((labTest: string | null) => {
        return labTest ? this._filter(labTest) : this.allLabTests.slice();
      })
    );
  }
  save() {
    if (!this.form.invalid) {
      this.changeEdit();
    }
  }
  changeEdit() {
    this.disableEdit = !this.disableEdit;
    //  console.log(this.form);
    if (!this.disableEdit) {
      for (let control in this.form.controls) {
        this.form.controls[control].enable();
        this.labTestCtrl.enable();
        // obj.disabled=false;
      }
    } else {
      for (let control in this.form.controls) {
        this.form.controls[control].disable();
        this.labTestCtrl.disable();
        // obj.disabled=false;
      }
    }
  }

  @ViewChild('labTestInput') labTestInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('autocompleteTrigger') matACTrigger: MatAutocompleteTrigger;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our labTest
    if ((value || '').trim()) {
      this.labTests.push(value.trim());
    }
    this.form.controls.LabTests.setValue([...this.labTests]);

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.labTestCtrl.setValue(null);
  }

  remove(labTest: string): void {
    const index = this.labTests.indexOf(labTest);

    if (index >= 0) {
      this.labTests.splice(index, 1);
    }
    this.form.controls.LabTests.setValue([...this.labTests]);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const newValue = event.option.viewValue;
    if (this.labTests.includes(newValue)) {
      this.labTests = [
        ...this.labTests.filter((labTest) => labTest !== newValue),
      ];
    } else {
      this.labTests.push(event.option.viewValue);
    }
    this.form.controls.LabTests.setValue([...this.labTests]);
    this.labTestInput.nativeElement.value = '';
    this.labTestCtrl.setValue(null);

    // keep the autocomplete opened after each item is picked.
    requestAnimationFrame(() => {
      this.openAuto(this.matACTrigger);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLabTests.filter(
      (labTest) => labTest.toLowerCase().indexOf(filterValue) >= 0
    );
  }

  openAuto(trigger: MatAutocompleteTrigger) {
    trigger.openPanel();
    this.labTestInput.nativeElement.focus();
    console.log(trigger);
  }
  ngOnInit(): void {
    this.labTests = ['ECG', 'CTMT'];
    this.form.controls.LabTests.setValue([...this.labTests]);
  }
  onFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
  }

  showbookAppoinment() {
    const dialogRef = this.dialog.open(BookAppointmentComponent, { data: '' });
    dialogRef.afterClosed().subscribe((result: Appointments) => {
      if (result) {
        console.log(result);
        this.Status_NoResponse = false;

        this.appointments = result;
        this.appointments.status = 'Processing';
        this.showAppoinment = false;
      }
    });
  }
  noResponse() {
    const dialogRef = this.dialog.open(RoResponseComponent, { data: '' });
    dialogRef.afterClosed().subscribe((result: Appointments) => {
      if (result) {
        if (result) {
          // this.appointments = result;
          if (!this.appointments) {
            this.appointments = new Appointments();
          }
          this.appointments.status = 'No Response';

          this.Status_NoResponse = true;
        }
        // this.showAppoinment = false;
      }
    });
  }
  uploadReports(){
    const dialogRef = this.dialog.open(UploadReportsComponent, { data: '' });
    dialogRef.afterClosed().subscribe((result: Appointments) => {
      if (result) {
      }
    });
  }
  
  deleteAppoinment(i: any) {
    this.appointments.appointments.splice(i, 1);
  }
  showHistory() {
    const dialogRef = this.dialog.open(ScheduleHistoryComponent);
    dialogRef.afterClosed().subscribe((result: any) => {});
  }
  rebookAppoinment() {
    // this.deleteAppoinment(this.appointments.appointments.length - 1);
    const dialogRef = this.dialog.open(BookAppointmentComponent, {
      data: JSON.parse(JSON.stringify(this.appointments)),
    });
    dialogRef.afterClosed().subscribe((result: Appointments) => {
      if (result) {
        this.appointments = result;
        this.appointments.status = 'Processing';
        this.showAppoinment = false;
      }
    });
  }

  reset() {
    this.form.reset();
  }
  back() {
    this.navigatetoDetail.emit(2);
  }

  show() {
    this.confirmDialog
      .confirm(
        'Confirm Show',
        'Confirm Customer Appears to the Test',
        'Yes',
        'Cancel',
        true
      )
      .subscribe((result) => {
        if (result) {
          console.log(result);
          this.appointments.status = 'Customer Appeared';
          this.appointments.comment = result.comment ? result.comment : '';
        }
      });
  }
  noShow() {
    this.confirmDialog
      .confirm(
        'Confirm no Show',
        'Confirm Customer not appears to the Test',
        'Yes',
        'Cancel',
        true
      )
      .subscribe((result) => {
        if (result) {
          this.appointments.status = 'Customer not Appeared';
          this.appointments.comment = result.comment ? result.comment : '';
        }
      });
  }
  partialyCompleted() {
    this.confirmDialog
      .confirm(
        'Partially Completed',
        'Confirm Process Partially Completed',
        'Ok',
        'Cancel',
        true
      )
      .subscribe((result) => {
        if (result) {
          this.appointments.status = 'Partially Completed';
          this.appointments.comment = result.comment ? result.comment : '';
        }
      });
  }
  reportPending() {
    this.confirmDialog
      .confirm(
        'Confirm Report Pending',
        'Confirm Pending of Report Generation',
        'Ok',
        'Cancel',
        true
      )
      .subscribe((result) => {
        if (result) {
          this.appointments.status = 'Report Pending';
          this.appointments.comment = result.comment ? result.comment : '';
        }
      });
  }
  QcProcess() {
    this.confirmDialog
      .confirm(
        'Confirm Qc In Process',
        'Update Qc in Process',
        'Ok',
        'Cancel',
        true
      )
      .subscribe((result) => {
        if (result) {
          this.appointments.status = 'Qc in Process';
          this.appointments.comment = result.comment ? result.comment : '';
        }
      });
  }
}
