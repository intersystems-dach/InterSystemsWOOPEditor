import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsShortComponent } from './settings-short.component';

describe('SettingsShortComponent', () => {
  let component: SettingsShortComponent;
  let fixture: ComponentFixture<SettingsShortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsShortComponent]
    });
    fixture = TestBed.createComponent(SettingsShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
