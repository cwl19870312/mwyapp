import { Injectable } from "@angular/core";
import { NetService } from "./net.service";
import { SEND_SMS_URL } from "./url.settings";
import { map, tap } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable()
export class SmsService{
    interval = 60;
    send = false;
    reg = /^1\d{10}$/;

    constructor(private _net: NetService){}
    
    sendCode(phone, category){
        console.log(phone);
        if (!this.reg.test(phone)) return throwError('请输入正确的手机号码');

        if(!this.send){
            let url = SEND_SMS_URL;
            let data = {'phone': phone, 'category': category}
            return this._net.doPost(url, data).pipe(
                tap(()=>{
                    this.send = true;
                    setTimeout(()=>{
                        this.send = false;
                    }, this.interval*1000)
                })
            )
        }
        else{
            return throwError('短信已发出，请耐心等待');
        }
    }
}