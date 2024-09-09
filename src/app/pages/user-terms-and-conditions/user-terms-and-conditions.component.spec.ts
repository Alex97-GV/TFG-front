import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTermsAndConditionsComponent } from './user-terms-and-conditions.component';

describe('UserTermsAndConditionsComponent', () => {
  let component: UserTermsAndConditionsComponent;
  let fixture: ComponentFixture<UserTermsAndConditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTermsAndConditionsComponent]
    });
    fixture = TestBed.createComponent(UserTermsAndConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
