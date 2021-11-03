import { Injectable } from '@angular/core';
import * as jszip from 'JsZip';
import { ProjectService } from '../project-tools/project.service';
import { FileSaverService } from 'ngx-filesaver';
import { Metadata } from '../project-output/metadata.model';
import { RarityCompilerService } from './rarity-compiler.service';

@Injectable({
  providedIn: 'root'
})
export class ZipService {
  jsZip = new jszip();
  projectFolder = this.jsZip.folder(String(this.projectService.projectName.split(" ").join("")));
  constructor(
    private projectService: ProjectService,
    private _FileSaverService: FileSaverService,
    private rarityCompilerService: RarityCompilerService
  ) { }
  

  addFile(generatedItemIndex: number, objectType: string, content: Blob | string): void {
    const individualFolder = this.jsZip.folder(String(generatedItemIndex));
    if (objectType.toLowerCase() === 'svg' || objectType.toLowerCase() === '.svg') {
      individualFolder?.file(String(generatedItemIndex) + '.svg', content);
      this.projectFolder?.file(String(generatedItemIndex) + '.svg', content);
    }
    if (objectType.toLowerCase() === 'png' || objectType.toLowerCase() === '.png') {
      individualFolder?.file(String(generatedItemIndex) + '.png', content);
      this.projectFolder?.file(String(generatedItemIndex) + '.png', content);
    }
    if (objectType.toLowerCase() === 'json' || objectType.toLowerCase() === '.json') {
      individualFolder?.file(String(generatedItemIndex) + '.json', content);
      this.projectFolder?.file(String(generatedItemIndex) + '.json', content);
    }
  }

  zipFile(): void {
    this.addCollectionStatisticsFile().then(afterCollectionStatisticsFileAdded => {
      this.jsZip.generateAsync({type: 'blob'}).then((content) => {
      const name = this.projectService.projectName.split(" ").join("") + `.zip`;
      this.download(content, name);
    });
    });
}

async addCollectionStatisticsFile(): Promise<any> {
  await this.projectFolder?.file('collectionStatistics.json', JSON.stringify(this.rarityCompilerService.collectionStatistics));
}

  
  download(content: Blob, name: string): void {
    this._FileSaverService.save(content, name);
  }
}
