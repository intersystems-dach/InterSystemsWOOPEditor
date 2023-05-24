import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNavBarComponent } from './page-nav-bar.component';

describe('PageNavBarComponent', () => {
  let component: PageNavBarComponent;
  let fixture: ComponentFixture<PageNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageNavBarComponent]
    });
    fixture = TestBed.createComponent(PageNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
