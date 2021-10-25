import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  Layer
} from './layer-item/layer.model';
import {
  LayersService
} from '../project-tools/layers.service';
import {
  fadeAnimations
} from 'src/animations';
import { ProjectService } from '../project-tools/project.service';

@Component({
  selector: 'app-add-layers-page',
  templateUrl: './add-layers-page.component.html',
  styleUrls: ['./add-layers-page.component.scss'],
  animations: [fadeAnimations]
})
export class AddLayersPageComponent implements OnInit {

  constructor(
    private router: Router,
    public layersService: LayersService,
    public projectService: ProjectService
  ) {}

  ngOnInit(): void {}

  addLayer(): void {
    const newLayer: Layer = {
      name: 'New Layer ' + this.layersService.projectLayers.length,
      variations: [

      ],
      storeForRarity: true
    };
    this.layersService.projectLayers.push(newLayer);
  }

  backToProject(): void {
    this.router.navigateByUrl('start-new-project');
  }

}
