import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucoesCadastrarComponent } from './devolucoes-cadastrar.component';

describe('DevolucoesCadastrarComponent', () => {
  let component: DevolucoesCadastrarComponent;
  let fixture: ComponentFixture<DevolucoesCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucoesCadastrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevolucoesCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
