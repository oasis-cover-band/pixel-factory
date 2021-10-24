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
        await this.compileSVGImage(compiledImage, SVGid, SVGElement).then(after => {

        });
    } else {
      const compiledImage = await new BehaviorSubject(``);
      await this.compileSVGImage(compiledImage, SVGid, SVGElement).then(after => {

      });
    }
  }

  private async compileSVGImage(compiledImage: BehaviorSubject<string>, SVGid: number, SVGElement: ElementRef): Promise<any> {
    await compiledImage.next(compiledImage.getValue().concat('<g id="' + SVGid +  '">'));
    await this.compileSVGLayers(compiledImage, this.projectService.generatedItems[SVGid].generatedLayers).then(async afterSVGLayersCompiliation => {
      await compiledImage.next(compiledImage.getValue().concat('</g>'));
      await this.paintSVGToElement(SVGElement, compiledImage).then(afterPainting => {

      });
    });
  }

  private async compileSVGLayers(compiledImage: BehaviorSubject<string>, generatedItemsLayers: GeneratedItemLayer[]): Promise<any> {
    await generatedItemsLayers.forEach(async (generatedItemLayer: GeneratedItemLayer) => {
      await compiledImage.next(compiledImage.getValue().concat(generatedItemLayer.value));
    });
  }

  private async paintSVGToElement(SVGElement: ElementRef,compiledImage: BehaviorSubject<string>) {
    SVGElement.nativeElement.innerHTML = await compiledImage.getValue();
  }
}
