import { Injectable, ComponentRef } from '@angular/core';
import { BaseUiService } from '../utils';
import { ModalComponent } from './modal.component';
import { ModalButton, ModalConfig } from './modal.class';

@Injectable()
export class ModalService extends BaseUiService {

    modal(config: ModalConfig) {
        let componentRef = this.creatModal();
        componentRef.instance.modal(config);
        return componentRef.instance;
    }

    alert(title?: string, text?: string, callback?: () => void) {
        let componentRef = this.creatModal();
        componentRef.instance.alert(title, text, callback);
        return componentRef.instance;
    }

    confirm(title?: string, text?: string, ok?: () => void, cancel?: () => void) {
        let componentRef = this.creatModal();
        componentRef.instance.confirm(title, text, ok, cancel);
        return componentRef.instance;
    }

    private creatModal(): ComponentRef<ModalComponent> {
        let componentRef = this.build(ModalComponent);
        componentRef.instance.onHide.subscribe(() => {
            setTimeout(() => {
                componentRef.destroy();
            }, 200)
        });
        return componentRef;
    }

}