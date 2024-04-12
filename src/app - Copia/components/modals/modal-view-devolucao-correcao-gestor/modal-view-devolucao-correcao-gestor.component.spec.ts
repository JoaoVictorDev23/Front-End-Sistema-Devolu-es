import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewDevolucaoCorrecaoGestorComponent } from './modal-view-devolucao-correcao-gestor.component';

describe('ModalViewDevolucaoCorrecaoGestorComponent', () => {
  let component: ModalViewDevolucaoCorrecaoGestorComponent;
  let fixture: ComponentFixture<ModalViewDevolucaoCorrecaoGestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewDevolucaoCorrecaoGestorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewDevolucaoCorrecaoGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
