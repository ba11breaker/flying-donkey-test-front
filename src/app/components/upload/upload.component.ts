import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements AfterViewInit {

  baseUrl = `${environment.baseUrl}/files/upload`;

  constructor(
    private http: HttpClient
  ) { }

  request = (item) => {
    const formData = new FormData();
    formData.append('file', item.file as any);
    formData.append('allowedType', 'application');
    formData.append('allowedSize', '40000000');
    const req = new HttpRequest('POST', this.baseUrl, formData, {
      reportProgress: true,
      withCredentials: true
    });
    return this.http.request(req).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {

        }
      }
    );
  }

  ngAfterViewInit(): void {
    const defaultUploads = document.getElementsByTagName("nz-upload-list");
    if (defaultUploads.length > 0) {
      const defaultUpload = defaultUploads[0];
      defaultUpload['hidden'] = true;
    }
  }

  handleChange(event) {
    console.log(event);
  }
}
