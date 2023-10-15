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
  ];
  dataSource: MatTableDataSource<CustomerHistory>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public oService: UserDetailService, public dialog: MatDialog) {
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
}
