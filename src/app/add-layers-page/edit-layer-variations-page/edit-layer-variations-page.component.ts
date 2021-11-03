import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  Subscription
} from 'rxjs';
import {
  Variation
} from '../layer-item/item-variation/variation.model';
import {
  UploaderService
} from 'src/app/tools/uploader.service';
import {
  LayersService
} from 'src/app/project-tools/layers.service';
import {
  fadeAnimations
} from 'src/animations';

@Component({
  selector: 'app-edit-layer-variations-page',
  templateUrl: './edit-layer-variations-page.component.html',
  styleUrls: ['./edit-layer-variations-page.component.scss'],
  animations: [fadeAnimations]
})
export class EditLayerVariationsPageComponent implements OnInit {

  layerIndex!: number;
  activatedRouteListener!: Subscription;

  isUploading: boolean = false;
  progress: number = 0;
  infoMessage!: string;
  constructor(
    private router: Router,
    public layersService: LayersService,
    private activatedRoute: ActivatedRoute,
    private uploaderService: UploaderService
  ) {}

  ngOnInit(): void {
    this.activatedRouteListener = this.activatedRoute.params.subscribe(params => {
      this.layerIndex = params.layerIndex;
    });
  }

  ngOnDestroy(): void {
    if (this.activatedRouteListener.closed === false) {
      this.activatedRouteListener.unsubscribe();
    }
  }

  backToLayers(): void {
    this.router.navigateByUrl('add-layers');
  }

  backToProject(): void {
    this.router.navigateByUrl('start-new-project');
  }


  async uploadVariationFile(event: any) {
    if (event.target.files.length > 1) {

      for (let fileIndex = 0; fileIndex < event.target.files.length; fileIndex++) {

        const file: File = await event.target.files[fileIndex];

        if (await file) {

          const reader = await new FileReader();
          if (await file.type !== 'image/svg+xml') {
            await this.doPNG(await reader, await file);
          } else if (await file.type === 'image/svg+xml') {
            await this.doSVG(await reader, await file);
          }
        }
      }
    } else {

      const file: File = await event.target.files[0];

      if (await file) {

        const reader = await new FileReader();
        if (await file.type !== 'image/svg+xml') {
          await this.doPNG(await reader, await file);
        } else if (await file.type === 'image/svg+xml') {
          await this.doSVG(await reader, await file);
        }
      }
    }
  }

  async doPNG(reader: FileReader, file: File): Promise < any > {
    reader.readAsDataURL(file);

    reader.onload = event => {
      const uploadedVariation: Variation = {
        name: file.name,
        file: file,
        size: file.size,
        type: file.type,
        thumbnail: reader.result,
        data: reader.result,
        colors: [

        ],
        rarity: 10
      };
      this.layersService.projectLayers[this.layerIndex].variations.push(uploadedVariation);


      this.progress = 0;
      this.isUploading = true;

      this.uploaderService.upload(file).subscribe((message: any) => {
        this.isUploading = false;
        this.infoMessage = message;
      });
    };
  }

  async doSVG(reader: FileReader, file: File): Promise < any > {
    reader.readAsText(file);

    reader.onload = event => {
      const uploadedVariation: Variation = {
        name: file.name,
        file: file,
        size: file.size,
        type: file.type,
        thumbnail: reader.result,
        data: reader.result,
        colors: [

        ],
        rarity: 10
      };
      this.layersService.projectLayers[this.layerIndex].variations.push(uploadedVariation);


      this.progress = 0;
      this.isUploading = true;

      this.uploaderService.upload(file).subscribe((message: any) => {
        this.isUploading = false;
        this.infoMessage = message;
      });
    };
  }

}
