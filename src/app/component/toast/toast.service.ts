import { Injectable, ComponentRef } from '@angular/core';
import { BaseUiService } from '../utils';
import { ToastComponent } from './toast.component';
@Injectable()
export class ToastService extends BaseUiService {

    show(type: 'loading' | 'success' | 'error' | 'toast', text?: string, time?: number): ToastComponent {
        let componentRef = this.creatToast();
        componentRef.instance.show(type, text, time);
        return componentRef.instance;
    }

    loading(text?: string, time: number = 0): ToastComponent {
        return this.show('loading', text, time);
    }

    toast(text: string, time: number = 2000): ToastComponent {
        return this.show('toast', text, time);
    }

    private creatToast(): ComponentRef<ToastComponent> {
        let componentRef = this.build(ToastComponent);
        componentRef.instance.onHide.subscribe(() => {
            setTimeout(() => {
                componentRef.destroy();
            }, 300)
        });
        return componentRef;
    }
}