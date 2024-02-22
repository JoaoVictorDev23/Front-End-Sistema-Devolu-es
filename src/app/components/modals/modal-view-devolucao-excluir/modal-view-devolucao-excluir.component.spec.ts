import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewDevolucaoExcluirComponent } from './modal-view-devolucao-excluir.component';

describe('ModalViewDevolucaoExcluirComponent', () => {
  let component: ModalViewDevolucaoExcluirComponent;
  let fixture: ComponentFixture<ModalViewDevolucaoExcluirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewDevolucaoExcluirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewDevolucaoExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
