import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordQueryComponent } from './password-query.component';

describe('PasswordQueryComponent', () => {
  let component: PasswordQueryComponent;
  let fixture: ComponentFixture<PasswordQueryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordQueryComponent]
    });
    fixture = TestBed.createComponent(PasswordQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
