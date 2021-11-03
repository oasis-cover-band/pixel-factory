import {
  Injectable
} from '@angular/core';
import {
  Layer
} from '../add-layers-page/layer-item/layer.model';
import {
  CreatorShare
} from '../project-settings-page/creator-share/creator-share.model';
import { GeneratedItem } from '../project-output/generated-item.model';
import { GeneratedItemLayer } from '../project-output/generated-item-layer.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public projectName: string = 'New Project Name';
  public projectWebsite: string = 'https://yourwebsite.com';
  public creatorShares: CreatorShare[] = [{
    address: 'SOLFLR15asd9d21325bsadythp547912501b',
    share: 100
  }];
  public itemsName: string = 'Individual Item Name';
  public standardItemsDescription: string = 'Items Description';
  public dynamicItemsName: boolean = false;
  public dynamicItemsDescription: boolean = false;
  public dynamicItemsNameString: string[] = [] // dynamically add via settings user chooses
  public dynamicItemsDescriptionString: string[] = [] // dynamically add via settings user chooses
  public nameItemsAsAlienRaces: boolean = true; // dynamic names options
  public nameItemsAsHumanRaces: boolean = true; // dynamic names options
  public nameItemsAsOrcRaces: boolean = true; // dynamic names options
  public nameItemsAsElfRaces: boolean = true; // dynamic names options
  public nameItemsFirstAndLast: boolean = true; // dynamic names options
  public uploadAsPNG: boolean = false; // options
  public uploadAsSVG: boolean = true; // options
  public printAsPNG: boolean = true; // options
  public printAsSVG: boolean = true; // options
  public printAsHTML: boolean = false;
  public includeExternalCSS: boolean = false;
  public externalCSSLink: string = '';
  public sellerFeeBasisPoint: number = 10;
  public mintAmount: number = 10;
  public timeBetweenGenerations: number = 10;
  public collectionName: string = 'New Collection Name';
  public collectionSymbol: string = 'NCS';
  public collectionFamilyName: string = 'Collection Family Name';
  public centralizedServerLocation: string = 'https://yourwebsite.com';
  public storeOnCentralizedServer: boolean = false;
  public projectLayers: Layer[] = [

  ];
  public generatedItems: GeneratedItem[] = [

  ];
  public imageHeight: number = 300;
  public imageWidth: number = 300;
  constructor() {}
}
