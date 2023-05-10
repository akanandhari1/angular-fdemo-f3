import {
  Component,
  ViewChild,
  Input,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from 'src/app/insurance-provider/delete-confirm/delete-confirm.component';

@Component({
  selector: 'browse-file',
  templateUrl: './browse-file.component.html',
  styleUrls: ['./browse-file.component.scss'],
})
export class BrowseFileComponent implements OnInit {
  public files: any[] = [];
  enablesubmit = false;
  @Input()
  public title: any = '';

  @Input()
  set file(val: any) {
    if (val) {
      if (this.files.length == 0) {
        this.files.push(val);
      }
    } else this.files = [];
  }
  @Output()
  public out = new EventEmitter();
  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) {}

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    console.log('length', $event.target?.files.length);
    console.log('filelength', this.files.length);

    if ($event.target?.files?.length > 1) {
      this._snackBar.open('Only one file can be uploaded', 'Close', {
        duration: 2000,
        verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
        horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      });
      return;
    }
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any) {
    if (event.target.files.length > 1) {
      this._snackBar.open('Only one file can be uploaded', 'Close', {
        duration: 2000,
        verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
        horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      });
      return;
    } else {
      this.prepareFilesList(event.target.files);
    }
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          this.enablesubmit = false;

          if (this.files[index].progress === 100) {
            this.enablesubmit = true;
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.enablesubmit = false;
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    if (files.length === 1) {
      for (const item of files) {
        this.files.push(item);

        item.progress = 0;
      }

      this.out.emit(this.files);
      console.log(this.files);
      this.uploadFilesSimulator(0);
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals?: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  ngOnInit(): void {}
  openDialog(index: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '  330px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteFile(index);
      }
    });
  }
}
