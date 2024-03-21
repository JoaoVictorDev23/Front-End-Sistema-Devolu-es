import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmodalVerFinanceiroComponent } from './submodal-ver-financeiro.component';

describe('SubmodalVerFinanceiroComponent', () => {
  let component: SubmodalVerFinanceiroComponent;
  let fixture: ComponentFixture<SubmodalVerFinanceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmodalVerFinanceiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmodalVerFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
