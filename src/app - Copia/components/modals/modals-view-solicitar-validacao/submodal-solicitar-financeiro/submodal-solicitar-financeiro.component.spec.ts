import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmodalSolicitarFinanceiroComponent } from './submodal-solicitar-financeiro.component';

describe('SubmodalSolicitarFinanceiroComponent', () => {
  let component: SubmodalSolicitarFinanceiroComponent;
  let fixture: ComponentFixture<SubmodalSolicitarFinanceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmodalSolicitarFinanceiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmodalSolicitarFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
