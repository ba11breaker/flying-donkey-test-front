
import { NgModule } from '@angular/core';


import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzUploadModule } from 'ng-zorro-antd/upload';


@NgModule({
  exports: [
    NzLayoutModule,
    NzTypographyModule,
    NzMenuModule,
    NzUploadModule
  ],
  providers: [
  ]
})
export class AntdModule {

}
