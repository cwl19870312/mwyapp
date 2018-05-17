import { Injectable } from "@angular/core";
import { NetService } from "./net.service";
import { CONFIG_URL } from "./url.settings";
import { map } from "rxjs/operators";
import { Config } from "./config.class";
import { of } from "rxjs";


@Injectable()
export class ConfigService{
    config = {};
    constructor(
        private _net: NetService
    ){}

    getConfigByKey(key){
        if (this.config.hasOwnProperty(key) && this.config[key]){
            return of(this.config);
        }
        let url = CONFIG_URL.replace('{key}', key);
        return this._net.doGet(url).pipe(
            map((data)=>{
                this.config[key] = new Config(data.results[0]);
                return this.config; 
            })
        )
    }
}