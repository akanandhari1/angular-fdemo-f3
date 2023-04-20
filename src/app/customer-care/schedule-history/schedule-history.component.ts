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

@Component({
  selector: 'app-schedule-history',
  templateUrl: './schedule-history.component.html',
  styleUrls: ['./schedule-history.component.scss'],
})
export class ScheduleHistoryComponent implements OnInit, AfterViewInit {
  ScheduleHistory: any = [];
  displayedColumns: string[] = ['ActionDate', 'Action', 'comments', 'ActionBy'];
  dataSource: MatTableDataSource<CustomerHistory>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public oService: IProviderService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ScheduleHistoryComponent>
  ) {
    this.dialogRef.disableClose = true;
    this.oService.getScheduleHistory().subscribe((re) => {
      this.ScheduleHistory = re;
      this.dataSource = new MatTableDataSource(this.ScheduleHistory);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {}
}
