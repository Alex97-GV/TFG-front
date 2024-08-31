import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInterestsPageComponent } from './search-interests-page.component';

describe('SearchInterestsPageComponent', () => {
  let component: SearchInterestsPageComponent;
  let fixture: ComponentFixture<SearchInterestsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInterestsPageComponent]
    });
    fixture = TestBed.createComponent(SearchInterestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
