import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../component';
import { MemberService } from '../../service/member.service';
import { Router } from '@angular/router';
import { BANK_LIST_URL } from '../../service/url.settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username;
  password

  constructor(
    private _toastService: ToastService,
    private _memberService: MemberService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  auth() {
    let loading = this._toastService.loading();
    this._memberService.loginAuth(this.username,this.password).subscribe(
      (data) => {
        loading.hide();
        this._router.navigateByUrl('/home');
      },(error)=>{
        loading.hide();
        this._toastService.toast(error);
      }
    )
  }

}
