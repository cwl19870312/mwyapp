import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  @Input() num: number = 1;
  @Input() min: number = 1;
  @Input() max: number;
  @Input() input: boolean = false;

  @Output() onChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  change(num) {
    if (num < this.min || (this.max && num > this.max)) return;
    this.num = num;
    this.onChange.emit(this.num);
  }

}
