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
      await generatedItem.metadata.forEach(
        async (metadataItem: Metadata) => {
          if (!this.collectionStatistics || this.collectionStatistics === undefined) {
            this.collectionStatistics = await {};
          }

          if (!this.collectionStatistics[metadataItem.layer] || this.collectionStatistics[metadataItem.layer] === undefined) {
            this.collectionStatistics[metadataItem.layer] = await {};
          }

          if (!this.collectionStatistics[metadataItem.layer][metadataItem.variation] || this.collectionStatistics[metadataItem.layer][metadataItem.variation] === undefined) {
            this.collectionStatistics[metadataItem.layer][metadataItem.variation] = await 1;
          } else {
            this.collectionStatistics[metadataItem.layer][metadataItem.variation] = await
            this.collectionStatistics[metadataItem.layer][metadataItem.variation] + 1;
          }
        });
    });
  }
}
