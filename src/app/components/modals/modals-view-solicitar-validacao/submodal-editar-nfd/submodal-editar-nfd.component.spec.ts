import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmodalEditarNfdComponent } from './submodal-editar-nfd.component';

describe('SubmodalEditarNfdComponent', () => {
  let component: SubmodalEditarNfdComponent;
  let fixture: ComponentFixture<SubmodalEditarNfdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmodalEditarNfdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmodalEditarNfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
