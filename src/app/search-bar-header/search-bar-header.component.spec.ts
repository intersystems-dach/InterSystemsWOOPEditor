import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarHeaderComponent } from './search-bar-header.component';

describe('SearchBarHeaderComponent', () => {
  let component: SearchBarHeaderComponent;
  let fixture: ComponentFixture<SearchBarHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarHeaderComponent]
    });
    fixture = TestBed.createComponent(SearchBarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
