import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Variation } from './variation.model';
import { ProjectService } from 'src/app/project.service';

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

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
  }

  saveName(): void {
    this.projectService.projectLayers[this.layerIndex].variations[this.index].name = this.nameInputElement.nativeElement.value;
  }

  remove(): void {
    this.projectService.projectLayers[this.layerIndex].variations.splice(this.index, 1);
  }

  editFile(event: any) {

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
        const formData = new FormData();

        formData.append("thumbnail", file);

        // const upload$ = this.http.post("/api/thumbnail-upload", formData);

        // upload$.subscribe();
    }
}

}
