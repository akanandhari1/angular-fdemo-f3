import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerHistory } from 'src/app/modal/appointment';
import { IProviderService } from 'src/app/provider/i-provider.service';
import { UserDetailService } from '../user-detail.service';
import { UserManageComponent } from '../user-manage/user-manage.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';
@Component({
  selector: 'app-user-base',
  templateUrl: './user-base.component.html',
  styleUrls: ['./user-base.component.scss'],
})
export class UserBaseComponent implements OnInit {
  userList: any = [];
  displayedColumns: string[] = [
    'Name',
    'email',
    'role',
    'lastSignIn',
    'status',
    'reset',
    'block',
    'Edit',
  ];
  dataSource: MatTableDataSource<CustomerHistory>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public oService: UserDetailService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public confirmDialog: ConfirmationDialogService
  ) {
    this.oService.getUserList().subscribe((re) => {
      this.userList = re;
      this.dataSource = new MatTableDataSource(this.userList);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {}
  createUser() {
    const dialogRef = this.dialog.open(UserManageComponent, { data: '' });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);
      }
    });
  }
  editUser(item: any) {
    const dialogRef = this.dialog.open(UserManageComponent, {
      data: item,
    });

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
  openSnackBar(errorMessage = '', action = 'success') {
    this._snackBar.open(errorMessage, 'Close', {
      panelClass: action == 'success' ? 'success-snackbar' : 'failure-snackbar',
      duration: 6000,
      verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
}
