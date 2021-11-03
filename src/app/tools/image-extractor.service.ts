import { Injectable, ElementRef } from '@angular/core';
import { ProjectService } from '../project-tools/project.service';
import { GeneratedItem } from '../project-output/generated-item.model';

@Injectable({
  providedIn: 'root'
})
export class ImageExtractorService {


  constructor(
    private projectService: ProjectService
  ) { }

  async extractAndExport(generatedItem: GeneratedItem, SVGElement: ElementRef, PNGCanvasElement: ElementRef): Promise<any> {
    if (this.projectService.printAsPNG && this.projectService.printAsSVG && this.projectService.uploadAsSVG) {
      await this.extractAndExportSVGAndPNGAfterDrawingPNGFromSVG(generatedItem, SVGElement, PNGCanvasElement).then(after => {

      });
      return;
    } else if (this.projectService.printAsPNG && this.projectService.uploadAsPNG) {
      await this.extractAndExportPNG(PNGCanvasElement).then(after => {

      });
      return;
    } else if (this.projectService.printAsSVG && this.projectService.uploadAsSVG) {
      await this.extractAndExportSVG(generatedItem, SVGElement).then(after => {

      });
      return;
    }
  }
  
  async extractAndExportPNG(PNGCanvasElement: ElementRef): Promise<any> {
    // await this.extractSVGBlobs(SVGElement).then(async (elements: {
    //   blobURL: string, 
    //   outerHTML: any,
    //   blobSVG: Blob, 
    //   clonedSVGElement: any
    // }) => {
    //   const img = await new Image();
    //   img.src = await elements.blobURL;
    //   img.onload = this.drawPNG(img, PNGCanvasElement, elements)
    // });
  }

  
  async extractAndExportSVG(generatedItem: GeneratedItem, SVGElement: ElementRef): Promise<any> {
    await this.extractSVGBlobs(SVGElement).then(async (elements: {
      blobURL: string, 
      outerHTML: any,
      blobSVG: Blob, 
      clonedSVGElement: any
    }) => {
      if (this.projectService.printAsPNG === false) {
        generatedItem.image0 = elements.blobSVG;
      } else {
        generatedItem.image1 = elements.blobSVG;
      }
    });
  }
  
  async extractAndExportSVGAndPNGAfterDrawingPNGFromSVG(generatedItem: GeneratedItem, SVGElement: ElementRef, PNGCanvasElement: ElementRef): Promise<any> {
    await this.extractSVGBlobs(SVGElement).then(async (elements: {
      blobURL: string, 
      outerHTML: any,
      blobSVG: Blob, 
      clonedSVGElement: any
    }) => {
      generatedItem.image1 = elements.blobSVG;
      const img = await new Image();
      img.src = await elements.blobURL;
      img.onload = this.drawPNG(generatedItem, img, PNGCanvasElement, elements)
    });
  }

  drawPNG(generatedItem: GeneratedItem, img: HTMLImageElement, PNGCanvasElement: ElementRef, elements: {
    blobURL: string, 
    outerHTML: any,
    blobSVG: Blob, 
    clonedSVGElement: any
  }): any {
    return async () => {
      
        await PNGCanvasElement.nativeElement.getContext('2d').clearRect(0, 0, this.projectService.imageWidth, this.projectService.imageHeight);
        await PNGCanvasElement.nativeElement.getContext('2d').drawImage(img, 0, 0);
        await URL.revokeObjectURL(elements.blobURL);
  
        let blobPNG!: Blob;
        await PNGCanvasElement.nativeElement.toBlob(async (PNGtoBlob: Blob) => {
          blobPNG = await PNGtoBlob;
          generatedItem.image0 = await blobPNG;
        });
        return blobPNG;
      };
  }

  async extractSVGBlobs(SVGElement: ElementRef): Promise<{
    blobURL: string, 
    outerHTML: any,
    blobSVG: Blob, 
    clonedSVGElement: any
  }
    > {
    const clonedSVGElement = await SVGElement.nativeElement.cloneNode(true);
    const outerHTML = await clonedSVGElement.outerHTML;
    const blobSVG: Blob = await new Blob([outerHTML], {type: 'image/svg+xml;charset=utf-8'});
    const blobURL = await URL.createObjectURL(blobSVG);
    return {
      blobURL: blobURL, 
      outerHTML: outerHTML,
      blobSVG: blobSVG,
      clonedSVGElement: clonedSVGElement};
  }

}
