import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { MemberService } from '../service/member.service';
import { ModalService } from '../component';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private _member: MemberService,
        private _router: Router,
        private _modal: ModalService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url = state.url;
        return this.checkAuth(url);
    }

    checkAuth(url?: string): boolean {
        if (this._member.isAuth()) {
            return true;
        } else {
            this._modal.modal({
                title: '登陆',
                text: '您还未登陆，请先登陆',
                buttons: [
                    {
                        text: '注册',
                        callback: () => {
                            this._router.navigateByUrl('/member/register?callbackurl=' + url);
                        }
                    },
                    {
                        text: '登陆',
                        callback: () => {
                            this._router.navigateByUrl('/member/login?callbackurl=' + url);
                        },
                        main: true
                    }
                ]
            })
            return false;
        }
    }
}