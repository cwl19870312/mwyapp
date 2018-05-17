import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamePipe } from './name.pipe'
import { MobilePipe } from './mobile.pipe';

@NgModule({
  declarations: [
    NamePipe,
    MobilePipe
  ],
  exports: [
    NamePipe,
    MobilePipe
  ]
})
export class CommonPipeModule { }