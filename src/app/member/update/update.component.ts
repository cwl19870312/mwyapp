import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../service/member.service';
import { SmsService } from '../../service/sms.service';
import { ToastService } from '../../component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  providers: [SmsService]
})
export class UpdateComponent implements OnInit {
  member;
  bank_list = [{"key": "1002", "value": "工商银行"}, {"key": "1005", "value": "农业银行"}, {"key": "1026", "value": "中国银行"}, {"key": "1003", "value": "建设银行"},
  {"key": "1001", "value": "招商银行"}, {"key": "1066", "value": "邮储银行"}, {"key": "1020", "value": "交通银行"}, {"key": "1004", "value": "浦发银行"}, 
  {"key": "1006", "value": "民生银行"}, {"key": "1009", "value": "兴业银行"}, {"key": "1010", "value": "平安银行"}, {"key": "1021", "value": "中信银行"}, 
  {"key": "1025", "value": "华夏银行"}, {"key": "1027", "value": "广发银行"}, {"key": "1022", "value": "广大银行"}, {"key": "1032", "value": "北京银行"}, 
  {"key": "1056", "value": "宁波银行"}];

  bank;
  bank_account;
  bank_holder;
  code;
  send = false;
  second = 60;
  interval;

  constructor(
    private _memberService: MemberService, 
    private _smsService: SmsService,
    private _toastService: ToastService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getMemberDetail();
  }

  getMemberDetail(){
    this._memberService.getDetail().subscribe((data)=>{
      this.member = data;
      this.bank = this.member.bank;
      this.bank_account = this.member.bank_account_last4;
      this.bank_holder = this.member.bank_holder;
    })
  }

  sendSms(){   
    let phone = this.member.phone;
    let category = 'BANK';

    this._smsService.sendCode(phone, category).subscribe((data)=>{
      this.send = true;
      this.interval = this.second;
      let interval_obj = setInterval(()=>{
        this.interval -= 1;
        if (this.interval == 0){
          clearInterval(interval_obj);
          this.send = false;
        }
      }, 1000)
    }, (error)=>{
      this._toastService.toast(error);
    })
  }

  update(){
    let data = {'bank': this.bank, 'bank_account': this.bank_account, 'bank_holder': this.bank_holder, 'code': this.code}
    this._memberService.update(data).subscribe((data)=>{
      this.member.bank = data.bank;
      this.member.bank_account = data.bank_account;
      this.member.bank_holder = data.bank_holder;
      this._toastService.toast('修改成功');
    }, (error)=>{
      this._toastService.toast(error);
    })
  }

  logout(){
    this._memberService.logout().subscribe(()=>{
      this._router.navigateByUrl('/index');
    },(error)=>{
      this._toastService.toast(error);
    })
  }

}
