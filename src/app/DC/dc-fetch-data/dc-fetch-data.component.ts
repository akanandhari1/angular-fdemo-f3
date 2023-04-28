import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DcService } from 'src/app/DC/dc.service';
import { DC } from 'src/app/modal/dc';
import { SharedExportService } from 'src/app/shared-export.service';
export type filterValues = {
  Block: boolean;
};
export function coerceString(value: unknown, defaultValue = ''): string {
  if (typeof value === 'string') {
    return value;
  }

  if (value === null || value === undefined) {
    return defaultValue;
  }

  return String(value);
}
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
    'actionEdit',
    'actionDelete',
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
  isShowBlock = false;
  constructor(
    public dcService: DcService,
    public fileExportService: SharedExportService
  ) {}

  ngOnInit(): void {
    this.dcService.getDcList().subscribe((rs) => {
      this.dataSource = new MatTableDataSource(rs);

      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });

    this.dataSource.filterPredicate = this.createFilter();
    this.showBlockControl.valueChanges.subscribe((val: any) => {
      this.isShowBlock = true;
      this.applyBlockFilter(val);
    });
  }

  createFilter(): (record: DC, filter: any) => boolean {
    return function (record: DC, filter: any): boolean {
      // console.log('block', record.Block);
      // return record.Block == true ? true : false;
      var map = new Map(JSON.parse(filter));
      console.log('filter', filter);
      let isMatch = false;
      if (map.size != 0) {
        if (map.size == 1) {
          for (let [key, value] of map) {
            let rec: any = record[key as keyof DC];
            isMatch = rec == value;
            if (!isMatch) {
              return false;
            }
          }
          return isMatch;
        } else {
          for (let [key, value] of map) {
            if (key != 'Block') {
              let rec: any = record[key as keyof DC];
              if (
                rec != undefined &&
                rec
                  .toString()
                  .toLowerCase()
                  .indexOf(coerceString(value).toLowerCase()) != -1
              ) {
                let recBlocl = map.get('Block');
                if (recBlocl == undefined) {
                  return true;
                } else {
                  return record['Block'] !== undefined &&
                    record['Block'] == true
                    ? true
                    : false;
                }
              }
            }
          }
          return false;
        }
      }
      return true;
    };
  }
  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  clearFilter() {
    this.FilterControl.reset();
    this.showBlockControl.reset();
    this.filterDictionary.clear();
    var jsonString = JSON.stringify(
      Array.from(this.filterDictionary.entries())
    );
    this.dataSource.filter = jsonString;
  }
  applyBlockFilter(isChecked: boolean) {
    if (isChecked) {
      this.filterDictionary.set('Block', isChecked);
    } else {
      this.filterDictionary.delete('Block');
    }
    this.isShowBlock = true;

    var jsonString = JSON.stringify(
      Array.from(this.filterDictionary.entries())
    );

    this.dataSource.filter = jsonString;
    //console.log(this.filterValues);
  }

  applyFilter() {
    let filterValue = this.FilterControl.value.trim().toLowerCase();

    for (let obj in new DC()) {
      if (this.isShowBlock) {
        this.filterDictionary.set(obj, filterValue);
      } else {
        if (obj != 'Block') {
          this.filterDictionary.set(obj, filterValue);
        }
      }
    }
    console.log(' this.filterDictionary', this.filterDictionary);
    var jsonString = JSON.stringify(
      Array.from(this.filterDictionary.entries())
    );
    console.log(' this.jsonString', jsonString);

    this.dataSource.filter = jsonString;
  }
  downloadExcel() {
    let dateTim = new Date().toString();
    this.fileExportService.exportAsExcelFile(
      this.dataSource.filteredData,
      'filedownload_' + dateTim
    );
  }
}
