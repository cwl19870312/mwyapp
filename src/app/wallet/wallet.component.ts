import { Component, OnInit, OnDestroy } from '@angular/core';
import { RebateService } from '../service/rebate.service';
import { ToastService } from '../component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
  providers: [RebateService]
})
export class WalletComponent implements OnInit, OnDestroy {
  rebate_count;
  rebateList;
  next;

  sub;

  constructor(
    private _rebateService: RebateService,
    private _toastService: ToastService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getRebateCount();
    this.getRebateList();
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  getRebateCount(){
    this._rebateService.getRebateCount().subscribe((data)=>{
      this.rebate_count = data;
    })
  }

  getRebateList(){
    this.sub = this._rebateService.resultSubject.subscribe((data)=>{
      this.rebateList = data.list;
      this.next = data.next;
    })
  }

  getNext(){
    this._rebateService.getNext();
  }

  pay(){
    let loading = this._toastService.loading();
    this._rebateService.rebatePay().subscribe((data)=>{
      loading.hide();
      this._toastService.toast('提现成功，提现到银行卡需要1~2天才能到账');
      this.getRebateCount();
      this._rebateService.init();
      this.getNext();
    }, (error)=>{
      loading.hide();
      this._toastService.toast(error);
    })
  }

}
