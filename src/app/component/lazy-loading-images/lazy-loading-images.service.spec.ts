/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LazyLoadingImagesService } from './lazy-loading-images.service';

describe('Service: LazyLoadingImages', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LazyLoadingImagesService]
    });
  });

  it('should ...', inject([LazyLoadingImagesService], (service: LazyLoadingImagesService) => {
    expect(service).toBeTruthy();
  }));
});