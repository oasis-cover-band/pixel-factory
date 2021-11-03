import { Component, OnInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { ProjectService } from '../project-tools/project.service';
import { GenerationService } from '../tools/generation.service';
import { RenderService } from '../tools/render.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ImageExtractorService } from '../tools/image-extractor.service';
import { RarityCompilerService } from '../tools/rarity-compiler.service';
import { MetadataService } from '../tools/metadata.service';
import { ZipService } from '../tools/zip.service';
import { GeneratedItem } from '../project-output/generated-item.model';

@Component({
  selector: 'app-generation-page',
  templateUrl: './generation-page.component.html',
  styleUrls: ['./generation-page.component.scss']
})
export class GenerationPageComponent implements OnInit, AfterContentInit {

  @ViewChild('SVGElement') SVGElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  setup: boolean = false; // generation finished
  paused: boolean = false // todo;
  started: boolean = false; // rendering start
  finished: boolean = false; // rendering end
  raritiesCalculated: boolean = false; // calculation end
  metadataGenerated: boolean = false; // metadata end
  projectSaved: boolean = false;
  generating!: number;
  constructor(
    public projectService: ProjectService,
    private generationService: GenerationService,
    private renderService: RenderService,
    private imageExtractorService: ImageExtractorService,
    private rarityCompilerService: RarityCompilerService,
    private metadataService: MetadataService,
    private zipService: ZipService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async ngAfterContentInit(): Promise<any> {
    for (let SVGid = 0; SVGid < this.projectService.mintAmount; SVGid++) {
      setTimeout(async () => {
      await this.generateSVG(SVGid).then(afterGeneration => {
        if (SVGid === this.projectService.mintAmount - 1) {
          this.setup = true;
        }
      })
    }, (this.projectService.timeBetweenGenerations * 100));
    }
  }

  async startGeneration(): Promise<any> {
    if (await this.started === true) {
      return;
    } else {
      this.started = await true;
    }
    for (let SVGid = 0; SVGid < this.projectService.mintAmount; SVGid++) {
        setTimeout(async () => {
          this.generating = SVGid;
          if (this.projectService.uploadAsSVG === true) {
            await this.renderSVG(SVGid).then(afterGeneration => {
              this.imageExtractorService.extractAndExport(this.projectService.generatedItems[SVGid], this.SVGElement, this.canvasElement).then(afterExtractingAndExportingSVG => {
                if (SVGid === this.projectService.mintAmount - 1) {
                  this.finished = true;
                }
              })
            })
          }
        }, (this.projectService.timeBetweenGenerations * 1000) * SVGid);
    }
  }

  async generateSVG(SVGid: number): Promise<any> {
    await this.generationService.generateSVG(await SVGid).then(async (after) => {
    });
  }

  async renderSVG(SVGid: number): Promise<any> {
    await this.renderService.renderSVG(await SVGid, await this.SVGElement).then(async (after) => {
    });
  }

  async destroySVG(SVGid: number): Promise<any> {

  }

  async calculateRarities(): Promise<any> {
    await this.rarityCompilerService.setCollectionCount().then(afterCollectionIsCounted => {
      this.raritiesCalculated = true;
    });
  }

  async generateMetadata(): Promise<any> {
    for (let SVGid = 0; SVGid < this.projectService.mintAmount; SVGid++) {
        setTimeout(async () => {
          this.generating = SVGid;
          await this.metadataService.generateMetadata(SVGid).then(afterGeneration => {
            if (SVGid === this.projectService.mintAmount - 1) {
              this.metadataGenerated = true;
            }
          })
        }, (this.projectService.timeBetweenGenerations * 100) * SVGid);
    }
  }

  async saveCollection(): Promise<any> {
    this.projectService.generatedItems.forEach((generatedItem: GeneratedItem, generatedItemIndex: number) => {
      this.addFiles(generatedItem, generatedItemIndex).then(afterAddingFiles => {
        if (generatedItemIndex === this.projectService.mintAmount - 1) {
          this.zipFile();
        }
      });
    });
  }
  async addFiles(generatedItem: GeneratedItem, generatedItemIndex: number): Promise<any> {
    if (this.projectService.printAsPNG === true) {
      this.zipService.addFile(generatedItemIndex, 'png', generatedItem.image0);
      this.zipService.addFile(generatedItemIndex, 'svg', generatedItem.image1);
      this.zipService.addFile(generatedItemIndex, 'json', generatedItem.json);

    } else if (this.projectService.printAsSVG === true) {
      this.zipService.addFile(generatedItemIndex, 'svg', generatedItem.image0);
      this.zipService.addFile(generatedItemIndex, 'json', generatedItem.json);
    }
  }
  async zipFile(): Promise<any> {
    this.zipService.zipFile();
  }

  backToProject(): void {
    this.router.navigateByUrl('start-new-project');
  }

}
