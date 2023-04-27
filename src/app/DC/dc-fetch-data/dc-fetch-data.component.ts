import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DcService } from 'src/app/DC/dc.service';
import { DC } from 'src/app/modal/dc';
export type filterValues = {
  Block: boolean;
};

@Component({
  selector: 'app-dc-fetch-data',
  templateUrl: './dc-fetch-data.component.html',
  styleUrls: ['./dc-fetch-data.component.scss'],
})
export class DcFetchDataComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<DC>;
  filterDictionary = new Map<string, boolean>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  showBlockControl = new FormControl();
  FilterControl = new FormControl();

  displayedColumns: string[] = [
    'actions',
    'Dc_UID',
    'DcName',
    'Grade',
    'Block',
    'Address',
    'Location',
    'City',
    'state',
    'Pincode',
    'ContactPerson1Name',
    'ContactPerson1No',
    'ContactPerson2Name',
    'ContactPerson2No',
    'Landline',
    'Email',
    'Spoc_Name',
    'MER',
    'X_RAY',
    'Lab',
    'ECG',
    'TwoD_ECHO',
    'Urine_Cotinine',
    'CTMT',
    'USG',
    'Female_Tech',
    'ReportsTat',
    'HomeVisit',
    'DCVisit',
    'TATA_AIG',
    'HDFC',
    'SBI',
  ];
  public filterValues = {} as filterValues;

  constructor(public dcService: DcService) {}

  ngOnInit(): void {
    this.dcService.getDcList().subscribe((rs) => {
      this.dataSource = new MatTableDataSource(rs);

      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });

    this.dataSource.filterPredicate = function (record, filter) {
      debugger;
      var map = new Map(JSON.parse(filter));
      console.log('filter', filter);
      let isMatch = false;
      if (map.size != 0) {
        for (let [key, value] of map) {
          isMatch = record[key as keyof DC] == value;
          if (!isMatch) {
            return false;
          }
        }
        return isMatch;
      }
      return true;
    };
    this.showBlockControl.valueChanges.subscribe((val) => {
      this.applyBlockFilter(val);
    });
  }
  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  clearFilter() {
    this.FilterControl.reset();
    this.dataSource.filter = this.FilterControl.value.trim().toLowerCase();
  }
  applyBlockFilter(isChecked: boolean) {
    if (isChecked) {
      this.filterDictionary.set('Block', isChecked);
    } else {
      this.filterDictionary.delete('Block');
    }

    var jsonString = JSON.stringify(
      Array.from(this.filterDictionary.entries())
    );

    this.dataSource.filter = jsonString;
    //console.log(this.filterValues);
  }

  applyFilter() {
    let filterValue = this.FilterControl.value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  downloadExcel() {}
}
