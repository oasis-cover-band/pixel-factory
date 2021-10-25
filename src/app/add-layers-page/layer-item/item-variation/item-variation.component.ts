import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import {
  Variation
} from './variation.model';
import {
  UploaderService
} from 'src/app/tools/uploader.service';
import {
  LayersService
} from 'src/app/project-tools/layers.service';
import {
  BehaviorSubject
} from 'rxjs';

@Component({
  selector: 'app-item-variation',
  templateUrl: './item-variation.component.html',
  styleUrls: ['./item-variation.component.scss']
})
export class ItemVariationComponent implements OnInit, AfterViewInit {

  @Input() data!: Variation;
  @Input() index!: number;
  @Input() layerIndex!: number;
  @ViewChild('nameInputElement') nameInputElement!: ElementRef < any > ;
  @ViewChild('SVGVariationElement') SVGVariationElement!: ElementRef < any > ;
  SVGString!: BehaviorSubject < string | ArrayBuffer | null > ;

  isUploading: boolean = false;
  progress: number = 0;
  infoMessage!: string;
  constructor(
    private layersService: LayersService,
    private uploaderService: UploaderService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.data.type === 'image/svg+xml') {
      this.SVGVariationElement.nativeElement.innerHTML = this.data.thumbnail;
    }
  }

  saveName(): void {
    this.layersService.projectLayers[this.layerIndex].variations[this.index].name = this.nameInputElement.nativeElement.value;
  }

  remove(): void {
    this.layersService.projectLayers[this.layerIndex].variations.splice(this.index, 1);
  }

  async editVariationFile(event: any) {

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
        data: reader.result,
        colors: [

        ],
        rarity: 0
      };
      this.layersService.projectLayers[this.layerIndex].variations[this.index] = uploadedVariation;


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
        rarity: 0
      };
      this.layersService.projectLayers[this.layerIndex].variations[this.index] = uploadedVariation;


      this.uploaderService.upload(file).subscribe((message: any) => {
        this.isUploading = false;
        this.infoMessage = message;
      });
    };
  }

}
