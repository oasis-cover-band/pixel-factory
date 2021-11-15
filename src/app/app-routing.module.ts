import {
  Component,
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  LandingPageModule
} from './landing-page/landing-page.module';
import {
  LandingPageComponent
} from './landing-page/landing-page.component';
import {
  NewProjectPageModule
} from './new-project-page/new-project-page.module';
import {
  NewProjectPageComponent
} from './new-project-page/new-project-page.component';
import {
  AddLayersPageModule
} from './add-layers-page/add-layers-page.module';
import {
  AddLayersPageComponent
} from './add-layers-page/add-layers-page.component';
import {
  ProjectSettingsPageModule
} from './project-settings-page/project-settings-page.module';
import {
  ProjectSettingsPageComponent
} from './project-settings-page/project-settings-page.component';
import {
  EditLayerVariationsPageModule
} from './add-layers-page/edit-layer-variations-page/edit-layer-variations-page.module';
import {
  EditLayerVariationsPageComponent
} from './add-layers-page/edit-layer-variations-page/edit-layer-variations-page.component';
import { GenerationSettingsPageModule } from './generation-settings-page/generation-settings-page.module';
import { GenerationSettingsPageComponent } from './generation-settings-page/generation-settings-page.component';
import { GenerationPageModule } from './generation-page/generation-page.module';
import { GenerationPageComponent } from './generation-page/generation-page.component';
import { ColorPickerFormComponent } from './color-picker-form/color-picker-form.component';
import { ColorPickerFormModule } from './color-picker-form/color-picker-form.module';

const routes: Routes = [{
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'start-new-project',
    component: NewProjectPageComponent
  },
  {
    path: 'add-layers',
    component: AddLayersPageComponent
  },
  {
    path: 'edit-project-settings',
    component: ProjectSettingsPageComponent
  },
  {
    path: 'edit-layer-variations/:layerIndex',
    component: EditLayerVariationsPageComponent
  },
  {
    path: 'generation-settings',
    component: GenerationSettingsPageComponent
  },
  {
    path: 'generate',
    component: GenerationPageComponent
  },
  {
    path: 'color-picker/:layerIndex',
    component: ColorPickerFormComponent
  },
  {
    path: 'color-picker/:layerIndex/:variationIndex', 
    component: ColorPickerFormComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LandingPageModule,
    NewProjectPageModule,
    AddLayersPageModule,
    ProjectSettingsPageModule,
    EditLayerVariationsPageModule,
    GenerationPageModule,
    GenerationSettingsPageModule,
    ColorPickerFormModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
