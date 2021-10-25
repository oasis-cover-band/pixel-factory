import { Component, OnInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { ProjectService } from '../project-tools/project.service';
import { GenerationService } from '../tools/generation.service';
import { RenderService } from '../tools/render.service';
import { Router } from '@angular/router';
import { ProjectNameService } from '../project-tools/project-name.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-generation-page',
  templateUrl: './generation-page.component.html',
  styleUrls: ['./generation-page.component.scss']
})
export class GenerationPageComponent implements OnInit, AfterContentInit {

  @ViewChild('SVGElement') SVGElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  started: boolean = false;
  setup: boolean = false;
  paused: boolean = false // todo;
  finished: boolean = false;
  generating!: number;
  constructor(
    private projectService: ProjectService,
    private generationService: GenerationService,
    private renderService: RenderService,
    private router: Router,
    public projectNameService: ProjectNameService
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  async startGeneration(): Promise<any> {
    if (await this.setup === true) {
      if (await this.started === true) {
        return;
      } else {
        this.started = await true;
      }
  } else {
    this.setup = await true;
  }
    for (let SVGid = 0; SVGid < this.projectService.mintAmount; SVGid++) {
      setTimeout(async () => {
      this.generating = SVGid;
      await this.generateSVG(SVGid).then(afterGeneration => {
        setTimeout(async () => {
          await this.destroySVG(SVGid);
          if (SVGid === this.projectService.mintAmount - 1) {
            this.finished = true;
          }
        }, (this.projectService.timeBetweenGenerations * 1000) - 1000);
      })
    }, (this.projectService.timeBetweenGenerations * 1000) * SVGid);
    }
  }

  async generateSVG(SVGid: number): Promise<any> {
    await this.generationService.generateSVG(await SVGid).then(async (after) => {
      if (this.setup === true) {
        await this.renderService.renderSVG(await SVGid, await this.SVGElement);
      }
    });
  }

  async destroySVG(SVGid: number): Promise<any> {

  }

  backToProject(): void {
    this.router.navigateByUrl('start-new-project');
  }

  async saveCollection(): Promise<any> {

  }

}
