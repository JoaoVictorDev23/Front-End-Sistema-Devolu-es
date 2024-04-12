import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmodalEditarFinanceiroComponent } from './submodal-editar-financeiro.component';

describe('SubmodalEditarFinanceiroComponent', () => {
  let component: SubmodalEditarFinanceiroComponent;
  let fixture: ComponentFixture<SubmodalEditarFinanceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmodalEditarFinanceiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmodalEditarFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
