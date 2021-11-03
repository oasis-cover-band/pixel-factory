import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  ProjectService
} from '../project-tools/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generation-settings-page',
  templateUrl: './generation-settings-page.component.html',
  styleUrls: ['./generation-settings-page.component.scss']
})
export class GenerationSettingsPageComponent implements OnInit {

  @ViewChild('mintAmountInputElement') mintAmountInputElement!: ElementRef;
  @ViewChild('timeBetweenGenerationsInputElement') timeBetweenGenerationsInputElement!: ElementRef;
  @ViewChild('centralizedServerLocationInputElement') centralizedServerLocationInputElement!: ElementRef;

  constructor(
    public projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveMintAmount(): void {
    this.projectService.mintAmount = this.mintAmountInputElement.nativeElement.value;
  }

  saveTimeBetweenGenerations(): void {
    this.projectService.timeBetweenGenerations = this.timeBetweenGenerationsInputElement.nativeElement.value;
  }
  toggleStoreOnCentralizedServer(): void {
    this.projectService.storeOnCentralizedServer = !this.projectService.storeOnCentralizedServer;
  }

  saveCentralizedServerLocation(): void {
    this.projectService.centralizedServerLocation = this.centralizedServerLocationInputElement.nativeElement.value;
  }

  togglePrintAsPNG(): void {
    this.projectService.printAsPNG = !this.projectService.printAsPNG;
  }

  togglePrintAsSVG(): void {
    this.projectService.printAsSVG = !this.projectService.printAsSVG;
  }

  togglePrintAsHTML(): void {
    this.projectService.printAsHTML = !this.projectService.printAsHTML;
  }

  backToProject(): void {
    this.router.navigateByUrl('start-new-project');
  }

}
