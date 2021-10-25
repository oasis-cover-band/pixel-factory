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
    await this.compileSVGLayers(await compiledLayers, await this.projectService.generatedItems[await SVGid]?.generatedLayers).then(async afterSVGLayersCompiliation => {
      await compiledImage.next(await compiledImage.getValue().concat('</g>'));
      await this.paintSVGToElement(await SVGElement, await compiledImage).then(afterPainting => {

      });
    });
  }

  private async compileSVGLayers(compiledImage: BehaviorSubject<string>, generatedItemsLayers: GeneratedItemLayer[]): Promise<any> {
    await generatedItemsLayers?.forEach(async (generatedItemLayer: GeneratedItemLayer) => {
      await compiledImage.next(await compiledImage.getValue().concat(await '<g color="' + this.color[Math.floor(Math.random() * this.color.length)].value + '">'));
      await compiledImage.next(await compiledImage.getValue().concat(await String(await generatedItemLayer.value)));
      await compiledImage.next(await compiledImage.getValue().concat(await '</g>'));
    });
  }

  private async chooseVariationColor(): Promise<string> {
    return await this.colorService.availableColors[await Math.floor(Math.random() * await this.colorService.availableColors.length) % await this.colorService.availableColors.length ].value
  }

  private async paintSVGToElement(SVGElement: ElementRef,compiledImage: BehaviorSubject<string>) {
    SVGElement.nativeElement.innerHTML = await compiledImage.getValue();
  }
}
