import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { JobService } from '../job.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
})
export class JobDetailsComponent {
  private jobService = inject(JobService);
  private route = inject(ActivatedRoute);
  job = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (!id) return of(undefined);
        console.log("id", id)
        return this.jobService.getDetails(parseInt(id));
      })
    ),
    { initialValue: undefined }
  );


}
