import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorShareComponent } from './creator-share.component';

describe('CreatorShareComponent', () => {
  let component: CreatorShareComponent;
  let fixture: ComponentFixture<CreatorShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
