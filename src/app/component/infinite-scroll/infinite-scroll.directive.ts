import { Directive, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[infiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit {

  @Input() 
  infiniteScroll: boolean = true;

  @Input() 
  distance: number = 50;

  @Output()
  onLoad: EventEmitter<() => void> = new EventEmitter<() => void>();

  @HostListener('scroll')
  scroll(){
    this.onScroll.emit();
  }

  private onScroll: EventEmitter<void> = new EventEmitter<void>();

  private init: boolean

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.checkDistance();
    },50)
    // this.interval = setInterval(() => this.checkDistance(), 1000)
    this.onScroll.pipe(
      debounceTime(200),
    ).subscribe(()=>{
      this.checkDistance();
    })
  }

  checkDistance() {
    if(!this.infiniteScroll) return;
    let scrollHeight = this.el.nativeElement.scrollHeight;
    let deltaDistance = this.el.nativeElement.scrollTop + this.el.nativeElement.offsetHeight;
    if (!scrollHeight) return;
    if (scrollHeight - deltaDistance <= this.distance) {
        this.onLoad.emit();
    }
  }

}