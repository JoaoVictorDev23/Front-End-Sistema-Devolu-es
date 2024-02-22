import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDevolucaoEditComponent } from './modal-devolucao-edit.component';

describe('ModalDevolucaoEditComponent', () => {
  let component: ModalDevolucaoEditComponent;
  let fixture: ComponentFixture<ModalDevolucaoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDevolucaoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDevolucaoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
