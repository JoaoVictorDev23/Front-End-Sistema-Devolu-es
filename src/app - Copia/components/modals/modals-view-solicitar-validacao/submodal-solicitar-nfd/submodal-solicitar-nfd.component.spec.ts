import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmodalSolicitarNfdComponent } from './submodal-solicitar-nfd.component';

describe('SubmodalSolicitarNfdComponent', () => {
  let component: SubmodalSolicitarNfdComponent;
  let fixture: ComponentFixture<SubmodalSolicitarNfdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmodalSolicitarNfdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmodalSolicitarNfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
