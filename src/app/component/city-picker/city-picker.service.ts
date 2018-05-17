import { Injectable, ComponentRef } from '@angular/core';
import { BaseUiService } from '../utils/base-ui.service';
import { CityPickerComponent } from './city-picker.component';

@Injectable()
export class CityPickerService extends BaseUiService {

    showCityPicker(onChose: (city: string) => void, onHide?: () => void): CityPickerComponent {
        let componentRef = this.creatCityPicker();
        componentRef.instance.show();
        componentRef.instance.onChange.subscribe(onChose);
        return componentRef.instance;
    }

    private creatCityPicker(): ComponentRef<CityPickerComponent> {
        let componentRef = this.build(CityPickerComponent);
        componentRef.instance.onHide.subscribe(() => {
            setTimeout(() => {
                componentRef.destroy();
            }, 200)
        });
        return componentRef;
    }

}