import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectNameService {

  public projectName = this.projectService.projectName;
  constructor(
    private projectService: ProjectService
  ) { }
}
