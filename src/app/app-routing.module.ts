import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageModule } from './landing-page/landing-page.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NewProjectPageModule } from './new-project-page/new-project-page.module';
import { NewProjectPageComponent } from './new-project-page/new-project-page.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'start-new-project', component: NewProjectPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LandingPageModule,
    NewProjectPageModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
