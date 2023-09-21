import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectViaUrlComponent } from './connect-via-url.component';

describe('ConnectViaUrlComponent', () => {
  let component: ConnectViaUrlComponent;
  let fixture: ComponentFixture<ConnectViaUrlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectViaUrlComponent]
    });
    fixture = TestBed.createComponent(ConnectViaUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
