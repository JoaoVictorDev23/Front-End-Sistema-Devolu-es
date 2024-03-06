import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmodalFinanceiroComponent } from './submodal-financeiro.component';

describe('SubmodalFinanceiroComponent', () => {
  let component: SubmodalFinanceiroComponent;
  let fixture: ComponentFixture<SubmodalFinanceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmodalFinanceiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmodalFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
