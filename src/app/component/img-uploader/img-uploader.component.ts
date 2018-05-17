import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { compress } from '../utils/img';
import { CompressOptions } from '../utils/compress-options';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-img-uploader',
  templateUrl: './img-uploader.component.html',
  styleUrls: ['./img-uploader.component.css']
})
export class ImgUploaderComponent implements OnInit {

  @Input() example: string;
  @Input() options: CompressOptions = {
    compress: true
  };

  @Output() onImgLoan: EventEmitter<string> = new EventEmitter<string>();

  _imgData: string;

  constructor(
    private _changeRef: ChangeDetectorRef,
    private _toast: ToastService
  ) { }

  ngOnInit() {
  }

  onFileChange(file) {
    if(!file) return;
    let toast = this._toast.loading();
    compress(file, this.options, fileDate => {
      // console.log(file)
      this._imgData = fileDate;
      this.onImgLoan.emit(fileDate);
      toast.hide();
      // console.log(fileDate);
      this._changeRef.detectChanges();
    },error => {
      console.log(error);
    })
  }

}
