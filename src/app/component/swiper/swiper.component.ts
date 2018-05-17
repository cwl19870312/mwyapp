import { Component, OnInit, Input, ViewChild, ElementRef, AfterContentInit } from '@angular/core';

declare var Swiper: any

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css']
})
export class SwiperComponent implements OnInit, AfterContentInit {

  @ViewChild('swiper') swiperEl: ElementRef
  @ViewChild('pagination') paginationEl: ElementRef

  @Input() config = {
    autoInit: false
  };
  @Input() containerStyle = {}

  swiper: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    // console.log(this.config)
    // this.init();
    if (this.config.autoInit) this.init();
  }

  update(config: any) {
    this.config = config;
    if (this.swiper) this.swiper.update(config)
  }

  getSwiper() {
    return this.swiper;
  }

  updateSlides() {
    this.swiper.updateSlides();
  }

  init() {
    if (this.config['pagination'] === true) {
      this.config['pagination'] = {
        el: this.paginationEl.nativeElement
      }
    }
    this.swiper = new Swiper(this.swiperEl.nativeElement, this.config);
    return this.swiper;
  }

}
