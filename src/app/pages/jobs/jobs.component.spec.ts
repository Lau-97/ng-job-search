import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsComponent } from './jobs.component';
import { JobService } from '../../services/job.service';
import { signal, Signal } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;
  let jobServiceMock: jasmine.SpyObj<JobService>;

  const mockJobs = [
    { id: 1, title: 'Frontend Dev', companyName: 'ACME', reference: 'FR-01', companyLogo: 'logo1.png' },
    { id: 2, title: 'Backend Dev', companyName: 'Globex', reference: 'BK-99', companyLogo: 'logo2.png' },
  ];

  beforeEach(async () => {
    jobServiceMock = jasmine.createSpyObj('JobService', [
      'toggleFavourites',
      'isFavorite',
    ]);

    (jobServiceMock as any).jobsSignal = signal(mockJobs);;
    jobServiceMock.isFavorite.and.callFake((id: number): Signal<boolean> => {
      return signal(id === 1); 
    });

    await TestBed.configureTestingModule({
      imports: [JobsComponent, RouterTestingModule], 
      providers: [{ provide: JobService, useValue: jobServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of jobs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.job-item');
    expect(items.length).toBe(2);

    expect(items[0].textContent).toContain('Frontend Dev');
    expect(items[1].textContent).toContain('Backend Dev');
  });

  it('should mark favourite jobs with active class', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const stars = compiled.querySelectorAll('.icon-star');

    expect(stars[0].classList).toContain('active'); 
    expect(stars[1].classList).not.toContain('active'); 
  });

  it('should call toggleFavourites when clicking star icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const star = compiled.querySelectorAll('.icon-star')[0] as HTMLElement;

    star.click();
    expect(jobServiceMock.toggleFavourites).toHaveBeenCalledWith(1);
  });
});
