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

  saveCentralizedServerLocation(): void {
    this.projectService.centralizedServerLocation = this.centralizedServerLocationInputElement.nativeElement.value;
  }

  backToProject(): void {
    this.router.navigateByUrl('start-new-project');
  }

}
