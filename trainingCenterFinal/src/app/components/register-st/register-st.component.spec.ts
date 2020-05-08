import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStComponent } from './register-st.component';

describe('RegisterStComponent', () => {
  let component: RegisterStComponent;
  let fixture: ComponentFixture<RegisterStComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterStComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterStComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
