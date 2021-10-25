import { Injectable } from '@angular/core';
import { ProjectService } from '../project-tools/project.service';
import { FileService } from './file.service';
import { Layer } from '../add-layers-page/layer-item/layer.model';
import { GeneratedItemLayer } from '../project-output/generated-item-layer.model';
import { Variation } from '../add-layers-page/layer-item/item-variation/variation.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerationService {

  constructor(
    private projectService: ProjectService,
    private fileService: FileService
  ) { }

  defaultSubscription!: Subscription;
  raritySubscription!: Subscription;
  async generateSVG(SVGid: number): Promise<any> {
    if (!this.defaultSubscription?.closed) {
      await this.defaultSubscription?.unsubscribe();
    }
    if (!this.raritySubscription?.closed) {
      await this.raritySubscription?.unsubscribe();
    }
    await this.projectService.projectLayers.forEach(async (layerInProject: Layer) => {
      
        // ASSIGN A DEFAULT LAYER
        // INCASE NONE OF THE PROBABILITIES
        // ARE A "HIT"
        const generatedItemLayerToAdd: GeneratedItemLayer = await {
          layer: await layerInProject.name,
          variation: await layerInProject.variations[0].name,
          value: await layerInProject.variations[0].data
        };
        // ITERATE THROUGH RARITIES
        let rarityMatch = await false;
        // TO FIND WHICH VARIATION TO APPLY
        // IN THE LAYER
        await layerInProject.variations.forEach(async (variation: Variation) => {
          if (rarityMatch === true) {
            return;
          }
          if (Math.random() <= variation.rarity) {
            rarityMatch = await true;
            generatedItemLayerToAdd.variation = await variation.name;
            generatedItemLayerToAdd.value = await variation.data;
          }
        });

        if (await this.projectService.generatedItems[SVGid]) {
          await this.projectService.generatedItems[SVGid]?.generatedLayers?.push(await generatedItemLayerToAdd);
        } else {
          this.projectService.generatedItems[SVGid] = await {
            image0: '',
            image1: '',
            metadata: [],
            generatedLayers: [await generatedItemLayerToAdd]
          };
        }
    });
  }
}
