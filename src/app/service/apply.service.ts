import { Injectable } from "@angular/core";
import { ListService, ListResult } from "./list.service";
import { Apply } from "./apply.class";
import { Observable, throwError } from "rxjs";
import { APPLY_LIST_URL, APPLY_CREATE_URL } from "./url.settings";
import { URLSearchParams } from "@angular/http";
import { map } from "rxjs/operators";


@Injectable()
export class ApplyService extends ListService<Apply>{

    protected getNextOb(params: URLSearchParams): Observable<ListResult<Apply>> {
        let url = APPLY_LIST_URL;
        return this._net.doGet(url, params).pipe(
            map((data)=>{
                let list = [];
                data.results.forEach(item => {
                    list.push(new Apply(item));
                });
                return {
                    list: list,
                    next: data.next ? true : false
                }
            })
        );
    }

    setParams(myself){
        this.setQueryParams({myself: myself});
    }

    createApply(uid, name, phone, cid){
        if (!uid) return throwError('请选择您要申请的信用卡');
        if (!name) return throwError('请选择您的姓名');
        if (!phone) return throwError('请选择您的手机');
        if (!cid) return throwError('请选择您的身份证');

        let url = APPLY_CREATE_URL.replace('{uid}', uid);
        let data = {'name': name, 'phone': name, 'cid': cid};
        return this._net.doPost(url, data);
    }
}


