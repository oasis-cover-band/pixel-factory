import { TestBed } from '@angular/core/testing';

import { RarityCompilerService } from './rarity-compiler.service';

describe('RarityCompilerService', () => {
  let service: RarityCompilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RarityCompilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
