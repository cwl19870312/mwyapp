import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { TokenService } from './token.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class NetService {

    onInvalid: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        protected _http: Http,
        protected _token: TokenService
    ) { }

    protected extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    protected handleError = (error: any) => {
        if (error.status == 0) {
            return throwError("网络似乎不太稳定，请稍再试下吧");
        }
        if (error.status >= 500) {
            return throwError(`服务器开小差了~(code:${error.status})`);
        }
        if (error.status == 404) {
            return throwError("没有您要找的信息");
        }
        if (error.status == 403 || error.status == 401) {
            this.onInvalid.emit();
        }
        let errors = error.json();
        let errorMsg = "";
        for (let e in errors) {
            errorMsg += errors[e] + "  ";
        }
        return throwError(errorMsg);
    }

    doGet(url: string, search?: URLSearchParams): Observable<any> {
        let options = this.getOptions(search);
        return this._http.get(url, options).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    doPost(url: string, body = null, search?: URLSearchParams): Observable<any> {
        if (body) body = JSON.stringify(body);
        let options = this.getOptions(search);
        return this._http.post(url, body, options).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    doPut(url: string, body = null, search?: URLSearchParams): Observable<any> {
        if (body) body = JSON.stringify(body);
        let options = this.getOptions(search);
        return this._http.put(url, body, options).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    protected getOptions(search?: URLSearchParams): RequestOptions {
        let token = this._token.getToken();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        if (token) headers.set('Authorization', 'Token ' + token);
        let options = new RequestOptions({ headers: headers, search: search, withCredentials: true });
        return options;
    }

}