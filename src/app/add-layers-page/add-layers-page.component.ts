import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Layer } from '../layer-item/layer.model';

@Component({
  selector: 'app-add-layers-page',
  templateUrl: './add-layers-page.component.html',
  styleUrls: ['./add-layers-page.component.scss']
})
export class AddLayersPageComponent implements OnInit {

  constructor(
    private router: Router,
    public projectService: ProjectService
  ) { }

  ngOnInit(): void {
  }

  addLayer(): void {
    const newLayer: Layer = {
      name: 'New Layer ' + this.projectService.projectLayers.length,
      variations: [
        
      ]
    };
    this.projectService.projectLayers.push(newLayer);
  }

  backToProject(): void {
    this.router.navigateByUrl('start-new-project');
  }

}
