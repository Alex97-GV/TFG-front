import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGeneralInfoCardComponent } from './profile-general-info-card.component';

describe('ProfileGeneralInfoCardComponent', () => {
  let component: ProfileGeneralInfoCardComponent;
  let fixture: ComponentFixture<ProfileGeneralInfoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileGeneralInfoCardComponent]
    });
    fixture = TestBed.createComponent(ProfileGeneralInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
