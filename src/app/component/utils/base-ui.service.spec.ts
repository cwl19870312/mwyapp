/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseUiService } from './base-ui.service';

describe('Service: BaseUi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseUiService]
    });
  });

  it('should ...', inject([BaseUiService], (service: BaseUiService) => {
    expect(service).toBeTruthy();
  }));
});