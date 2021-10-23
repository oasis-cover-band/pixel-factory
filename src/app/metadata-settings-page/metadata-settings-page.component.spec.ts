import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataSettingsPageComponent } from './metadata-settings-page.component';

describe('MetadataSettingsPageComponent', () => {
  let component: MetadataSettingsPageComponent;
  let fixture: ComponentFixture<MetadataSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataSettingsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
