import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../service/member.service';
import { ToastService } from '../../component';
import { RebateService } from '../../service/rebate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RebateService]
})
export class HomeComponent implements OnInit {
  member;
  rebate_count;

  constructor(
    private _memberService: MemberService,
    private _toastService: ToastService,
    private _rebateService: RebateService
    ) { }

  ngOnInit() {
    this.getMember();
    this.getRebateCount();
  }

  getMember(){
    this._memberService.getDetail().subscribe((data)=>{
      this.member = data;
    }, (error)=>{
      this._toastService.toast(error);
    })
  }

  getRebateCount(){
    this._rebateService.getRebateCount().subscribe((data)=>{
      this.rebate_count = data;
    }, (error)=>{
      this._toastService.toast(error);
    })
  }

}
