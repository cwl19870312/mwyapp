import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { LazyLoadingImagesService } from './lazy-loading-images.service';
import { LazyLoadingImage } from './lazy-loading-images.class';
@Directive({
  selector: '[lazyLoading]'
})
export class LazyLoadingImagesDirective implements OnInit {

  @Input('lazyLoading') lazyImage: string;
  @Input('dataSrc') dataSrc: string;
  @Input('defaultSrc') default: string;

  constructor(
    private _img: ElementRef,
    private _lazyService: LazyLoadingImagesService
  ) { }

  ngOnInit() {
    if (!this.lazyImage || !this.dataSrc) return;
    let img = new LazyLoadingImage(this.lazyImage, this.dataSrc, this._img.nativeElement, this.default);
    this._lazyService.setImage(img);
  }

}