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
  public dynamicItemsDescription: boolean = false;
  public dynamicItemsName: boolean = false;
  public nameItemsAsAlienRaces: boolean = true;
  public nameItemsAsHumanRaces: boolean = true;
  public nameItemsAsOrcRaces: boolean = true;
  public nameItemsAsElfRaces: boolean = true;
  public dynamicItemsNameString: string[] = [] // dynamically add via settings user chooses
  public dynamicItemsDescriptionString: string[] = [] // dynamically add via settings user chooses
  public printAsPNG: boolean = true;
  public printAsSVG: boolean = true;
  public printAsHTML: boolean = true;
  public sellerFeeBasisPoint = 10;
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
