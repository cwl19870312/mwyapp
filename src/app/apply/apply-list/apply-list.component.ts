import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplyService } from '../../service/apply.service';

@Component({
  selector: 'app-apply-list',
  templateUrl: './apply-list.component.html',
  styleUrls: ['./apply-list.component.css'],
  providers: [ApplyService]
})
export class ApplyListComponent implements OnInit, OnDestroy {

  applyList;
  next = true;

  myself = 1;

  sub;


  constructor(private _applyService: ApplyService) { }

  ngOnInit() {
    this.getApplyList();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
  
  getApplyList(){
    this.sub = this._applyService.resultSubject.subscribe((data)=>{
      this.applyList = data.list;
      this.next = data.next;
    })
  }

  setMyself(myself){
    if (myself != this.myself){
      this.myself = myself;
      this._applyService.setParams(this.myself);
      this.getNext();
    }     
  }

  getNext() {
    this._applyService.getNext();
  }

}
