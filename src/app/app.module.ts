import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UploadComponent } from './components/upload/upload.component';
import { AntdModule } from './ng-zorro-antd.module';
import { FilesComponent } from './components/files/files.component';



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    FilesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
