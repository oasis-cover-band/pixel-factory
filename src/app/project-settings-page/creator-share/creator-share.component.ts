import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild
} from '@angular/core';
import {
  CreatorShare
} from './creator-share.model';
import {
  ProjectService
} from '../../project-tools/project.service';

@Component({
  selector: 'app-creator-share',
  templateUrl: './creator-share.component.html',
  styleUrls: ['./creator-share.component.scss']
})
export class CreatorShareComponent implements OnInit {

  @Input() data!: CreatorShare;
  @Input() index!: number;
  @ViewChild('sharePercentageInputElement') sharePercentageInputElement!: ElementRef < any > ;
  @ViewChild('addressInputElement') addressInputElement!: ElementRef < any > ;
  constructor(
    public projectService: ProjectService
  ) {}

  ngOnInit(): void {}

  saveAddress(): void {
    if (this.addressInputElement.nativeElement.value.length !== 36) {
      this.addressInputElement.nativeElement.value = this.projectService.creatorShares[this.index].address;
      return;
    } else {
      this.projectService.creatorShares[this.index].address = this.addressInputElement.nativeElement.value;
    }
  }

  saveShare(): void {
    if (isNaN(this.sharePercentageInputElement.nativeElement.value) ||
      this.sharePercentageInputElement.nativeElement.value < 0 ||
      this.sharePercentageInputElement.nativeElement.value > 100) {
      this.sharePercentageInputElement.nativeElement.value = this.projectService.creatorShares[this.index].share;
      return;
    } else {
      if (this.projectService.creatorShares[this.index].share! !== this.sharePercentageInputElement.nativeElement.value) {
        if (this.projectService.creatorShares[this.index].share! < this.sharePercentageInputElement.nativeElement.value) {
          this.removeSharesFromOtherCreators(Number(this.sharePercentageInputElement.nativeElement.value) - Number(this.projectService.creatorShares[this.index].share!));
        } else {
          this.addSharesToOtherCreators(Number(this.projectService.creatorShares[this.index].share!) - Number(this.sharePercentageInputElement.nativeElement.value));
        }
      }
      this.projectService.creatorShares[this.index].share = this.sharePercentageInputElement.nativeElement.value;
    }
  }

  removeSharesFromOtherCreators(amountToRemove: number): void {
    console.dir('amountToRemove');
    console.dir(amountToRemove);
    this.projectService.creatorShares.forEach((creatorShare: CreatorShare, index: number) => {
      if (creatorShare.share! >= amountToRemove) {
        this.projectService.creatorShares[index].share = Number(creatorShare.share!) - Number(amountToRemove);
        amountToRemove = 0;
      } else {
        amountToRemove = Number(amountToRemove) - Number(creatorShare.share!);
        this.projectService.creatorShares[index].share = 0;
      }
    });
  }

  remove(): void {
    if (this.projectService.creatorShares[this.index].share! > 0) {
      this.addSharesToOtherCreators(this.sharePercentageInputElement.nativeElement.value).then(after => {
        this.projectService.creatorShares.splice(this.index, 1);
      })
    } else {
      this.projectService.creatorShares.splice(this.index, 1);
    }
  }

  async addSharesToOtherCreators(amountToAdd: number): Promise < any > {
    console.dir('amountToAdd');
    console.dir(amountToAdd);
    await this.projectService.creatorShares.forEach(async (creatorShare: CreatorShare, index: number) => {
      if (creatorShare.share!+amountToAdd <= 100) {
        this.projectService.creatorShares[index].share = await Number(creatorShare.share!) + Number(amountToAdd);
        amountToAdd = await 0;
      } else {
        amountToAdd = await Number(amountToAdd) - Number(creatorShare.share!);
        this.projectService.creatorShares[index].share = await 100;
      }
    });
  }

}
