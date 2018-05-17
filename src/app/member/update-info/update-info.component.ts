import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../service/member.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../component';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {
  uid;
  name;
  phone;
  cid;
  is_default = false;

  constructor(
    private _memberService: MemberService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _toastService: ToastService
  ) { }

  ngOnInit() {
    this.getInfoByUid();
  }

  getInfoByUid(){
    let uid = this._route.snapshot.params['uid'];
    if (uid){
      this.uid = uid;
      this._memberService.getInfoDetailByUid(this.uid).subscribe((data)=>{
        let info = data;
        this.name = info.name;
        this.phone = info.phone;
        this.cid = info.cid;
        this.is_default = info.is_default;
      })

    }
  }

  title() {
    return this.uid ? '编辑申卡信息' : '添加申卡信息';
  }

  setDefault() {
    this.is_default = !this.is_default;
  }

  save() {
    let loading = this._toastService.loading();
    let ob;
    if(this.uid){
      ob = this._memberService.updateInfoByUid(this.uid, this.name, this.phone, this.cid, this.is_default)
    }
    else{
      ob = this._memberService.createInfo(this.name, this.phone, this.cid, this.is_default);
    }
    ob.subscribe(
      data => {
        loading.hide();
        this._toastService.toast('保存成功');
        setTimeout(()=>{
          history.back();
        },2000);
      },
      error => {
        loading.hide();
        this._toastService.toast(error);
      }
    )
  }

}
