import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl = environment.baseUrl;
  generalTypes = [];
  uploading = false;

  constructor(
    private http: HttpClient
  ) {
    
  }

  setUploading(uploading) {
    this.uploading = uploading;
  }

  fetchGeneralTypes() {
    const req = new HttpRequest('GET', `${this.baseUrl}/files/generalTypes`);
    return this.http.request(req);
  }

  requestUploadFile(item, allowedType, allowedSize) {
    const formData = new FormData();
    formData.append('file', item.file as any);
    formData.append('allowedType', allowedType);
    formData.append('allowedSize', `${allowedSize}`);
    const req = new HttpRequest('POST', `${this.baseUrl}/files/upload`, formData, {
      reportProgress: true,
      withCredentials: true
    });
    return this.http.request(req);
  }

  requestFilterFiles(type, name) {
    const params = new HttpParams()
    .set('type', type)
    .set('name', name);
    const req = new HttpRequest('GET', `${this.baseUrl}/files/filter`,{
      params: params
    });
    return this.http.request(req);
  }
}
