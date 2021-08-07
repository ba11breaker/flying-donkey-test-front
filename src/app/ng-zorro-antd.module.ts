
import { NgModule } from '@angular/core';


import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzMenuModule } from 'ng-zorro-antd/menu';


@NgModule({
  exports: [
    NzLayoutModule,
    NzTypographyModule,
    NzMenuModule
  ],
  providers: [
  ]
})
export class AntdModule {

}
