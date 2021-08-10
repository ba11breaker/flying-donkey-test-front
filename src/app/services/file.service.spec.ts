import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get correct general types values', (done: DoneFn) => {
    service.fetchGeneralTypes().subscribe(response => {
      if (response instanceof HttpResponse) {
        expect(response.ok).toBe(true);
        expect(response.body).toEqual([
          'text',
          'image',
          'audio',
          'application',
          'video'
        ]);
        done();
      }
    }, error => {
      expect(error).toBeTruthy();
      done();
    });
  });

  it('upload file test.text', (done: DoneFn) => {
    const item = {file: new File([], 'test.text', {type: 'text/plain'})};
    service.requestUploadFile(item, 'text', 10).subscribe(response => {
      if (response instanceof HttpResponse) {
        expect(response.ok).toBe(true);
        expect(response.body).toBeTruthy();
        expect(response.body['message']).toEqual('upload a new file test.text successfully!');
        expect(response.body['file']).toBeTruthy();
        expect(response.body['file'].generalType).toEqual('text');
      }
      done();
    }, error => {
      expect(error).toBeTruthy();
      done();
    })
  });

  it('upload file test.text with wrong type application', (done: DoneFn) => {
    const item = {file: new File([], 'test.text', {type: 'text/plain'})};
    service.requestUploadFile(item, 'application', 10).subscribe(response => {
      expect(response).toBeTruthy();
      done()
    }, error => {
      expect(error).toBeTruthy();
      expect(error.status).toBe(400);
      expect(error['error']).toBeTruthy();
      expect(error['error'].message).toEqual('test.text is text/plain, not consistent with application. Please choose text type!');
      expect(error['error'].success).toBe(false);
      done();
    });
  });
});
