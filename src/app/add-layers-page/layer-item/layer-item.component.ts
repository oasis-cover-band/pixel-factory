import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ProjectService } from '../../project.service';
import { Layer } from './layer.model';
import { Variation } from './item-variation/variation.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layer-item',
  templateUrl: './layer-item.component.html',
  styleUrls: ['./layer-item.component.scss']
})
export class LayerItemComponent implements OnInit {

  @Input() data!: Layer;
  @Input() index!: number;
  @ViewChild('nameInputElement') nameInputElement!: ElementRef<any>;

  isUploading: boolean = false;
  progress: number = 0;
  infoMessage!: string;
  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  saveName(): void {
    this.projectService.projectLayers[this.index].name = this.nameInputElement.nativeElement.value;
  }

  remove(): void {
    this.projectService.projectLayers.splice(this.index, 1);
  }

  editVariations(): void {
    this.router.navigate(['edit-layer-variations', this.index]);
  }

  shiftUp(): void {
    if (this.index >= this.projectService.projectLayers.length - 1) {
      return;
    } else {
      const temporaryLayer = this.projectService.projectLayers[this.index + 1];
      this.projectService.projectLayers[this.index + 1] = this.data;
      this.projectService.projectLayers[this.index] = temporaryLayer;
    }
  }

  shiftDown(): void {
    if (this.index <= 0) {
      return;
    } else {
      const temporaryLayer = this.projectService.projectLayers[this.index - 1];
      this.projectService.projectLayers[this.index - 1] = this.data;
      this.projectService.projectLayers[this.index] = temporaryLayer;
    }
  }

  uploadFile(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        console.dir(file);
        console.dir(
          this.projectService.projectLayers[this.index].variations);
        const uploadedVariation: Variation = {
          name: file.name,
          file: file,
          size: file.size,
          type: file.type,
          colors: [

          ]
        };
        this.projectService.projectLayers[this.index].variations.push(uploadedVariation);
        
        
        this.progress = 0;
        this.isUploading = true;

        this.uploader.upload(file).subscribe((message: any) => {
          this.isUploading = false;
          this.infoMessage = message;
        });
    }
}
}
