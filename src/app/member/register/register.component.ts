import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../component';
import { MemberService } from '../../service/member.service';
import { Router } from '@angular/router';
import { SmsService } from '../../service/sms.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [SmsService]
})
export class RegisterComponent implements OnInit {
  name;
  phone;
  password;
  password2;

  code;
  send = false;
  second = 60;
  interval;

  constructor(
    private _toastService: ToastService,
    private _memberService: MemberService,
    private _router: Router,
    private _smsService: SmsService
  ) { }

  ngOnInit() {
  }

  register() {
    if (this.password != this.password2) {
      this._toastService.toast('2次输入的密码不一致');
      return;
    }
    let loading = this._toastService.loading();
    let data = {'name': this.name, 'phone': this.phone, 'password': this.password, 'code': this.code}
    this._memberService.register(data).subscribe(
      data => {
        loading.hide();
        this._toastService.toast('注册成功');
        setTimeout(()=>{
          this._router.navigateByUrl('/member/login');
        },2000);
      },
      error => {
        loading.hide();
        this._toastService.toast(error);
      }
    )
  }

  sendSms(){   
    let phone = this.phone;
    let category = 'REGISTER';

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
