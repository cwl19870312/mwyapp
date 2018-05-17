import { Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';
export class LazyLoadingController {

    readonly key: string;
    private view: LazyLoadingView;
    private images: Array<LazyLoadingImage> = [];

    constructor(key: string) {
        this.key = key;
        // console.log('创建');
    }

    setView(view: LazyLoadingView) {
        this.view = view;
        this.view.bindEvent();
        this.view.onScroll().subscribe(
            () => {
                this.checkImages();
            }
        );
        this.view.onStopScroll().subscribe(
            () => {
                this.checkImages();
            }
        );
    }

    setImage(image: LazyLoadingImage) {
        this.images.push(image);
    }

    checkImages() {
        for (let i = 0; i < this.images.length; i++) {
            let image = this.images[i];
            if (image.checkInView()) {
                this.images.splice(i, 1);
                i--;
            }
        }
        // this.images.forEach((image, index) => {
        //     if (image.checkInView()) this.images.splice(index, 1);
        // })
    }

    destroy() {
        this.view.removeEvent();
        this.view = null;
        // this.images = null;
    }

}

export class LazyLoadingView {

    readonly key: string;
    private view: HTMLElement;
    private onscroll: EventEmitter<void> = new EventEmitter<void>();

    constructor(key: string, view: HTMLElement) {
        this.key = key;
        this.view = view;
    }

    emitEvent = () => {
        this.onscroll.emit();
    }

    onScroll(): Observable<void> {
        return this.onscroll.pipe(
            throttleTime(100)
        );
    }

    onStopScroll(): Observable<void> {
        return this.onscroll.pipe(
            debounceTime(20)
        );
    }

    bindEvent() {
        this.view.addEventListener('scroll', this.emitEvent);
    }

    removeEvent() {
        this.view.removeEventListener('scroll', this.emitEvent);
    }
}

export class LazyLoadingImage {

    readonly key: string;
    private view: HTMLImageElement;
    private src: string;
    private defaultSrc: string;

    constructor(key: string, src: string, view: HTMLImageElement, defaultSrc?: string) {
        this.key = key;
        this.view = view;
        this.src = src;
        this.defaultSrc = defaultSrc;
        if (this.defaultSrc) this.loadImg(defaultSrc);
    }

    checkInView(): boolean {
        let clientHeight = document.documentElement.clientHeight;
        let clientWidth = document.documentElement.clientWidth;
        let imgClientTop = this.view.getBoundingClientRect().top;
        let imgClientBottom = this.view.getBoundingClientRect().bottom;
        let imgClientRight = this.view.getBoundingClientRect().right;
        let imgClientLift = this.view.getBoundingClientRect().left;
        if (imgClientBottom > 0 && imgClientTop < clientHeight && imgClientRight > 0 && imgClientLift < clientWidth) {
            this.loadImg(this.src);
            return true;
        } else {
            return false;
        }
    }

    private loadImg(src) {
        if (this.view.tagName === 'IMG') {
            this.view.src = src;
        } else {
            this.view.style.backgroundImage = src;
            this.view.style.backgroundSize = "100% 100%";
        }
    }

}
