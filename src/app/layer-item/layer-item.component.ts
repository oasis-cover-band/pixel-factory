import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-layer-item',
  templateUrl: './layer-item.component.html',
  styleUrls: ['./layer-item.component.scss']
})
export class LayerItemComponent implements OnInit {

  @Input() data!: any;
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
    this.projectService.projectLayers.slice(this.index, this.index + 1);
  }

}
