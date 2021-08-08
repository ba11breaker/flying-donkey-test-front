import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, pluck } from 'rxjs/operators';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit, AfterViewInit {

  @ViewChild('fileNameInput', {static: true}) private inputEl: ElementRef;

  tableLoading = false;
  files = [];
  generalTypes = [];
  type = '';
  name = '';

  constructor(
    private fileService: FileService
  ) { }

  ngOnInit(): void {
     // fetch General types of files from back gend
     this.fileService.fetchGeneralTypes().subscribe(res => {
      if (res['ok']) {
        this.generalTypes = res['body'];
        this.type = this.generalTypes[0];
        this.filterFiles();
      }
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.inputEl.nativeElement, 'input').pipe(
      debounceTime(500),
      pluck('target', 'value')
    ).subscribe(res => {
      this.filterFiles();
    });
  }

  sizeFormatter(number) {
    if (number < 1024) {
      return `${number} bytes`;
    }
    if (number < 1048576) {
      return `${(number/1024).toFixed(2)} KB`;
    }
    return `${(number/1048576).toFixed(2)} MB`;
  }

  search(event) {
    this.filterFiles();
  }
  
  filterFiles() {
    this.tableLoading = true;
    this.fileService.requestFilterFiles(this.type, this.name).subscribe(
      res => {
        this.tableLoading = false;
        if (res instanceof HttpResponse && res.ok) {
          if (res.body instanceof Array) {
            this.files = res.body;
          }
        }
      },
      error => {
        console.log(error);
        this.tableLoading = false;
      }
    );
  }

}
