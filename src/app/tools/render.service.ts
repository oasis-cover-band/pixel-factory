import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProjectService } from '../project-tools/project.service';
import { Variation } from '../add-layers-page/layer-item/item-variation/variation.model';
import { GeneratedItemLayer } from '../project-output/generated-item-layer.model';

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  constructor(
    private projectService: ProjectService
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
    await this.compileSVGLayers(await compiledImage, await this.projectService.generatedItems[await SVGid]?.generatedLayers).then(async afterSVGLayersCompiliation => {
      await compiledImage.next(await compiledImage.getValue().concat('</g>'));
      await this.paintSVGToElement(await SVGElement, await compiledImage).then(afterPainting => {

      });
    });
  }

  private async compileSVGLayers(compiledImage: BehaviorSubject<string>, generatedItemsLayers: GeneratedItemLayer[]): Promise<any> {
    await generatedItemsLayers?.forEach(async (generatedItemLayer: GeneratedItemLayer) => {
      await compiledImage.next(await compiledImage.getValue().concat(await String(generatedItemLayer.value)));
    });
  }

  private async paintSVGToElement(SVGElement: ElementRef,compiledImage: BehaviorSubject<string>) {
    SVGElement.nativeElement.innerHTML = await compiledImage.getValue();
  }
}
