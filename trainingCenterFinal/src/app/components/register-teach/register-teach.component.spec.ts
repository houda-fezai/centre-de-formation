import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTeachComponent } from './register-teach.component';

describe('RegisterTeachComponent', () => {
  let component: RegisterTeachComponent;
  let fixture: ComponentFixture<RegisterTeachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterTeachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
