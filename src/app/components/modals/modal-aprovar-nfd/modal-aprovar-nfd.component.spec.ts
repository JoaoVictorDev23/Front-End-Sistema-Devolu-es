import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAprovarNfdComponent } from './modal-aprovar-nfd.component';

describe('ModalAprovarNfdComponent', () => {
  let component: ModalAprovarNfdComponent;
  let fixture: ComponentFixture<ModalAprovarNfdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAprovarNfdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAprovarNfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
