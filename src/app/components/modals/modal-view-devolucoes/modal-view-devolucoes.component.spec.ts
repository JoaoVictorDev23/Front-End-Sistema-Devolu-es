import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewDevolucoesComponent } from './modal-view-devolucoes.component';

describe('ModalViewDevolucoesComponent', () => {
  let component: ModalViewDevolucoesComponent;
  let fixture: ComponentFixture<ModalViewDevolucoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewDevolucoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewDevolucoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
