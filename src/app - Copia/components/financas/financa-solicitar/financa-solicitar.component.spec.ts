import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancaSolicitarComponent } from './financa-solicitar.component';

describe('FinancaSolicitarComponent', () => {
  let component: FinancaSolicitarComponent;
  let fixture: ComponentFixture<FinancaSolicitarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancaSolicitarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancaSolicitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
