/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CityPickerService } from './city-picker.service';

describe('Service: CityPicker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CityPickerService]
    });
  });

  it('should ...', inject([CityPickerService], (service: CityPickerService) => {
    expect(service).toBeTruthy();
  }));
});