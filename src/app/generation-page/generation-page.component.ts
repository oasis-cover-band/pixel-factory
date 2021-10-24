import { Component, OnInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { ProjectService } from '../project-tools/project.service';
import { GenerationService } from '../tools/generation.service';
import { RenderService } from '../tools/render.service';

@Component({
  selector: 'app-generation-page',
  templateUrl: './generation-page.component.html',
  styleUrls: ['./generation-page.component.scss']
})
export class GenerationPageComponent implements OnInit, AfterContentInit {

  @ViewChild('SVGElement') SVGElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  constructor(
    private projectService: ProjectService,
    private generationService: GenerationService,
    private renderService: RenderService
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    for (let SVGid = 0; SVGid < this.projectService.mintAmount; SVGid++) {
      this.generateSVG(SVGid).then(afterGeneration => {
        setTimeout(() => {
          this.destroySVG(SVGid);
        }, this.projectService.timeToDisplayGeneratedImage * 1000);
      })
    }
  }

  async generateSVG(SVGid: number): Promise<any> {
    await this.generationService.generateSVG(SVGid);
    await this.renderService.renderSVG(SVGid, this.SVGElement);
  }

  async destroySVG(SVGid: number): Promise<any> {

  }

}
