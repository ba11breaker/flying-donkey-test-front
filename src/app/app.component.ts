import { Component } from '@angular/core';
import { FileService } from './services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
    public fileService: FileService
  ) {

  }

  changeRoute(evt) {
    console.log(evt);
  }
}
