import {
  Injectable
} from '@angular/core';
import {
  ProjectService
} from '../project-tools/project.service';
import {
  GeneratedItem
} from '../project-output/generated-item.model';

@Injectable({
  providedIn: 'root'
})
export class RarityCompilerService {

  public collectionStatistics: any = {

  };
  // THIS TOOL IS CALLED WHEN THE COLLECTION IS FINISHED GENERATING
  // THE IMAGES, OR AFTER IT IS DONE RANDOMIZING THE ATTRIBUTES FOR THE COLLECTION
  // IT SHOULD ONLY BE CALLED ONCE
  // TO CALCULATE ALL THE METADATA RARITY NUMBERS, IT THEN SPITS IT OUT
  // TO THE METADATA TOOL TO COMPLETE THE METADATA FOR THE COLLECTION
  constructor(
    private projectService: ProjectService
  ) {}

  async setCollectionCount(): Promise < any > {
    await this.projectService.generatedItems.forEach(async (generatedItem: GeneratedItem, index: number) => {
      // generatedItem.metadata

      // tslint:disable-next-line:forin
      // for (const key in generatedItem.metadata) {
      // if (!this.collectionStatistics) {
      // this.collectionStatistics = {};
      // if (this.collectionStatistics[key] === undefined) {
      // this.collectionStatistics[key] = 1;
      // } else {
      // this.collectionStatistics[key] =
      // this.collectionStatistics[key] + 1;
      // }
      // } else {
      // if (this.collectionStatistics[key] === undefined) {
      // this.collectionStatistics[key] = 1;
      // } else {
      // this.collectionStatistics[key] =
      // this.collectionStatistics[key] + 1;
      // }
      // }
      // }
      Object.keys(generatedItem.metadata).forEach(
        (key: keyof any) => {
          if (!this.collectionStatistics) {
            this.collectionStatistics = {};
            if (this.collectionStatistics[key] === undefined) {
              this.collectionStatistics[key] = 1;
            } else {
              this.collectionStatistics[key] =
                this.collectionStatistics[key] + 1;
            }
          } else {
            if (this.collectionStatistics[key] === undefined) {
              this.collectionStatistics[key] = 1;
            } else {
              this.collectionStatistics[key] =
                this.collectionStatistics[key] + 1;
            }
          }
        });
    });
  }
}
