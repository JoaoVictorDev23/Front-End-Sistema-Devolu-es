import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewArmazemComponent } from './modal-view-armazem.component';

describe('ModalViewArmazemComponent', () => {
  let component: ModalViewArmazemComponent;
  let fixture: ComponentFixture<ModalViewArmazemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewArmazemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewArmazemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
