import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadingImagesViewDirective } from './lazy-loading-images-view.directive';
import { LazyLoadingImagesDirective } from './lazy-loading-images.directive';
import { LazyLoadingImagesService } from './lazy-loading-images.service';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LazyLoadingImagesDirective,
    LazyLoadingImagesViewDirective
  ],
  exports: [
    LazyLoadingImagesDirective,
    LazyLoadingImagesViewDirective
  ],
  providers: [LazyLoadingImagesService]
})
export class LazyLoadingImagessModule { }