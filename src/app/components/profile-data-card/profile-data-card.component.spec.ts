import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDataCardComponent } from './profile-data-card.component';

describe('ProfileDataCardComponent', () => {
  let component: ProfileDataCardComponent;
  let fixture: ComponentFixture<ProfileDataCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileDataCardComponent]
    });
    fixture = TestBed.createComponent(ProfileDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
