import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmazemCadastrarComponent } from './armazem-cadastrar.component';

describe('ArmazemCadastrarComponent', () => {
  let component: ArmazemCadastrarComponent;
  let fixture: ComponentFixture<ArmazemCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmazemCadastrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmazemCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
