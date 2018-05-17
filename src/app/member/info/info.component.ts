import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../service/member.service';
import { ToastService } from '../../component';
import { Info } from '../../service/member.class';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  infoList = [];

  constructor(
    private _memberSerivce: MemberService,
    private _toastService: ToastService,
  ) { }

  ngOnInit() {
    this.getInfoList();
  }

  getInfoList(){
    let loading = this._toastService.loading()
    this._memberSerivce.getInfoList().subscribe((data)=>{
      loading.hide();
      this.infoList = data;
    }, (error)=>{
      loading.hide();
      this._toastService.toast(error);
    })
  }

}
