import {
  Injectable
} from '@angular/core';
import {
  Layer
} from '../add-layers-page/layer-item/layer.model';
import {
  CreatorShare
} from '../project-settings-page/creator-share/creator-share.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public projectName = 'New Project Name';
  public projectWebsite = 'https://yourwebsite.com';
  public creatorShares: CreatorShare[] = [{
    address: 'SOLFLR15asd9d21325bsadythp547912501b',
    share: 100
  }];
  public itemsName = 'Individual Item Name';
  public standardItemsDescription = 'Items Description';
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
  public uploadAsSVG: boolean = false; // options
  public printAsPNG: boolean = true; // options
  public printAsSVG: boolean = true; // options
  public printAsHTML: boolean = true;
  public sellerFeeBasisPoint = 10;
  public mintAmount = 100;
  public collectionName = 'New Collection Name';
  public collectionSymbol = 'NCS';
  public collectionFamilyName = 'Collection Family Name';
  public centralizedServerLocation = 'https://yourwebsite.com';
  public storeOnCentralizedServer: boolean = false;
  public projectLayers: Layer[] = [

  ];
  public generatedItems: any[] = [

  ];
  constructor() {}
}
