import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLayersPageComponent } from './add-layers-page.component';
import { LayerItemModule } from './layer-item/layer-item.module';



@NgModule({
  declarations: [
    AddLayersPageComponent
  ],
  imports: [
    CommonModule,
    LayerItemModule
  ],
  exports: [
    AddLayersPageComponent
  ]
})
export class AddLayersPageModule { }
