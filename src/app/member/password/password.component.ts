import { Component, OnInit } from '@angular/core';
import { SmsService } from '../../service/sms.service';
import { ToastService } from '../../component';
import { MemberService } from '../../service/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  providers: [SmsService]
})
export class PasswordComponent implements OnInit {
  phone;
  password1;
  password2;
  code;

  second = 60;
  interval;
  send;

  constructor(
    private _smsService: SmsService,
    private _toastService: ToastService,
    private _memberService: MemberService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  resetPassword(){
    if(!this.phone) return this._toastService.toast('请输入手机号码');
    if(!this.password1 || !this.password2) return this._toastService.toast('请输入密码和确认密码');
    if(this.password1.length < 6) return this._toastService.toast('密码不能小于6位数');
    if(this.password1 != this.password2) return this._toastService.toast('密码和确认密码不相同');
    if(!this.code) return this._toastService.toast('请输入短信验证码');

    let loading = this._toastService.loading();
    let data = {'phone': this.phone, 'password': this.password1, 'code': this.code}
    this._memberService.resetPassword(data).subscribe((data)=>{
      loading.hide();
      this._toastService.toast('密码修改成功');
      this._router.navigateByUrl('/home');
    }, (error)=>{
      loading.hide();
      this._toastService.toast(error);
    })

  }

  sendSms(){
    if(!this.phone) return this._toastService.toast('请输入手机号码');  
    let phone = this.phone;
    let category = 'PASSWORD';

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

}
