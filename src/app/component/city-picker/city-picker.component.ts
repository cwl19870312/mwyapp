import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { RawCitiesData, RawCity } from '../utils/rawCitiesData';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-city-picker',
  templateUrl: './city-picker.component.html',
  styleUrls: ['./city-picker.component.css']
})
export class CityPickerComponent implements OnInit {

  @Output() onChange: EventEmitter<string> = new EventEmitter();

  @Output() onHide: EventEmitter<void> = new EventEmitter();

  @ViewChild(PopupComponent) popup: PopupComponent;

  @ViewChild('content') content: ElementRef;

  rawCitiesData: Array<RawCity> = RawCitiesData;

  choseData: Array<RawCity> = [];

  showList: Array<RawCity> = RawCitiesData;

  constructor() { }

  ngOnInit() {
  }

  title() {
    if (this.choseData.length > 0) {
      let title = '';
      this.choseData.forEach((item, i) => {
        if (i !== 0) title += ' - ';
        title += item.label;
      });
      return title;
    } else {
      return '选择所在地区';
    }
  }

  chose(city: RawCity) {
    // console.log(city);
    this.choseData.push(city);
    if (!city.children || city.children.length === 0) {
      this.emit();
    } else {
      this.setShowList();
    }
  }

  back() {
    if (this.choseData.length > 0) {
      this.choseData.pop();
      this.setShowList();
    } else {
      this.hide();
    }
  }

  show() {
    this.init();
    this.popup.show();
  }

  hide() {
    this.popup.hide();
  }

  private setShowList() {
    let length = this.choseData.length;
    if (length === 0) {
      this.showList = this.rawCitiesData;
    } else {
      this.showList = this.choseData[length - 1].children;
      this.content.nativeElement.scrollTop = 0;
    }
  }

  private emit() {
    let city = '';
    this.choseData.forEach(item => {
      city += item.label;
    });
    this.onChange.emit(city);
    this.hide();
  }

  private init() {
    this.choseData = [];
    this.showList = this.rawCitiesData;
  }


}
