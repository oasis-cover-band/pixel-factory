import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageModule } from './landing-page/landing-page.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NewProjectPageModule } from './new-project-page/new-project-page.module';
import { NewProjectPageComponent } from './new-project-page/new-project-page.component';
import { AddLayersPageModule } from './add-layers-page/add-layers-page.module';
import { AddLayersPageComponent } from './add-layers-page/add-layers-page.component';
import { ProjectSettingsPageModule } from './project-settings-page/project-settings-page.module';
import { ProjectSettingsPageComponent } from './project-settings-page/project-settings-page.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'start-new-project', component: NewProjectPageComponent},
  {path: 'add-layers', component: AddLayersPageComponent},
  {path: 'edit-project', component: ProjectSettingsPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LandingPageModule,
    NewProjectPageModule,
    AddLayersPageModule,
    ProjectSettingsPageModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
