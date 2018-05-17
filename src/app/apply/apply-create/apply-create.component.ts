import { Component, OnInit } from '@angular/core';
import { BankService } from '../../service/bank.service';
import { MemberService } from '../../service/member.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplyService } from '../../service/apply.service';
import { ToastService } from '../../component';

@Component({
  selector: 'app-apply-create',
  templateUrl: './apply-create.component.html',
  styleUrls: ['./apply-create.component.css'],
  providers: [ApplyService]
})
export class ApplyCreateComponent implements OnInit {
  uid;
  name;
  phone;
  cid;

  bank;
  infoList;

  constructor(
    private _bankService: BankService,
    private _memberService: MemberService,
    private _route: ActivatedRoute,
    private _applyService: ApplyService,
    private _toastService: ToastService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getBankDetail();
    this.getInfoList();
  }

  getBankDetail(){
    let uid = this._route.snapshot.params['uid'];
    this.uid = uid;
    this._bankService.getBankByUid(uid).subscribe((data)=>{
      this.bank = data;
    })
  }

  getInfoList(){
    this._memberService.getInfoList().subscribe((data)=>{
      this.infoList = data;
    })
  }

  select(info){
    this.name = info.name;
    this.phone = info.phone;
    this.cid = info.cid;
  }

  create(){
    let loading = this._toastService.loading();
    this._applyService.createApply(this.uid, this.name, this.phone, this.cid).subscribe(()=>{
      loading.hide();
      this._toastService.toast('提交成功');
      setTimeout(()=>{
        location.href = this.bank.apply_url
      }, 2000)   
    }, (error)=>{
      loading.hide();
      this._toastService.toast(error);
    });
  }

}
