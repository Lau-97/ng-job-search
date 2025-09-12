import { Component, inject } from '@angular/core';
import { JobService } from '../job.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent {

 private jobService = inject(JobService)
  jobsSignal = this.jobService.jobsSignal;

}

