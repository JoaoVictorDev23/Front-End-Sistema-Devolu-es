import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoCadastrarComponent } from './motivo-cadastrar.component';

describe('MotivoCadastrarComponent', () => {
  let component: MotivoCadastrarComponent;
  let fixture: ComponentFixture<MotivoCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotivoCadastrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivoCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
