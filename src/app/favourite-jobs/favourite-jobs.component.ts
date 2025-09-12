import { Component, inject } from '@angular/core';
import { JobService } from '../job.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-favourite-jobs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './favourite-jobs.component.html',
  styleUrl: './favourite-jobs.component.css',
})
export class FavouriteJobsComponent {
  private jobService = inject(JobService);
  jobsSignal = this.jobService.favouriteJobsSignal;

  removeFromFavorite(id: number) {
    this.jobService.addToFavourites(id);
  }
}
