import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasnotasReprovadasComponent } from './minhasnotas-reprovadas.component';

describe('MinhasnotasReprovadasComponent', () => {
  let component: MinhasnotasReprovadasComponent;
  let fixture: ComponentFixture<MinhasnotasReprovadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinhasnotasReprovadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhasnotasReprovadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
