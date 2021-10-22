import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerSettingsPageComponent } from './layer-settings-page.component';

describe('LayerSettingsPageComponent', () => {
  let component: LayerSettingsPageComponent;
  let fixture: ComponentFixture<LayerSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerSettingsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
