import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailsComponent } from './job-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JobService } from '../../services/job.service';
import { signal } from '@angular/core';
import { JobDetails } from '../jobs/job';

describe('JobDetailsComponent', () => {
  let component: JobDetailsComponent;
  let fixture: ComponentFixture<JobDetailsComponent>;
  let jobServiceMock: jasmine.SpyObj<JobService>;

  const mockJobDetails = {
    id: 1,
    title: 'Frontend Developer',
    companyName: 'ACME Inc.',
    reference: 'FR-001',
    companyLogo: 'logo.png',
    types: ['Full-time'],
    industries: ['Software'],
    location: 'Remote',
    publishDate: '2025-01-01',
    description: '<p>Great job opportunity</p>',
  };

  beforeEach(async () => {
    jobServiceMock = jasmine.createSpyObj('JobService', ['getDetails']);
    jobServiceMock.getDetails.and.returnValue(of(mockJobDetails));
    const jobSignalMock = signal<JobDetails | null>(mockJobDetails);

    await TestBed.configureTestingModule({
      imports: [JobDetailsComponent],
      providers: [
        { provide: JobService, useValue: jobServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', '1']])),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JobDetailsComponent);
    component = fixture.componentInstance;


    (component as any).jobDetailsSignal = signal<JobDetails | null>(
      mockJobDetails
    );

    (component as any).jobDetailsValue = (component as any).jobDetailsSignal();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display job details when found', () => {
    jobServiceMock.getDetails.and.returnValue(of(mockJobDetails));
    (component as any).jobDetailsSignal = signal<JobDetails | null>(
      mockJobDetails
    );
    (component as any).jobDetailsValue = (component as any).jobDetailsSignal();
    fixture.detectChanges();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.job-title')?.textContent).toContain(
      'Frontend Developer'
    );
    expect(compiled.querySelector('.job-company')?.textContent).toContain(
      'ACME Inc.'
    );
    expect(compiled.querySelector('.job-reference')?.textContent).toContain(
      'FR-001'
    );
    expect(compiled.querySelector('.job-location')?.textContent).toContain(
      'Remote'
    );
    expect(compiled.querySelector('.job-description')?.innerHTML).toContain(
      'Great job opportunity'
    );
  });

  it('should show fallback message if no job details available', () => {
    (component as any).jobDetailsSignal.set(null);
    (component as any).jobDetailsValue = null;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(
      'The job has no matching details, or they are not currently available, sorry!'
    );
  });
});
