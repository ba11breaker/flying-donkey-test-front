import { HttpClient, HttpErrorResponse, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, OnChanges } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {  NzNotificationService } from 'ng-zorro-antd/notification';

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

  @HostListener('window:beforeunload')
  alertWhenLoading(event) {
    if (this.loading) {
      (event || window.event).returnValue = "Your upload hasn't been completed. Are you sure to leave?"
    }
  }

  constructor(
    private fileService: FileService,
    private nzMessageService: NzMessageService,
    private notification: NzNotificationService
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
      // start uploading
      this.loading = true;
      this.fileService.setUploading(true);
    } else if (event.type === 'success') {
      // complete uploading successfully
      this.loading = false;
      this.fileService.setUploading(false);
      const {response} = event.file;
      this.notification.create(
        'success', 
        'Success', 
        response.message,
        {nzDuration: 0}
      );
    } else if (event.type === 'error') {
      // face error during uploading
      this.loading = false;
      this.fileService.setUploading(false);
      if (event.file.error instanceof HttpErrorResponse) {
        const {error} = event.file.error;
        if (error.message) {
          this.notification.create(
            'error', 
            'Failed', 
            error.message,
            {nzDuration: 0}
          );
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
