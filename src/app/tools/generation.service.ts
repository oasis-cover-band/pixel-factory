import { Injectable } from '@angular/core';
import { ProjectService } from '../project-tools/project.service';
import { FileService } from './file.service';
import { Layer } from '../add-layers-page/layer-item/layer.model';
import { GeneratedItemLayer } from '../project-output/generated-item-layer.model';
import { Variation } from '../add-layers-page/layer-item/item-variation/variation.model';
import { Subscription, BehaviorSubject } from 'rxjs';

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
        let generatedItemLayerToAdd: GeneratedItemLayer = await {
          layer: await layerInProject.name,
          variation: await layerInProject.variations[0].name,
          value: await layerInProject.variations[0].data
        };
        // ITERATE THROUGH RARITIES
        let rarityMatch: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
        // TO FIND WHICH VARIATION TO APPLY
        // IN THE LAYER
        this.iterateThroughLayerVariations(layerInProject, generatedItemLayerToAdd, rarityMatch).then(async afterIterating => {
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

    });
  }

  async iterateThroughLayerVariations(layerInProject: Layer, generatedItemLayerToAdd: GeneratedItemLayer, rarityMatch: BehaviorSubject<boolean>): Promise<any> {
    await layerInProject.variations.forEach(async (variation: Variation, index: number) => {
        if (await rarityMatch.getValue() === true) {
          return;
        }
        if (Math.floor((Math.random() * 100)) <= variation.rarity) {
          rarityMatch.next(true);
          generatedItemLayerToAdd.variation = await variation.name;
          generatedItemLayerToAdd.value = await variation.data;
        }
    });
  }
}
