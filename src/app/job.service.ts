import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Job, JobDetails } from './jobs/job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private http = inject(HttpClient);
  jobsSignal = toSignal(this.getAllJobs(), { initialValue: [] as Job[] });
  favouriteJobsSignal = signal<Job[]>([]);

  isFavorite = (id: number) =>
    computed(() => !!this.favouriteJobsSignal().find((j) => j.id === id));

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('/jobs');
  }

  getDetails(id: number): Observable<JobDetails> {
    return this.http.get<JobDetails>(`/jobs/${id}`);
  }

  addToFavourites(id: number) {
    const job = this.jobsSignal().find((j) => j.id === id);
    if (!job) return;

    if (this.favouriteJobsSignal().find((j) => j.id === id)) {
      this.favouriteJobsSignal.update((current) =>
        current.filter((j) => j.id !== id)
      );
    } else {
      this.favouriteJobsSignal.update((current) => [...current, job]);
    }
  }

}
