import { Component, OnInit } from '@angular/core';
import { TeamService } from '../service/team.service';
import { ToastService } from '../component';
import { Member } from '../service/member.class';
import { MemberService } from '../service/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  providers: [TeamService]
})
export class TeamComponent implements OnInit {
  i: Member;

  target: Member;

  target_children_count: number;

  teamList: Array<Member> = [];

  next: boolean = true;

  backList: Array<Member> = [];

  constructor(
    private _user: MemberService,
    private _team: TeamService,
    private _toast: ToastService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._user.getDetail().subscribe(
      member => {
        this.i = member;
        this.target = member;
      }
    );
    this._team.resultSubject.subscribe(result => {
      this.teamList = result.list;
      this.next = result.next;
    })
  }

  back() {
    let target = this.backList.pop();
    if (target) {
      this.target = target;
    } else {
      history.back();
      return;
    }
    this.teamList = [];
    this._team.setTargetMember(this.target.uid);
    this.target_children_count = 0;
    this.next = true;
    this.getNext();
  }

  setTarget(target?: Member) {
    this.backList.push(this.target);
    this.target = target;
    this.teamList = [];
    this._team.setTargetMember(target.uid);
    this.target_children_count = 0;
    this.next = true;
    this.getNext();
  }

  getNext() {
    if (!this.next) return;
    this._team.getNext();
  }

}
