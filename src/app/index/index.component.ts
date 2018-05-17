import { Component, OnInit } from '@angular/core';
import { BankService } from '../service/bank.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private _bankService: BankService
  ) { }

  ngOnInit() {
    this._bankService.getNext();
  }

}
