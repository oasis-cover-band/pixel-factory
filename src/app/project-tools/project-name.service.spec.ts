import { TestBed } from '@angular/core/testing';

import { ProjectNameService } from './project-name.service';

describe('ProjectNameService', () => {
  let service: ProjectNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
