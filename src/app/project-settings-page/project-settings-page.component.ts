import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  ProjectService
} from '../project-tools/project.service';
import {
  CreatorShare
} from './creator-share/creator-share.model';

@Component({
  selector: 'app-project-settings-page',
  templateUrl: './project-settings-page.component.html',
  styleUrls: ['./project-settings-page.component.scss']
})
export class ProjectSettingsPageComponent implements OnInit {

  @ViewChild('itemsNameInputElement') itemsNameInputElement!: ElementRef < any > ;
  @ViewChild('projectNameInputElement') projectNameInputElement!: ElementRef < any > ;
  @ViewChild('collectionSymbolInputElement') collectionSymbolInputElement!: ElementRef < any > ;
  @ViewChild('projectWebsiteInputElement') projectWebsiteInputElement!: ElementRef < any > ;
  @ViewChild('collectionNameInputElement') collectionNameInputElement!: ElementRef < any > ;
  @ViewChild('collectionFamilyNameInputElement') collectionFamilyNameInputElement!: ElementRef < any > ;
  @ViewChild('sellerFeeBasisPointInputElement') sellerFeeBasisPointInputElement!: ElementRef < any > ;

  constructor(
    private router: Router,
    public projectService: ProjectService
  ) {}

  ngOnInit(): void {}

  saveItemsName(): void {
    this.projectService.itemsName = this.itemsNameInputElement.nativeElement.value;
  }

  saveProjectName(): void {
    this.projectService.projectName = this.projectNameInputElement.nativeElement.value;
  }

  saveCollectionName(): void {
    this.projectService.collectionName = this.collectionNameInputElement.nativeElement.value;
  }

  saveCollectionFamilyName(): void {
    this.projectService.collectionFamilyName = this.collectionFamilyNameInputElement.nativeElement.value;
  }

  saveCollectionSymbol(): void {
    this.projectService.collectionSymbol = this.collectionSymbolInputElement.nativeElement.value;
  }

  saveProjectWebsite(): void {
    if (this.projectService.centralizedServerLocation === this.projectService.projectWebsite) {
      this.projectService.centralizedServerLocation = this.projectWebsiteInputElement.nativeElement.value;
      this.projectService.projectWebsite = this.projectWebsiteInputElement.nativeElement.value;
    } else {
      this.projectService.projectWebsite = this.projectWebsiteInputElement.nativeElement.value;
    }
  }

  saveSellerFeeBasisPoint(): void {
    this.projectService.sellerFeeBasisPoint = this.sellerFeeBasisPointInputElement.nativeElement.value;
  }

  addCreatorShare(): void {
    const addedCreatorShare: CreatorShare = {
      address: this.projectService.creatorShares[0].address,
      share: 0
    };
    this.projectService.creatorShares.push(addedCreatorShare);
  }

  backToProject(): void {
    this.router.navigateByUrl('start-new-project');
  }

}
