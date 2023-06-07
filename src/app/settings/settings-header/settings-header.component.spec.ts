import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsHeaderComponent } from './settings-header.component';

describe('SettingsHeaderComponent', () => {
  let component: SettingsHeaderComponent;
  let fixture: ComponentFixture<SettingsHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsHeaderComponent]
    });
    fixture = TestBed.createComponent(SettingsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
