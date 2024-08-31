import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAllPageComponent } from './search-all-page.component';

describe('SearchAllPageComponent', () => {
  let component: SearchAllPageComponent;
  let fixture: ComponentFixture<SearchAllPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchAllPageComponent]
    });
    fixture = TestBed.createComponent(SearchAllPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
