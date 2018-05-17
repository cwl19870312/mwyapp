import { Observable, Observer, Subscription, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NetService } from './net.service';
import { ToastService } from '../component/toast/toast.service';
import { URLSearchParams } from '@angular/http';

@Injectable()
export abstract class ListService<T> {

    resultSubject: BehaviorSubject<ListResult<T>> = new BehaviorSubject({ next: true, list: [] });

    protected page: number = 1;
    protected next: boolean = true
    protected loading: boolean = false;

    protected list: Array<T> = [];

    protected sub: Subscription;

    protected params: { [key: string]: string } = {};

    constructor(
        protected _net: NetService,
        protected _toast: ToastService
    ) { }

    init() {
        this.page = 1;
        this.list = [];
        this.next = true;
        this.loading = false;
        if (this.sub) this.sub.unsubscribe();
        this.resultSubject.next({ next: true, list: [] });
    }

    getNext() {
        if (this.loading) return;
        if (!this.next) return
        this.getNextData();
    }

    getList(): Array<T> {
        return this.list;
    }

    isNext(): boolean {
        return this.next;
    }

    private getNextData() {
        this.loading = true;
        this.sub = this.getNextOb(this.getSearchParams()).pipe(
            map((data) => {
                this.list = this.list.concat(data.list);
                data.list = this.list;
                return data;
            })
        ).subscribe(
            data => {
                this.next = data.next;
                this.page++;
                this.loading = false;
                this.resultSubject.next(data);
            },
            error => {
                this._toast.toast(error);
                this.loading = false;
            })
    }

    protected getSearchParams(): URLSearchParams {
        let params = new URLSearchParams();
        for (let key in this.params) {
            params.set(key, this.params[key]);
        }
        params.set('page', this.page + '');
        return params;
    }

    protected setParamsByKey(key: string, value: string): boolean {
        if (this.params[key] === value) {
            return false;
        } else {
            this.params[key] = value;
            return true;
        }
    }

    protected setQueryParams(params: any) {
        let isChange = false;
        for (let key in params) {
            if (this.setParamsByKey(key, params[key])) isChange = true;
        }
        if (isChange) this.init();
    }

    protected abstract getNextOb(params: URLSearchParams): Observable<ListResult<T>>

}

export interface ListResult<T> {
    next: boolean;
    list: Array<T>;
    count?: number;
}