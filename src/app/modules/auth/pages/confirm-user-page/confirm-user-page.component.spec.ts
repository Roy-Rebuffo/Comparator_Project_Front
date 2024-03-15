import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUserPageComponent } from './confirm-user-page.component';

describe('ConfirmUserPageComponent', () => {
  let component: ConfirmUserPageComponent;
  let fixture: ComponentFixture<ConfirmUserPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmUserPageComponent]
    });
    fixture = TestBed.createComponent(ConfirmUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
