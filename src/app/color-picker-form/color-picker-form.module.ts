import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerFormComponent } from './color-picker-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ItemVariationModule } from 'src/app/add-layers-page/layer-item/item-variation/item-variation.module';



@NgModule({
  declarations: [
    ColorPickerFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatFormFieldModule,
    NoopAnimationsModule,
    ItemVariationModule
  ],
  exports: [
    ColorPickerFormComponent
  ]
})
export class ColorPickerFormModule { }

 