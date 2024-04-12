import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmodalNfdComponent } from './submodal-nfd.component';

describe('SubmodalNfdComponent', () => {
  let component: SubmodalNfdComponent;
  let fixture: ComponentFixture<SubmodalNfdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmodalNfdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmodalNfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
