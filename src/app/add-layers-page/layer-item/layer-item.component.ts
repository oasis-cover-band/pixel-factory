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

  uploadVariationFile(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      const reader = new FileReader();
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
  }
}
