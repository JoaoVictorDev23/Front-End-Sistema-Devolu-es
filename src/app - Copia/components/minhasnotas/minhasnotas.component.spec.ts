import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasnotasComponent } from './minhasnotas.component';

describe('MinhasnotasComponent', () => {
  let component: MinhasnotasComponent;
  let fixture: ComponentFixture<MinhasnotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinhasnotasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhasnotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
