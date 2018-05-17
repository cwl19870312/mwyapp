import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';
import { TabItemComponent } from './tab-item/tab-item.component';
import { TabContentComponent } from './tab-content/tab-content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TabComponent,
    TabItemComponent,
    TabContentComponent
  ],
  exports: [
    TabComponent,
    TabItemComponent,
    TabContentComponent
  ]
})
export class TabModule { }