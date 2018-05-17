import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Animations } from '../utils';
@Component({
  selector: 'app-actionsheet',
  templateUrl: './actionsheet.component.html',
  styleUrls: ['./actionsheet.component.css'],
  animations: [Animations.fade, Animations.fadeSlideUp],
})
export class ActionsheetComponent implements OnInit {

  @Input() actived:boolean = false;
  @Output() onHide:EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  show(){
    this.actived = true;
  }

  hide(){
    this.actived = false;
    this.onHide.emit();
  }

}
