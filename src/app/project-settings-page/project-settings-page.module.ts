import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSettingsPageComponent } from './project-settings-page.component';
import { CreatorShareModule } from './creator-share/creator-share.module';



@NgModule({
  declarations: [
    ProjectSettingsPageComponent
  ],
  imports: [
    CommonModule,
    CreatorShareModule
  ],
  exports: [
    ProjectSettingsPageComponent
  ]
})
export class ProjectSettingsPageModule { }
