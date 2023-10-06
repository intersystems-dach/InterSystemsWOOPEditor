import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploySpecComponent } from './deploy-spec.component';

describe('DeploySpecComponent', () => {
  let component: DeploySpecComponent;
  let fixture: ComponentFixture<DeploySpecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeploySpecComponent]
    });
    fixture = TestBed.createComponent(DeploySpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
