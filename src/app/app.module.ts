import { forwardRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from '../material.module';
import { AppComponent } from './app.component';
import {
  FormsModule,
  ReactiveFormsModule,
  NG_VALIDATORS,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { IProviderComponent } from './provider/i-provider/i-provider.component';
import { IProviderHomeComponent } from './provider/i-provider-home/i-provider-home.component';
import { IProviderListComponent } from './provider/i-provider-list/i-provider-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InsuranceProviderComponent } from './insurance-provider/insurance-provider/insurance-provider.component';
import { InsuranceProviderHomeComponent } from './insurance-provider/insurance-provider-home/insurance-provider-home.component';
import { InsuranceProviderListComponent } from './insurance-provider/insurance-provider-list/insurance-provider-list.component';
import { FileDragNDropDirective } from './insurance-provider/file-drag-n-drop.directive';
import { NgxFileDragDropModule } from 'ngx-file-drag-drop';
import { DeleteConfirmComponent } from './insurance-provider/delete-confirm/delete-confirm.component';
import { QualityCheckHomeComponent } from './QC/quality-check-home/quality-check-home.component';
import { CreateRegisterComponent } from './customer-care/create-register/create-register.component';
import { CustomerLandingComponent } from './customer-care/customer-landing/customer-landing.component';

import { AppRouterModule } from './router-module/router-module.module';
import { CustomerDetailComponent } from './customer-care/customer-detail/customer-detail.component';
import { LoginComponent } from './login/login.component';
import { BookAppointmentComponent } from './customer-care/book-appointment/book-appointment.component';
import { SearchDctComponent } from './customer-care/search-dct/search-dct.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './shared/confirmation-dialog.service';
import { RoResponseComponent } from './customer-care/ro-response/ro-response.component';
import { ProgressComponent } from './insurance-provider/insurance-provider-list/progress/progress.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SelectComponent } from './shared/select/select.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { ScheduleHistoryComponent } from './customer-care/schedule-history/schedule-history.component';
import { MultiselectAutoCompleteComponent } from './shared/multiselect-auto-complete/multiselect-auto-complete.component';
import { MatFormFieldControl } from '@angular/material/form-field';
import {
  NumberOnlyDirective,
  landlineNumberDirective,
} from './shared/number-only.directive';
import {
  AlphaNumericDirective,
  AlphabetDirective,
  CustomerAlphabetDirective,
} from './shared/alpha-numeric.directive';
import { DcHomeComponent } from './DC/dc-home/dc-home.component';
import { DcRegisterComponent } from './DC/dc-register/dc-register.component';
import { DcFetchDataComponent } from './DC/dc-fetch-data/dc-fetch-data.component';
import { BrowseFileComponent } from './shared/browse-file/browse-file.component';
import { EditDcComponent } from './DC/edit-dc/edit-dc.component';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { QcListComponent } from './QC/qc-list/qc-list.component';
import { QcGeneralComponent } from './QC/qc-general/qc-general.component';
import { UploadReportsComponent } from './customer-care/upload-reports/upload-reports.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { UserBaseComponent } from './admin/user-base/user-base.component';
import { UserManageComponent } from './admin/user-manage/user-manage.component';
import { LastvisitHistoryComponent } from './admin/lastvisit-history/lastvisit-history.component';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  declarations: [
    AppComponent,
    IProviderComponent,
    IProviderHomeComponent,
    IProviderListComponent,
    InsuranceProviderComponent,
    InsuranceProviderHomeComponent,
    InsuranceProviderListComponent,
    FileDragNDropDirective,
    DeleteConfirmComponent,
    QualityCheckHomeComponent,
    CreateRegisterComponent,
    CustomerLandingComponent,
    CustomerDetailComponent,
    LoginComponent,
    BookAppointmentComponent,
    SearchDctComponent,
    ConfirmationDialogComponent,
    RoResponseComponent,
    ProgressComponent,
    SelectComponent,
    ScheduleHistoryComponent,
    MultiselectAutoCompleteComponent,
    NumberOnlyDirective,
    landlineNumberDirective,
    AlphaNumericDirective,
    AlphabetDirective,
    CustomerAlphabetDirective,
    DcHomeComponent,
    DcRegisterComponent,
    DcFetchDataComponent,
    BrowseFileComponent,
    EditDcComponent,
    QcListComponent,
    QcGeneralComponent,
    UploadReportsComponent,
    ForgotPasswordComponent,
    UserBaseComponent,
    UserManageComponent,
    LastvisitHistoryComponent,
  ],
  imports: [
    AppRouterModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxFileDragDropModule,

    NgxMatTimepickerModule,
  ],
  providers: [
    ConfirmationDialogService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MultiselectAutoCompleteComponent),
      multi: true,
    },
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    MultiselectAutoCompleteComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
