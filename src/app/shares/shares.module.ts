import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';

const COMPONENTS = [
  ImageUploaderComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    LightboxModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharesModule { }
