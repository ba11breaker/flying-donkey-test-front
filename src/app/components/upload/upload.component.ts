import { HttpClient, HttpErrorResponse, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit,AfterViewInit {

  loading = false;
  generalTypes = [];
  allowedType = null;
  allowedSize = 5000000;

  constructor(
    private fileService: FileService,
    private nzMessageService: NzMessageService
  ) {
    
  }

  ngOnInit(): void {
    // fetch General types of files from back gend
    this.fileService.fetchGeneralTypes().subscribe(res => {
      if (res['ok']) {
        this.generalTypes = res['body'];
        this.allowedType = this.generalTypes[0];
      }
    });
  }

  ngAfterViewInit(): void {
    const defaultUploads = document.getElementsByTagName("nz-upload-list");
    if (defaultUploads.length > 0) {
      const defaultUpload = defaultUploads[0];
      defaultUpload['hidden'] = true;
    }
  }

  sliderTipFormatter = (number) => {
    if (number < 1024) {
      return `${number} bytes`;
    }
    if (number < 1048576) {
      return `${(number/1024).toFixed(2)} KB`;
    }
    return `${(number/1048576).toFixed(2)} MB`;
  }

  handleChange(event) {
    if (event.type === 'start') {
      this.loading = true;
    } else if (event.type === 'success') {
      this.loading = false;
      const {response} = event.file;
      this.nzMessageService.create('success', response.message);
    } else if (event.type === 'error') {
      this.loading = false;
      if (event.file.error instanceof HttpErrorResponse) {
        const {error} = event.file.error;
        if (error.message) {
          this.nzMessageService.create('error', error.message);
        }
      }
    }

  }

  requestUpload = (item) => {
    return this.fileService.requestUploadFile(item, this.allowedType, this.allowedSize).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          (event as any).percent = (event.loaded / event.total) * 100;
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          item.onSuccess!(event.body, item.file!, event);
        }
      },
      err => {
        item.onError!(err, item.file!);
      }
    );
  }
}
