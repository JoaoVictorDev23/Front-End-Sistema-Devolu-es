import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewDevolucaoCorrecaoComponent } from './modal-view-devolucao-correcao.component';

describe('ModalViewDevolucaoCorrecaoComponent', () => {
  let component: ModalViewDevolucaoCorrecaoComponent;
  let fixture: ComponentFixture<ModalViewDevolucaoCorrecaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewDevolucaoCorrecaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewDevolucaoCorrecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
