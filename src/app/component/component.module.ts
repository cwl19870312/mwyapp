import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LazyLoadingImagessModule } from './lazy-loading-images';
import { ActionsheetComponent } from './actionsheet/actionsheet.component';
import { ToastComponent, ToastService } from './toast';
import { ModalComponent, ModalService } from './modal';
import { SwiperComponent } from './swiper/swiper.component';
import { CounterComponent } from './counter/counter.component';
import { InfiniteScrollDirective } from './infinite-scroll/infinite-scroll.directive';
import { LoadingMoreComponent } from './loading-more/loading-more.component';
import { PickerComponent } from './picker/picker.component';
import { SearchComponent } from './search/search.component';
import { CommonPipeModule } from './pipe/index';
import { WidthToHeightRatioDirective } from './width-to-height-ratio/width-to-height-ratio.directive';
import { TabModule } from './tab/tab.module';
import { ImgUploaderComponent } from './img-uploader/img-uploader.component';
import { PopupComponent } from './popup/popup.component';
import { CityPickerComponent } from './city-picker/city-picker.component';
import { CityPickerService } from './city-picker/city-picker.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LazyLoadingImagessModule,
    CommonPipeModule,
    TabModule
  ],
  declarations: [
    ActionsheetComponent,
    ToastComponent,
    SwiperComponent,
    CounterComponent,
    ModalComponent,
    LoadingMoreComponent,
    InfiniteScrollDirective,
    PickerComponent,
    SearchComponent,
    WidthToHeightRatioDirective,
    ImgUploaderComponent,
    PopupComponent,
    CityPickerComponent
],
  exports: [
    ActionsheetComponent,
    ToastComponent,
    SwiperComponent,
    CounterComponent,
    ModalComponent,
    LoadingMoreComponent,
    InfiniteScrollDirective,
    PickerComponent,
    SearchComponent,
    LazyLoadingImagessModule,
    CommonPipeModule,
    WidthToHeightRatioDirective,
    TabModule,
    ImgUploaderComponent,
    PopupComponent,
    CityPickerComponent
  ],
  providers: [
    ToastService,
    ModalService,
    CityPickerService
  ],
  entryComponents: [
    ToastComponent,
    ModalComponent,
    ActionsheetComponent,
    CityPickerComponent
  ]
})
export class ComponentModule { }