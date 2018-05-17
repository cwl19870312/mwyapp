import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [ConfigService]
})
export class AboutComponent implements OnInit {
  about;

  constructor(
    private _configService: ConfigService
  ) { }

  ngOnInit() {
    this.getAbout();
  }

  getAbout(){
    let key = 'about';
    this._configService.getConfigByKey(key).subscribe((data)=>{
      this.about = data[key].value;
    })
  }

}
