import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLayerVariationsPageComponent } from './edit-layer-variations-page.component';

describe('EditLayerVariationsPageComponent', () => {
  let component: EditLayerVariationsPageComponent;
  let fixture: ComponentFixture<EditLayerVariationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLayerVariationsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLayerVariationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
