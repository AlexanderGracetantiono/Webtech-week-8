import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DosenListComponent } from './dosen-list.component';

describe('DosenListComponent', () => {
  let component: DosenListComponent;
  let fixture: ComponentFixture<DosenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DosenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DosenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
