import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmodalVerNfdComponent } from './submodal-ver-nfd.component';

describe('SubmodalVerNfdComponent', () => {
  let component: SubmodalVerNfdComponent;
  let fixture: ComponentFixture<SubmodalVerNfdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmodalVerNfdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmodalVerNfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
