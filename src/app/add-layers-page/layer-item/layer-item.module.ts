import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayerItemComponent } from './layer-item.component';
import { ItemVariationModule } from './item-variation/item-variation.module';



@NgModule({
  declarations: [
    LayerItemComponent
  ],
  imports: [
    CommonModule,
    ItemVariationModule
  ],
  exports: [
    LayerItemComponent
  ]
})
export class LayerItemModule { }
