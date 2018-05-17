import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { NetService } from './net.service';
import { ListService, ListResult } from './list.service';
import { Bank } from './bank.class';
import { BANK_LIST_URL, BANK_DETAIL_URL } from './url.settings';
import { URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';


@Injectable()
export class BankService extends ListService<Bank> {
    protected getNextOb(params: URLSearchParams): Observable<ListResult<Bank>> {
        let url = BANK_LIST_URL;

        return this._net.doGet(url, params).pipe(
            map((data)=>{
                let list = [];
                data.results.forEach(item => {
                    list.push(new Bank(item));
                });
                return {
                    list: list,
                    next: data.next ? true : false
                }
            })
        );
    }
    getBankByUid(uid) {
        for (let item of this.list) {
            if (item.uid == uid) {
                return of(item);
            }
        }
        let url = BANK_DETAIL_URL.replace('{uid}', uid);
        return this._net.doGet(url).pipe(
            map((data) => {
                let bank = new Bank(data);
                return bank;
            })
        )

    }
}

