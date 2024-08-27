import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialsTableComponent } from './socials-table.component';

describe('SocialsTableComponent', () => {
  let component: SocialsTableComponent;
  let fixture: ComponentFixture<SocialsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialsTableComponent]
    });
    fixture = TestBed.createComponent(SocialsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
