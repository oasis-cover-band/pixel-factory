import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProjectService } from '../project-tools/project.service';
import { Variation } from '../add-layers-page/layer-item/item-variation/variation.model';
import { GeneratedItemLayer } from '../project-output/generated-item-layer.model';
import { ColorService } from './color.service';

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  color = this.colorService.availableColors;

  constructor(
    private projectService: ProjectService,
    private colorService: ColorService
  ) { }

  public async renderSVG(SVGid: number, SVGElement: ElementRef): Promise<any> {
    if (this.projectService.includeExternalCSS === true) {
      const compiledImage: BehaviorSubject<string> = await new BehaviorSubject(`
        <link xmlns="http://www.w3.org/1999/xhtml" rel="stylesheet" href="` + this.projectService.externalCSSLink+`" type="text/css"/>
        `);
        await this.compileSVGImage(await compiledImage, await SVGid, await SVGElement).then(after => {

        });
    } else {
      const compiledImage = await new BehaviorSubject(``);
      await this.compileSVGImage(await compiledImage, await SVGid, await SVGElement).then(after => {

      });
    }
  }

  private async compileSVGImage(compiledImage: BehaviorSubject<string>, SVGid: number, SVGElement: ElementRef): Promise<any> {
    await compiledImage.next(await compiledImage.getValue().concat('<g id="' + await SVGid +  '">'));
    let compiledLayers: BehaviorSubject<string>[] = await [];
    console.dir(this.projectService.generatedItems[await SVGid]?.generatedLayers.length);
    await this.compileSVGLayers(await compiledLayers, await this.projectService.generatedItems[await SVGid]?.generatedLayers).then(async afterSVGLayersCompiliation => {
      await this.addSVGLayersToImage(await compiledLayers, await compiledImage).then(async afterLayersAddedToImage => {
        await compiledImage.next(await compiledImage.getValue().concat('</g>'));
        await this.paintSVGToElement(await SVGElement, await compiledImage).then(afterPainting => {
  
        });
      });
    });
  }

  private async addSVGLayersToImage(compiledLayers: BehaviorSubject<string>[], compiledImage: BehaviorSubject<string>): Promise < any > {
    console.dir(compiledLayers.length);
    await compiledLayers?.forEach((compiledLayer: BehaviorSubject<string>) => {
      console.dir(compiledLayers.length);
      compiledImage.next(compiledImage.getValue().concat(compiledLayer.getValue()));
    });
  }

  private async compileSVGLayers(compiledLayers: BehaviorSubject<string>[], generatedItemsLayers: GeneratedItemLayer[]): Promise<any> {
    await generatedItemsLayers?.forEach((generatedItemLayer: GeneratedItemLayer) => {
      const compiledLayer = new BehaviorSubject(``);
      compiledLayer.next(compiledLayer.getValue().concat('<g color="' + this.color[Math.floor(Math.random() * this.color.length)].value + '">'));
      compiledLayer.next(compiledLayer.getValue().concat(String(generatedItemLayer.value)));
      compiledLayer.next(compiledLayer.getValue().concat('</g>'));
      compiledLayers.push(compiledLayer);
      console.dir(compiledLayers.length);
    });
  }

  private async paintSVGToElement(SVGElement: ElementRef,compiledImage: BehaviorSubject<string>) {
    SVGElement.nativeElement.innerHTML = await compiledImage.getValue();
  }
}
