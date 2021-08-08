
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
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

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
    NzMessageModule,
    NzTableModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzNotificationModule
  ],
  providers: [
  ]
})
export class AntdModule {

}
