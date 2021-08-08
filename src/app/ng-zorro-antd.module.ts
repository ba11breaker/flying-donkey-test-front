
import { NgModule } from '@angular/core';


import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageModule } from 'ng-zorro-antd/message';


@NgModule({
  exports: [
    NzLayoutModule,
    NzTypographyModule,
    NzMenuModule,
    NzUploadModule,
    NzSelectModule,
    NzFormModule,
    NzSliderModule,
    NzSpinModule,
    NzMessageModule
  ],
  providers: [
  ]
})
export class AntdModule {

}
