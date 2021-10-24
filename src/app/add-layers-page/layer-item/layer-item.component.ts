import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  Layer
} from './layer.model';
import {
  Variation
} from './item-variation/variation.model';
import {
  Router
} from '@angular/router';
import {
  UploaderService
} from 'src/app/tools/uploader.service';
import {
  LayersService
} from 'src/app/project-tools/layers.service';

@Component({
  selector: 'app-layer-item',
  templateUrl: './layer-item.component.html',
  styleUrls: ['./layer-item.component.scss']
})
export class LayerItemComponent implements OnInit {

  @Input() data!: Layer;
  @Input() index!: number;
  @ViewChild('nameInputElement') nameInputElement!: ElementRef < any > ;

  isUploading: boolean = false;
  progress: number = 0;
  infoMessage!: string;
  constructor(
    private layersService: LayersService,
    private router: Router,
    private uploaderService: UploaderService
  ) {}

  ngOnInit(): void {}

  saveName(): void {
    this.layersService.projectLayers[this.index].name = this.nameInputElement.nativeElement.value;
  }

  toggleRarity(): void {
    this.layersService.projectLayers[this.index].storeForRarity = !this.layersService.projectLayers[this.index].storeForRarity;
  }

  remove(): void {
    this.layersService.projectLayers.splice(this.index, 1);
  }

  editVariations(): void {
    this.router.navigate(['edit-layer-variations', this.index]);
  }

  shiftUp(): void {
    if (this.index >= this.layersService.projectLayers.length - 1) {
      return;
    } else {
      const temporaryLayer = this.layersService.projectLayers[this.index + 1];
      this.layersService.projectLayers[this.index + 1] = this.data;
      this.layersService.projectLayers[this.index] = temporaryLayer;
    }
  }

  shiftDown(): void {
    if (this.index <= 0) {
      return;
    } else {
      const temporaryLayer = this.layersService.projectLayers[this.index - 1];
      this.layersService.projectLayers[this.index - 1] = this.data;
      this.layersService.projectLayers[this.index] = temporaryLayer;
    }
  }

  async uploadVariationFile(event: any) {

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

  async doPNG(reader: FileReader, file: File): Promise < any > {
    reader.readAsDataURL(file);

    reader.onload = event => {
      const uploadedVariation: Variation = {
        name: file.name,
        file: file,
        size: file.size,
        type: file.type,
        thumbnail: reader.result,
        colors: [

        ],
        rarity: 0
      };
      this.layersService.projectLayers[this.index].variations.push(uploadedVariation);


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
        colors: [

        ],
        rarity: 0
      };
      this.layersService.projectLayers[this.index].variations.push(uploadedVariation);


      this.progress = 0;
      this.isUploading = true;

      this.uploaderService.upload(file).subscribe((message: any) => {
        this.isUploading = false;
        this.infoMessage = message;
      });
    };
  }
}
