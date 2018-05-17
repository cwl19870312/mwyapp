import { Injectable, EventEmitter } from '@angular/core';
import { NetService } from './net.service';
import { TokenService } from './token.service';
import { MEMBER_LOOKUP_URL, MEMBER_AUTH_URL, MEMBER_PASSWORD_URL, MEMBER_REGISTER_URL, MEMBER_LOGOUT_URL, MEMBER_DETAIL_URL, MEMBER_BANK_URL, MEMBER_INFO_URL, MEMBER_INFO_DETAIL_URL, MEMBER_TEAM_URL } from './url.settings';
import { Observable, of, throwError } from "rxjs";
import { map, tap } from 'rxjs/operators';
import { Auth, MemberRegister, Member, Info } from './member.class';
import { ListService, ListResult } from './list.service';
import { URLSearchParams } from '@angular/http';
import { ToastService } from '../component';

@Injectable()
export class MemberService {
    member;
    infoList;

    onLogout: EventEmitter<any> = new EventEmitter();

    constructor(
        protected _token: TokenService,
        protected _net: NetService,
        protected _toast: ToastService
    ) {
        this._net.onInvalid.subscribe(() => {
            this.toLogout();
        })
    }

    loginAuth(username: string, password: string): Observable<any> {
        if (!username) return throwError('请输入手机号码');
        if (!password) return throwError('请输入密码');
        let data = {
            username: username,
            password: password
        }
        let url = MEMBER_AUTH_URL;
        return this._net.doPost(url, data).pipe(
            map((data) => {
                this._token.setToken(data.token);
                return data;
            })
        )
    }

    register(data: MemberRegister): Observable<any> {
        if (!data.phone) return throwError('请输入手机号码');
        if (!data.password) return throwError('请输入密码');
        if (data.password.length < 6) return throwError('您输入的密码过于简单');
        if (!data.name) return throwError('请输入姓名');

        let url = MEMBER_REGISTER_URL;
        return this._net.doPost(url, data).pipe(
            map((data) => {
                this._token.setToken(data.token);
                return data;
            })
        )
    }

    lookup(uid: string): Observable<any> {
        let url = MEMBER_LOOKUP_URL.replace('{uid}', uid);
        return this._net.doGet(url).pipe(
            map((data) => {
                let member = new Member(data);
                return member;
            })
        );
    }

    resetPassword(data): Observable<any> {
        let url = MEMBER_PASSWORD_URL;
        return this._net.doPost(url, data);
    }

    isAuth(): boolean {
        return this._token.getToken() ? true : false;
    }

    logout(): Observable<any> {
        let url = MEMBER_LOGOUT_URL;
        return this._net.doGet(url).pipe(
            tap(() => {
                this.toLogout();
                this.member = null;
            })
        )
    }

    private toLogout() {
        this._token.removeToken();
        this.onLogout.emit();
    }

    getDetail() {
        if (this.member) {
            return of(this.member);
        }
        else if (this.isAuth()) {
            let url = MEMBER_DETAIL_URL;
            return this._net.doGet(url).pipe(
                map((data) => {
                    this.member = new Member(data);
                    return this.member;
                })
            );
        }
        else {
            return of(null)
        }
    }

    update(data) {
        if (!data.bank) return throwError('请选择提现银行');
        if (!data.bank_account) return throwError('请输入银行卡号');
        if (!data.bank_holder) return throwError('请输入持卡人姓名');
        if (!data.code) return throwError('请输入短信验证码');

        let url = MEMBER_BANK_URL;
        return this._net.doPut(url, data).pipe(
            map((data) => {
                this.member = new Member(data);
                return this.member;
            })
        )
    }

    getInfoList() {
        let url = MEMBER_INFO_URL;
        return this._net.doGet(url).pipe(
            map((data) => {
                this.infoList = [];
                data.results.forEach(element => {
                    let info = new Info(element);
                    this.infoList.push(info);
                });
                return this.infoList;
            })
        )
    }

    getInfoDetailByUid(uid) {
        if (this.infoList) {
            for (let item of this.infoList) {
                if (item.uid == uid) {
                    return of(item);
                }
            }
        }

        let url = MEMBER_INFO_DETAIL_URL.replace('{uid}', uid);
        return this._net.doGet(url).pipe(
            map((data) => {
                let info = new Info(data);
                return info;
            })
        )
    }

    updateInfoByUid(uid, name, phone, cid, is_default=false){
        if (!name) return throwError('请输入姓名');
        if (!phone) return throwError('请输入手机号码');
        if (!cid) return throwError('请输入身份证');
        let url = MEMBER_INFO_DETAIL_URL.replace('{uid}', uid);
        let data = {'name': name, 'phone': phone, 'cid': cid, 'is_default': is_default};
        return this._net.doPut(url, data).pipe(
            map((data)=>{
                let info = new Info(data);
                return info;
            })
        )
    }

    createInfo(name, phone, cid, is_default=false){
        if (!name) return throwError('请输入姓名');
        if (!phone) return throwError('请输入手机号码');
        if (!cid) return throwError('请输入身份证');
        let url = MEMBER_INFO_URL;
        let data = {'name': name, 'phone': phone, 'cid': cid, 'is_default': is_default};
        return this._net.doPost(url, data).pipe(
            map((data)=>{
                let info = new Info(data);
                return info;
            })
        )
    }
}