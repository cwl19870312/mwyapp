import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css']
})
export class PickerComponent implements OnInit {

  @Input()
  set data(data: PickerData) {
    if (!data) return;
    this.level = data.level;
    this.originalData = data.list;
  }

  @Output() onPick: EventEmitter<{ item: PickerItem, list: Array<PickerItem> }> = new EventEmitter<{ item: PickerItem, list: Array<PickerItem> }>();

  level: number = 1;

  originalData: Array<PickerItem> = [];

  dataList: Array<PickerItem> = [];

  shopList: Array<Array<PickerItem>> = [];

  height = { "height": "0rem" };

  constructor() { }

  ngOnInit() {
  }

  setData(data: PickerData) {
    this.level = data.level;
    this.originalData = data.list;
    this.show();
  }

  private init() {

    this.shopList = [];
    let tempList = this.dataList;

    for (let i = 0; i < this.level; i++) {

      this.shopList.push(tempList);

      let tempItem;
      for (let x = 0; x < tempList.length; x++) {
        let item = tempList[x];
        if (item.active) {
          tempItem = item;
          break;
        }
      }
      if (tempItem && tempItem.children && tempItem.children.length > 0) {
        tempList = tempItem.children;
      } else {
        tempList = [];
      }
    }
    setTimeout(() => this.setHeight(), 20);
  }

  private setHeight() {
    let length = 0;
    this.shopList.forEach(list => {
      if (list.length > length) length = list.length;
    });
    let height = length * 2.2;
    if (height > 16) height = 16;
    this.height = { "height": height + "rem" };
  }

  pick(line: number, index: number) {
    for (let i = line; i < this.shopList.length; i++) {
      let lineData = this.shopList[i];
      lineData.forEach(item => {
        item.active = false;
      })
    }
    let actItem = this.shopList[line][index];
    actItem.active = true;
    if (actItem.children && actItem.children.length > 0) {
      this.init();
    } else {
      this.originalData = this.deepCopy(this.dataList);
      this.onPick.emit({item:actItem,list:this.originalData});
      this.hide();
    }
  }

  show() {
    this.dataList = this.deepCopy(this.originalData);
    this.init();
  }

  hide() {
    this.dataList = [];
    this.init();
  }

  private deepCopy<T>(obj: T): T {
    let objData = JSON.stringify(obj);
    return JSON.parse(objData);
  }

}

export interface PickerData {
  level: number,
  list: Array<PickerItem>
}

export interface PickerItem {
  text: string;
  tip?: string;
  value: string;
  children?: Array<PickerItem>;
  active?: boolean;
}
