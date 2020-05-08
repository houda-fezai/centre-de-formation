import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStComponent } from './login-st.component';

describe('LoginStComponent', () => {
  let component: LoginStComponent;
  let fixture: ComponentFixture<LoginStComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginStComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
