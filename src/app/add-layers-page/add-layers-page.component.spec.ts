import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLayersPageComponent } from './add-layers-page.component';

describe('AddLayersPageComponent', () => {
  let component: AddLayersPageComponent;
  let fixture: ComponentFixture<AddLayersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLayersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLayersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
