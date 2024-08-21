import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemiDonutChartComponent } from './semi-donut-chart.component';

describe('SemiDonutChartComponent', () => {
  let component: SemiDonutChartComponent;
  let fixture: ComponentFixture<SemiDonutChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SemiDonutChartComponent]
    });
    fixture = TestBed.createComponent(SemiDonutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
