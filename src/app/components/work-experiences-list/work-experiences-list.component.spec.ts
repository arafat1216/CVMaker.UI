import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperiencesListComponent } from './work-experiences-list.component';

describe('WorkExperiencesListComponent', () => {
  let component: WorkExperiencesListComponent;
  let fixture: ComponentFixture<WorkExperiencesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkExperiencesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkExperiencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
