import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteJobsComponent } from './favourite-jobs.component';
import { signal } from '@angular/core';
import { JobService } from '../../services/job.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('FavouriteJobsComponent', () => {
  let component: FavouriteJobsComponent;
  let fixture: ComponentFixture<FavouriteJobsComponent>;
  let jobServiceMock: jasmine.SpyObj<JobService>;

  const mockJobs = [
    { id: 1, title: 'Frontend Dev', companyName: 'ACME', reference: 'FR-01', companyLogo: 'logo1.png' },
    { id: 2, title: 'Backend Dev', companyName: 'Globex', reference: 'BK-99', companyLogo: 'logo2.png' },
  ];

  beforeEach(async () => {
    jobServiceMock = jasmine.createSpyObj('JobService', ['toggleFavourites']);
    (jobServiceMock as any).favouriteJobsSignal = signal(mockJobs);

    await TestBed.configureTestingModule({
      imports: [FavouriteJobsComponent, RouterTestingModule], 
      providers: [{ provide: JobService, useValue: jobServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(FavouriteJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render favourite jobs when available', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.job-item');

    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('Frontend Dev');
    expect(items[1].textContent).toContain('Backend Dev');
  });

  it('should show empty message when no favourites', () => {
    jobServiceMock.favouriteJobsSignal.set([]); 
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('There are no favourites for now!');
  });

  it('should call removeFromFavorite when clicking star icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const star = compiled.querySelectorAll('.icon-star')[0] as HTMLElement;

    star.click();

    expect(jobServiceMock.toggleFavourites).toHaveBeenCalledWith(1);
  });
});
