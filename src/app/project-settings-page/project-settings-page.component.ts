import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-settings-page',
  templateUrl: './project-settings-page.component.html',
  styleUrls: ['./project-settings-page.component.scss']
})
export class ProjectSettingsPageComponent implements OnInit {

  @ViewChild('projectNameInputElement') projectNameInputElement!: ElementRef<any>;
  @ViewChild('collectionNameInputElement') collectionNameInputElement!: ElementRef<any>;
  @ViewChild('collectionFamilyNameInputElement') collectionFamilyNameInputElement!: ElementRef<any>;
  
  constructor(
    private router: Router,
    public projectService: ProjectService
  ) { }

  ngOnInit(): void {
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

  backToProject(): void {
    this.router.navigateByUrl('start-new-project');
  }

}
