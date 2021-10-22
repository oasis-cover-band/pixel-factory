import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ProjectService } from '../project.service';
import { Layer } from './layer.model';
import { Variation } from './item-variation/variation.model';

@Component({
  selector: 'app-layer-item',
  templateUrl: './layer-item.component.html',
  styleUrls: ['./layer-item.component.scss']
})
export class LayerItemComponent implements OnInit {

  @Input() data!: Layer;
  @Input() index!: number;
  @ViewChild('nameInputElement') nameInputElement!: ElementRef<any>;
  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
  }

  saveName(): void {
    this.projectService.projectLayers[this.index].name = this.nameInputElement.nativeElement.value;
  }

  remove(): void {
    this.projectService.projectLayers.splice(this.index, 1);
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

  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        console.dir(file);
        console.dir(
          this.projectService.projectLayers[this.index].variations);
        const uploadedVariation: Variation = {
          name: file.name,
          file: file,
          colors: [

          ]
        };
        this.projectService.projectLayers[this.index].variations.push(uploadedVariation);
        const formData = new FormData();

        formData.append("thumbnail", file);

        // const upload$ = this.http.post("/api/thumbnail-upload", formData);

        // upload$.subscribe();
    }
}
}
