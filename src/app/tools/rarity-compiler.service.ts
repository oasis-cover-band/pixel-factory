import {
  Injectable
} from '@angular/core';
import {
  ProjectService
} from '../project-tools/project.service';
import {
  GeneratedItem
} from '../project-output/generated-item.model';
import {
  Metadata
} from '../project-output/metadata.model';
import { GeneratedItemLayer } from '../project-output/generated-item-layer.model';

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
    await this.projectService.generatedItems.forEach(async (generatedItem: GeneratedItem) => {
      generatedItem.generatedLayers.forEach(
        (generatedLayer: GeneratedItemLayer) => {
          if (!this.collectionStatistics || this.collectionStatistics === undefined) {
            this.collectionStatistics = {};
          }

          if (!this.collectionStatistics[generatedLayer.layer] || this.collectionStatistics[generatedLayer.layer] === undefined) {
            this.collectionStatistics[generatedLayer.layer] = {};
          }

          if (!this.collectionStatistics[generatedLayer.layer][generatedLayer.variation] || this.collectionStatistics[generatedLayer.layer][generatedLayer.variation] === undefined) {
            if (this.collectionStatistics[generatedLayer.layer][generatedLayer.variation] >= 1) {
              this.collectionStatistics[generatedLayer.layer][generatedLayer.variation] = 
              this.collectionStatistics[generatedLayer.layer][generatedLayer.variation] + 1;
            } else {
              this.collectionStatistics[generatedLayer.layer][generatedLayer.variation] = 1;
            }
          } else {
            this.collectionStatistics[generatedLayer.layer][generatedLayer.variation] = 
            this.collectionStatistics[generatedLayer.layer][generatedLayer.variation] + 1;
          }
        });
    });
  }
}
