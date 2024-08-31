import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAuthorsPageComponent } from './search-authors-page.component';

describe('SearchAuthorsPageComponent', () => {
  let component: SearchAuthorsPageComponent;
  let fixture: ComponentFixture<SearchAuthorsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchAuthorsPageComponent]
    });
    fixture = TestBed.createComponent(SearchAuthorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
