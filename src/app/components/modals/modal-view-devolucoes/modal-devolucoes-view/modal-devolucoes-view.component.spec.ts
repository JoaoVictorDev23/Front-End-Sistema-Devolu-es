import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDevolucoesViewComponent } from './modal-devolucoes-view.component';

describe('ModalDevolucoesViewComponent', () => {
  let component: ModalDevolucoesViewComponent;
  let fixture: ComponentFixture<ModalDevolucoesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDevolucoesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDevolucoesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
