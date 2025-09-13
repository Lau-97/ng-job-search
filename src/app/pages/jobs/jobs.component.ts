import { Component, inject, Signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Job } from './job';
import { ROUTER_TOKENS } from '../../app.routes.constant';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
  
  protected readonly ROUTER_TOKENS = ROUTER_TOKENS;
  private readonly _jobService: JobService = inject(JobService);
  protected readonly jobsSignal: Signal<Job[]> = this._jobService.jobsSignal;
  protected isFavorite: (id: number) => Signal<boolean> =
    this._jobService.isFavorite;

  addToFavorites(id: number): void {
    this._jobService.toggleFavourites(id);
  }
}
