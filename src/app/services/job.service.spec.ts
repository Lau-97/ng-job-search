import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { JobService } from './job.service';
import { Job, JobDetails } from '../pages/jobs/job';
import { signal, WritableSignal } from '@angular/core';

describe('JobService', () => {
  let service: JobService;
  let httpMock: HttpTestingController;

  const mockJobs: Job[] = [
    { id: 1, title: 'Dev' } as Job,
    { id: 2, title: 'Designer' } as Job,
  ];

  const mockJobDetails: JobDetails = {
    id: 1,
    title: 'Dev',
    description: 'Developer job',
  } as JobDetails;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobService],
    });
    service = TestBed.inject(JobService);
    httpMock = TestBed.inject(HttpTestingController);
    const req = httpMock.expectOne('/jobs');
    req.flush(mockJobs);
    (service as any).favouriteJobsSignal = signal<Job[]>([]) as WritableSignal<
      Job[]
    >;
    (service as any).jobsSignal = signal<Job[]>(mockJobs) as WritableSignal<
      Job[]
    >;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all jobs', () => {
    service.getAllJobs().subscribe((jobs) => {
      expect(jobs.length).toBe(2);
      expect(jobs).toEqual(mockJobs);
    });

    const req = httpMock.expectOne('/jobs');
    expect(req.request.method).toBe('GET');
    req.flush(mockJobs);
  });

  it('should fetch job details', () => {
    service.getDetails(1).subscribe((details) => {
      expect(details).toEqual(mockJobDetails);
    });

    const req = httpMock.expectOne('/jobs/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockJobDetails);
  });

  it('should add job to favourites if not present', () => {
    service.toggleFavourites(1);
    expect(service.favouriteJobsSignal().length).toBe(1);
    expect(service.favouriteJobsSignal()[0].id).toBe(1);
  });

  it('should remove job from favourites if already present', () => {
    service.toggleFavourites(1);
    service.toggleFavourites(1);

    expect(service.favouriteJobsSignal().length).toBe(0);
  });

  it('isFavorite should return true if job is in favourites', () => {
    service.toggleFavourites(1);

    const isFav = service.isFavorite(1)();
    expect(isFav).toBeTrue();
  });

  it('isFavorite should return false if job is not in favourites', () => {
    service.toggleFavourites(1);
    const isFav = service.isFavorite(1)();
    expect(isFav).toBeTrue();

    const isFav2 = service.isFavorite(2)();
    expect(isFav2).toBeFalse();
  });
});
