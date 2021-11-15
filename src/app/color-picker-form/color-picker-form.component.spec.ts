import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerFormComponent } from './color-picker-form.component';

describe('ColorPickerFormComponent', () => {
  let component: ColorPickerFormComponent;
  let fixture: ComponentFixture<ColorPickerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPickerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
