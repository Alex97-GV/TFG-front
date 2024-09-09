import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrivacyPolicyComponent } from './user-privacy-policy.component';

describe('UserPrivacyPolicyComponent', () => {
  let component: UserPrivacyPolicyComponent;
  let fixture: ComponentFixture<UserPrivacyPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPrivacyPolicyComponent]
    });
    fixture = TestBed.createComponent(UserPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
