import { Component, OnInit } from '@angular/core';
import { Animations } from '../utils/animations';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  animations: [Animations.popupFade, Animations.popupUp]
})
export class PopupComponent implements OnInit {

  _show: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  show(){
    this._show = true;
  }

  hide(){
    this._show = false;
  }

}
