import { Injectable } from '@angular/core';
import { Layer } from './add-layers-page/layer-item/layer.model';
import { CreatorShare } from './project-settings-page/creator-share/creator-share.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public projectName = 'New Project Name';
  public creatorShares: CreatorShare[] = [
    {
      address: 'SOLFLR15asd9d21325bsadythp547912501b',
      share: 100
    }
  ];
  public nameItemsByNumber: boolean = true;
  public centralizedServer: boolean = true;
  public printAsPNG: boolean = true;
  public printAsSVG: boolean = true;
  public printAsHTML: boolean = true;
  public sellerFeeBasisPoint = 10;
  public itemsName = 'New Item Name';
  public collectionName = 'New Collection Name';
  public collectionSymbol = 'NCS';
  public collectionFamilyName = 'Collection Family Name';
  public centralizedServerLocation = 'https://yourwebsite.com';
  public projectLayers: Layer[] = [

  ];
  constructor() { }
}
