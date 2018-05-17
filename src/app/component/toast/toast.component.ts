import { Component, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Animations } from '../utils';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [Animations.fadeSlideUp]
})
export class ToastComponent implements OnInit, OnDestroy {

  @Output() onHide: EventEmitter<void> = new EventEmitter<void>();

  _show: boolean = false;

  _type: 'loading' | 'success' | 'error' | 'toast' = 'loading';

  _text: string;

  private timer;

  constructor(
    private _ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  show(type: 'loading' | 'success' | 'error' | 'toast', text?: string, time?: number) {
    const texts = {
      loading: '数据加载中',
      success: '操作成功',
      error: '操作失败'
    }
    this._type = type;
    this._text = text || texts[type];
    if (time !== 0) {
      time = time || 2000;
      this.timer = setTimeout(() => {
        this.hide();
      }, time);
    }
    this._show = true;
    this._ref.detectChanges();
  }

  loading(text?: string, time: number = 0) {
    this.show('loading', text, time);
  }

  toast(text: string, time: number = 2000) {
    this.show('toast', text, time);
  }

  hide() {
    this._show = false;
    this.onHide.emit();
    this._ref.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

}
