import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovacaoComponent } from './aprovacao.component';

describe('AprovacaoComponent', () => {
  let component: AprovacaoComponent;
  let fixture: ComponentFixture<AprovacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprovacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprovacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
