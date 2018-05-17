import { Directive, Input, OnInit, ElementRef, OnDestroy } from '@angular/core';

@Directive({
  selector: '[WTHRatio]'
})
export class WidthToHeightRatioDirective implements OnInit, OnDestroy {

  @Input('WTHRatio') wTHRatio: number = 1;

  constructor(
    private _ele: ElementRef
  ) {
    // window.onresize = this.setHeight;
  }

  setHeight() {
    let width = this._ele.nativeElement.offsetWidth;
    let height = width / this.wTHRatio;
    this._ele.nativeElement.style.height = height + 'px';
    // console.log(height);
  }

  ngOnInit() {
    window.addEventListener('resize', this.setHeightAfterRender);
    window.addEventListener('orientationchange', this.setHeightAfterRender);
    this.setHeight();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.setHeightAfterRender);
    window.removeEventListener('orientationchange', this.setHeightAfterRender);
  }

  setHeightAfterRender = () => {
    setTimeout(() => {
      this.setHeight();
    }, 2);
  }

}