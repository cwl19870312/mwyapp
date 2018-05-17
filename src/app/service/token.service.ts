import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

    private token: string;

    constructor() {
        this.readToken();
     }

    getToken():string{
        return this.token;
    }

    setToken(token: string) {
        this.token = token;
        localStorage.setItem('auth', token);
    }

    removeToken(){
        this.token = null;
        localStorage.removeItem('auth');
    }

    private readToken() {
        let token = localStorage.getItem('auth');
        if (token) {
            this.token = token;
        }
    }

}