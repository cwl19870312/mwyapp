import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-more',
  templateUrl: './loading-more.component.html',
  styleUrls: ['./loading-more.component.css']
})
export class LoadingMoreComponent implements OnInit {

  @Input()
  more: boolean = true;

  @Input()
  color: string;

  @Input()
  text: string = '已经到底了';

  @Input()
  background: string = '#fff';

  constructor() { }

  ngOnInit() {
  }

  setColor() {
    if (this.color) return { 'background-color': this.color }
  }

  setBackground() {
    return { 'background': this.background };
  }

}
