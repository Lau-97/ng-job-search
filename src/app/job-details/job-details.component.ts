import { Component, effect, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { JobService } from '../job.service';
import { MatIconModule } from '@angular/material/icon';
import { JobDetails } from '../jobs/job';
import { ROUTER_TOKENS } from '../app.routes.constant';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
})
export class JobDetailsComponent {

  protected jobDetailsValue!: JobDetails;
  protected readonly ROUTER_TOKENS = ROUTER_TOKENS;
  private jobService: JobService = inject(JobService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  readonly jobDetailsSignal: Signal<JobDetails | undefined> = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (!id) return of(undefined);
        return this.jobService.getDetails(parseInt(id));
      })
    ),
    { initialValue: undefined }
  );

  constructor() {
    effect(() => {
      const val = this.jobDetailsSignal();
      if (val) {
        this.jobDetailsValue = val;
      }
    });
  }
}
