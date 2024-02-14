import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaCadastrarComponent } from './pessoa-cadastrar.component';

describe('PessoaCadastrarComponent', () => {
  let component: PessoaCadastrarComponent;
  let fixture: ComponentFixture<PessoaCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoaCadastrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
