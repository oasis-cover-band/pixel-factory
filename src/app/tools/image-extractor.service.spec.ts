import { TestBed } from '@angular/core/testing';

import { ImageExtractorService } from './image-extractor.service';

describe('ImageExtractorService', () => {
  let service: ImageExtractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageExtractorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
