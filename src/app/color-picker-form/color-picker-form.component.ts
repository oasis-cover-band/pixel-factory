import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { LayersService } from 'src/app/project-tools/layers.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { Router, ActivatedRoute } from '@angular/router';
import { Variation } from 'src/app/add-layers-page/layer-item/item-variation/variation.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-color-picker-form',
  templateUrl: './color-picker-form.component.html',
  styleUrls: ['./color-picker-form.component.scss']
})
export class ColorPickerFormComponent implements OnInit {

  myForm!: FormGroup;
  i!: number;
  layerIndex!: number;
  variationIndex!: number;
  activatedRouteListener!: Subscription;
  colors!: number[];
  temp!: number[];
  testColor!: string;

  variationForm: boolean = false;
  layerForm: boolean = false;

  constructor(
    private router: Router,
    public layersService: LayersService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.colors = []
    this.activatedRouteListener = this.activatedRoute.params.subscribe(params => {
      this.layerIndex = params.layerIndex
      if (this.activatedRoute.snapshot.queryParams.get('variationIndex')) {
        this.variationIndex = params.variationIndex;
        this.variationForm = true;
      } else {
        this.layerForm = true;
      }
    })
    this.myForm = this.fb.group({
      colors: this.fb.array([])
    })
  }

  get colorForms() {
    return this.myForm.get('colors') as FormArray
  }

  addColor() {
    const color = this.fb.group({
      color: ""
    })
    this.colorForms.push(color); 
    this.i = this.i+1;
  }

  convertHexToDecimals() {
    let val: any;
    for (const x of this.colorForms.value) {
      val = parseInt(x.color.replace(/^#/, ''), 16)
      if (!isNaN(val)) {
        this.colors.push(val);
      }
    }
  }

  submitForm() {
    if (this.layerForm) {
      for (let i = 0; i < this.layersService.projectLayers[this.layerIndex].variations.length; i++ ) {
        this.layersService.projectLayers[this.layerIndex].variations[i]
        .layerColors = this.colors 
      }
    } else if (this.variationForm) {
      this.layersService.projectLayers[this.layerIndex].variations[this.variationIndex]
          .variationColors = this.colors  
    }
    this.colors = []
  }

  deleteColor(i: number) {
    this.colorForms.removeAt(i);
  }

  backToEditLayerVaritions(): void {
    this.router.navigate(['edit-layer-variations', this.layerIndex]);
  }

  backToProject(): void {
    this.router.navigateByUrl('start-new-project');
  }
}
