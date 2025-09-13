import { Component, effect, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { JobDetails } from '../jobs/job';
import { ROUTER_TOKENS } from '../../app.routes.constant';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
})
export class JobDetailsComponent {

  protected readonly ROUTER_TOKENS = ROUTER_TOKENS;
  private readonly _jobService: JobService = inject(JobService);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  protected readonly jobDetailsSignal: Signal<JobDetails | undefined> = toSignal(
    this._route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (!id) return of(undefined);
        return this._jobService.getDetails(parseInt(id));
      })
    ),
    { initialValue: undefined }
  );
  protected jobDetailsValue!: JobDetails;

  constructor() {
    effect(() => {
      const val = this.jobDetailsSignal();
      if (val) {
        this.jobDetailsValue = val;
      }
    });
  }
}
