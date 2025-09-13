import { Component, inject, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Job } from '../jobs/job';
import { ROUTER_TOKENS } from '../../app.routes.constant';
import { JobService } from '../../services/job.service';
@Component({
  selector: 'app-favourite-jobs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './favourite-jobs.component.html',
  styleUrl: './favourite-jobs.component.css',
})
export class FavouriteJobsComponent {
  private readonly _jobService: JobService = inject(JobService);
  protected readonly ROUTER_TOKENS = ROUTER_TOKENS;
  protected jobsSignal: WritableSignal<Job[]> = this._jobService.favouriteJobsSignal;

  removeFromFavorite(id: number): void {
    this._jobService.toggleFavourites(id);
  }
}
