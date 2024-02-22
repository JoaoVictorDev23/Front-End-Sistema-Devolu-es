import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasnotasCorrecaoComponent } from './minhasnotas-correcao.component';

describe('MinhasnotasCorrecaoComponent', () => {
  let component: MinhasnotasCorrecaoComponent;
  let fixture: ComponentFixture<MinhasnotasCorrecaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinhasnotasCorrecaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhasnotasCorrecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
