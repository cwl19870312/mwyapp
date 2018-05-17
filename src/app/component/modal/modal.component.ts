import { Component, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Animations } from '../utils';
import { ModalButton, ModalConfig } from './modal.class';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [Animations.fade, Animations.zoom]
})
export class ModalComponent implements OnInit, OnDestroy {

  @Output() onHide: EventEmitter<void> = new EventEmitter<void>();

  _show: boolean = false;

  _title: string;

  _text: string;

  _buttons: Array<ModalButton>;

  constructor(
    private _ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  modal(config: ModalConfig) {
    this._title = config.title;
    this._text = config.text;
    if (config.buttons) {
      this._buttons = config.buttons;
    } else {
      this._buttons = [{
        text: '确定',
        main: true
      }]
    }
    this._show = true;
    this._ref.detectChanges();
  }

  alert(title?: string, text?: string, callback?: () => void) {
    this.modal({
      title: title,
      text: text,
      buttons: [{
        text: '确定',
        main: true,
        callback: callback
      }]
    })
  }

  confirm(title?: string, text?: string, ok?: () => void, cancel?: () => void) {
    this.modal({
      title: title,
      text: text,
      buttons: [
        {
          text: '取消',
          callback: cancel
        }, {
          text: '确定',
          main: true,
          callback: ok
        }]
    })
  }

  hide() {
    this._show = false;
    this.onHide.emit();
  }

  buttonClick(index) {
    let button = this._buttons[index];
    if (button.callback) button.callback();
    this.hide();
  }

  ngOnDestroy() {
    this.onHide.emit();
  }

}