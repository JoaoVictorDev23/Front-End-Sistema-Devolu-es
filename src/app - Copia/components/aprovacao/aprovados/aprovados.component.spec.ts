import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovadosComponent } from './aprovados.component';

describe('AprovadosComponent', () => {
  let component: AprovadosComponent;
  let fixture: ComponentFixture<AprovadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprovadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprovadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
