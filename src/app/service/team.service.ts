import { Injectable } from "@angular/core";
import { ListService, ListResult } from "./list.service";
import { Member } from "./member.class";
import { Observable } from "rxjs";
import { MEMBER_TEAM_URL } from "./url.settings";
import { URLSearchParams } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable()
export class TeamService extends ListService<Member>{
    target_member;

    protected getNextOb(params: URLSearchParams): Observable<ListResult<Member>> {
        let url = MEMBER_TEAM_URL;

        return this._net.doGet(url, params).pipe(
            map((data)=>{
                let list = [];
                data.results.forEach(item => {
                    list.push(new Member(item));
                });
                return {
                    list: list,
                    next: data.next ? true : false
                }
            })
        );
    }

    setTargetMember(uid: string) {
        this.setQueryParams({ target_member: uid });
    }

}