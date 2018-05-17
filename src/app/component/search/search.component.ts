import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() placeholder: string = "输入你要搜索的内容";

  @Output() onInput: EventEmitter<string> = new EventEmitter<string>();

  @Output() onStopInput: EventEmitter<string> = new EventEmitter<string>();

  text: string;

  constructor() { }

  ngOnInit() {
    this.onInput.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(text => {
      this.onStopInput.emit(text);
    })
  }

  input(text) {
    this.onInput.emit(this.text);
  }

  clear() {
    this.text = '';
    this.onInput.emit('');
  }

}
