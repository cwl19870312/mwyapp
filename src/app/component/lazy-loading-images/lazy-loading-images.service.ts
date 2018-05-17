import { Injectable } from '@angular/core';
import { LazyLoadingController, LazyLoadingImage, LazyLoadingView } from './lazy-loading-images.class';
@Injectable()
export class LazyLoadingImagesService {

    private controllerList: Array<LazyLoadingController> = [];

    constructor() { }

    setView(key: string, view: HTMLElement) {
        let ctrl = this.findCtrl(key);
        ctrl.setView(new LazyLoadingView(key, view));
    }

    setImage(lazyImg: LazyLoadingImage) {
        let ctrl = this.findCtrl(lazyImg.key);
        if (!lazyImg.checkInView()) ctrl.setImage(lazyImg);
    }

    distory(key) {
        for (let i = 0; i < this.controllerList.length; i++) {
            if (this.controllerList[i].key === key) {
                let ctrl = this.controllerList[i];
                ctrl.destroy();
                this.controllerList.splice(i, 1);
                break;
            }
        }
    }

    check() {
        this.controllerList.forEach(ctrl => {
            ctrl.checkImages();
        })
    }

    private findCtrl(key: string): LazyLoadingController {
        let ctrl: LazyLoadingController;
        for (let i = 0; i < this.controllerList.length; i++) {
            if (this.controllerList[i].key === key) {
                ctrl = this.controllerList[i];
                break;
            }
        }
        if (!ctrl) {
            ctrl = new LazyLoadingController(key);
            this.controllerList.push(ctrl);
        }
        return ctrl;
    }

}