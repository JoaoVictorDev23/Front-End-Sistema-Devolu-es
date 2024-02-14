import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmazemListarComponent } from './armazem-listar.component';

describe('ArmazemListarComponent', () => {
  let component: ArmazemListarComponent;
  let fixture: ComponentFixture<ArmazemListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmazemListarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmazemListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
