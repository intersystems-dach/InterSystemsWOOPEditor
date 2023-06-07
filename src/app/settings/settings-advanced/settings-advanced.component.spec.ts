import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAdvancedComponent } from './settings-advanced.component';

describe('SettingsAdvancedComponent', () => {
  let component: SettingsAdvancedComponent;
  let fixture: ComponentFixture<SettingsAdvancedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsAdvancedComponent]
    });
    fixture = TestBed.createComponent(SettingsAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
