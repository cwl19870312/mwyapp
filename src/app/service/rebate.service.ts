import { Injectable } from "@angular/core";
import { NetService } from "./net.service";
import { ToastService } from "../component";
import { ListService, ListResult } from "./list.service";
import { Rebate, RebateCount } from "./rebate.class";
import { Observable, of } from "rxjs";
import { REBATE_LIST_URL, REBATE_COUNT_URL, REBATE_PAY_URL } from "./url.settings";
import { URLSearchParams } from "@angular/http";
import { map } from "rxjs/operators";


@Injectable()
export class RebateService extends ListService<Rebate>{
    rebate_count;
    protected getNextOb(params: URLSearchParams): Observable<ListResult<Rebate>> {
        let url = REBATE_LIST_URL;
        return this._net.doGet(url, params).pipe(
            map((data)=>{
                let list = [];
                data.results.forEach(item => {
                    list.push(new Rebate(item));
                });
                return {
                    list: list,
                    next: data.next ? true : false
                }
            })
        );
    }

    getRebateCount(){
        let url = REBATE_COUNT_URL;
        return this._net.doGet(url).pipe(
            map((data)=>{
                this.rebate_count = new RebateCount(data);
                return this.rebate_count;
            })
        )
    }

    rebatePay(){
        let url = REBATE_PAY_URL;
        return this._net.doPost(url);
    }
}