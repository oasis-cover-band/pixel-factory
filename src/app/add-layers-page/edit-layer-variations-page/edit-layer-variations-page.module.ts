import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditLayerVariationsPageComponent } from './edit-layer-variations-page.component';
import { ItemVariationModule } from '../layer-item/item-variation/item-variation.module';



@NgModule({
  declarations: [
    EditLayerVariationsPageComponent
  ],
  imports: [
    CommonModule,
    ItemVariationModule
  ],
  exports: [
    EditLayerVariationsPageComponent
  ]
})
export class EditLayerVariationsPageModule { }
