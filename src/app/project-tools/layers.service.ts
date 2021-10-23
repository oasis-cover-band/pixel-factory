import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { Layer } from '../add-layers-page/layer-item/layer.model';

@Injectable({
  providedIn: 'root'
})
export class LayersService {

  public projectLayers: Layer[] = this.projectService.projectLayers;
  constructor(
    private projectService: ProjectService
  ) { }
}
