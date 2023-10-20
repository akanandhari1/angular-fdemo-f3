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

import { UserDetailService } from '../user-detail.service';

@Component({
  selector: 'app-lastvisit-history',
  templateUrl: './lastvisit-history.component.html',
  styleUrls: ['./lastvisit-history.component.scss'],
})
export class LastvisitHistoryComponent implements OnInit {
  lastVisitHistory: any = [];
  displayedColumns: string[] = ['on', 'ipAddress', 'status'];
  dataSource: MatTableDataSource<CustomerHistory>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public oService: UserDetailService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LastvisitHistoryComponent>
  ) {
    this.dialogRef.disableClose = true;
    this.oService.getlastVisitHistory().subscribe((re) => {
      this.lastVisitHistory = re;
      this.dataSource = new MatTableDataSource(this.lastVisitHistory);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {}
}
