import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationSettingsPageComponent } from './generation-settings-page.component';

describe('GenerationSettingsPageComponent', () => {
  let component: GenerationSettingsPageComponent;
  let fixture: ComponentFixture<GenerationSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationSettingsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
