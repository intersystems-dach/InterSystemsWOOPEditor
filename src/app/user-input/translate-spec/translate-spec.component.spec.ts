import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateSpecComponent } from './translate-spec.component';

describe('TranslateSpecComponent', () => {
  let component: TranslateSpecComponent;
  let fixture: ComponentFixture<TranslateSpecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslateSpecComponent]
    });
    fixture = TestBed.createComponent(TranslateSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
