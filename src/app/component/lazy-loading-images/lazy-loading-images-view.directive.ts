import { Directive, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { LazyLoadingImagesService } from './lazy-loading-images.service';

@Directive({
  selector: '[lazyLoadingView]'
})
export class LazyLoadingImagesViewDirective implements OnInit, OnDestroy {

  @Input('lazyLoadingView') key: string;

  constructor(
    private _img: ElementRef,
    private _lazyService: LazyLoadingImagesService
  ) { }

  ngOnInit() {
    if(!this.key) return;
    this._lazyService.setView(this.key, this._img.nativeElement);
  }

  ngOnDestroy() {
    this._lazyService.distory(this.key);
  }

}