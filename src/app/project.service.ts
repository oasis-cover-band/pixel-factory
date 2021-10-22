import { Injectable } from '@angular/core';
import { Layer } from './layer-item/layer.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public projectName = 'New Project';
  public projectLayers: Layer[] = [

  ];
  constructor() { }
}
