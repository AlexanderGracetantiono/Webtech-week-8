import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatakuliahFormComponent } from './matkul-form.component';

describe('MatakuliahFormComponent', () => {
  let component: MatakuliahFormComponent;
  let fixture: ComponentFixture<MatakuliahFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatakuliahFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatakuliahFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
