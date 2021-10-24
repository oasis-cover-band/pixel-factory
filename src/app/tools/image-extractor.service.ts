import { Injectable, ElementRef } from '@angular/core';
import { ProjectService } from '../project-tools/project.service';

@Injectable({
  providedIn: 'root'
})
export class ImageExtractorService {


  constructor(
    private projectService: ProjectService
  ) { }

  async extractAndExport(SVGElement: ElementRef, PNGCanvasElement: ElementRef): Promise<any> {
    if (this.projectService.printAsPNG && this.projectService.printAsSVG && this.projectService.uploadAsSVG) {
      await this.extractAndExportSVGAndPNGAfterDrawingPNGFromSVG(SVGElement, PNGCanvasElement).then(after => {

      });
      return;
    }
    if (this.projectService.printAsPNG && this.projectService.uploadAsPNG) {
      await this.extractAndExportPNG(PNGCanvasElement).then(after => {

      });
      return;
    }
    if (this.projectService.printAsSVG && this.projectService.uploadAsSVG) {
      await this.extractAndExportSVG(SVGElement).then(after => {

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

  
  async extractAndExportSVG(SVGElement: ElementRef): Promise<any> {
    // await this.extractSVGBlobs(SVGElement).then(async (elements: {
    //   blobURL: string, 
    //   outerHTML: any,
    //   blobSVG: Blob, 
    //   clonedSVGElement: any
    // }) => {

    // });
  }
  
  async extractAndExportSVGAndPNGAfterDrawingPNGFromSVG(SVGElement: ElementRef, PNGCanvasElement: ElementRef): Promise<any> {
    await this.extractSVGBlobs(SVGElement).then(async (elements: {
      blobURL: string, 
      outerHTML: any,
      blobSVG: Blob, 
      clonedSVGElement: any
    }) => {
      const img = await new Image();
      img.src = await elements.blobURL;
      img.onload = this.drawPNG(img, PNGCanvasElement, elements)
    });
  }

  drawPNG(img: HTMLImageElement, PNGCanvasElement: ElementRef, elements: {
    blobURL: string, 
    outerHTML: any,
    blobSVG: Blob, 
    clonedSVGElement: any
  }): any {
    return async () => {
        await PNGCanvasElement.nativeElement.getContext('2d').drawImage(img, 0, 0);
        await URL.revokeObjectURL(elements.blobURL);
  
        let blobPNG!: Blob;
        await PNGCanvasElement.nativeElement.toBlob(async (PNGtoBlob: Blob) => {
          blobPNG = await PNGtoBlob;
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
