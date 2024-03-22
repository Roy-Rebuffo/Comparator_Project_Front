import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorramasComponent } from './ahorramas.component';

describe('AhorramasComponent', () => {
  let component: AhorramasComponent;
  let fixture: ComponentFixture<AhorramasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AhorramasComponent]
    });
    fixture = TestBed.createComponent(AhorramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
