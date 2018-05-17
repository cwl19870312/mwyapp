import { Component, OnInit, ViewChild } from '@angular/core';
import { BankService } from '../../service/bank.service';
import { Route, ActivatedRoute } from '@angular/router';
import { PopupComponent } from '../../component/popup/popup.component';

@Component({
  selector: 'app-bankDetail',
  templateUrl: './bankDetail.component.html',
  styleUrls: ['./bankDetail.component.css']
})
export class BankDetailComponent implements OnInit {
  uid;
  bank;
  @ViewChild(PopupComponent) popup: PopupComponent;

  constructor(private _bankSerivce: BankService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getBankDetail()
  }

  getBankDetail(){
    this.uid = this._route.snapshot.params['uid'];
    this._bankSerivce.getBankByUid(this.uid).subscribe((data)=>{
      this.bank = data;
    })
  }

  popupUp() {
    this.popup.show();
  }

  popupDown() {
    this.popup.hide();
  }
}
