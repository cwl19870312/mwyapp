import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  providers: [ConfigService]
})
export class FaqComponent implements OnInit {
  faq;

  constructor(
    private _configService: ConfigService
  ) { }

  ngOnInit() {
    this.getFaq();
  }

  getFaq(){
    let key = 'faq';
    this._configService.getConfigByKey(key).subscribe((data)=>{
      this.faq = data[key].value;
    })
  }


}
