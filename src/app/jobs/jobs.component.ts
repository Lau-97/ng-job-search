import { Component, inject, Signal } from '@angular/core';
import { JobService } from '../job.service';
import { RouterLink, RouterModule } from '@angular/router';
import { Job } from './job';
import { ROUTER_TOKENS } from '../app.routes.constant';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
})
export class JobsComponent {
  private jobService: JobService = inject(JobService);
  protected jobsSignal: Signal<Job[]> = this.jobService.jobsSignal;
  protected isFavorite: (id: number) => Signal<boolean> =
    this.jobService.isFavorite;
  protected readonly ROUTER_TOKENS = ROUTER_TOKENS;

  addToFavorites(id: number): void {
    this.jobService.toggleFavourites(id);
  }
}
