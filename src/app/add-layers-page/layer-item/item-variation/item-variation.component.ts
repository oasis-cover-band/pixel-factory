import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Variation } from './variation.model';
import { UploaderService } from 'src/app/tools/uploader.service';
import { LayersService } from 'src/app/project-tools/layers.service';

@Component({
  selector: 'app-item-variation',
  templateUrl: './item-variation.component.html',
  styleUrls: ['./item-variation.component.scss']
})
export class ItemVariationComponent implements OnInit {

  @Input() data!: Variation;
  @Input() index!: number;
  @Input() layerIndex!: number;
  @ViewChild('nameInputElement') nameInputElement!: ElementRef<any>;

  isUploading: boolean = false;
  progress: number = 0;
  infoMessage!: string;
  constructor(
    private layersService: LayersService,
    private uploaderService: UploaderService
  ) { }

  ngOnInit(): void {
  }

  saveName(): void {
    this.layersService.projectLayers[this.layerIndex].variations[this.index].name = this.nameInputElement.nativeElement.value;
  }

  remove(): void {
    this.layersService.projectLayers[this.layerIndex].variations.splice(this.index, 1);
  }

  editFile(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        console.dir(file);
        
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

          ]
        };
        this.layersService.projectLayers[this.layerIndex].variations[this.index] = uploadedVariation;


        this.uploaderService.upload(file).subscribe((message: any) => {
          this.isUploading = false;
          this.infoMessage = message;
        });
      };
    }
}

}
