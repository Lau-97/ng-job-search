import { Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { FavouriteJobsComponent } from './favourite-jobs/favourite-jobs.component';
import { HomeComponent } from './home/home.component';
import { ROUTER_TOKENS } from './app.routes.constant';

export const routes: Routes = [
  {
    path: ROUTER_TOKENS.HOME,
    component: HomeComponent,
    children: [
      { path: '', redirectTo: ROUTER_TOKENS.JOBS, pathMatch: 'full' },
      {
        path: ROUTER_TOKENS.FAVOURITES,
        component: FavouriteJobsComponent,
      },
      {
        path: ROUTER_TOKENS.JOBS,
        component: JobsComponent,
      },
      {
        path: ROUTER_TOKENS.DETAILS+'/:id',
        component: JobDetailsComponent,
      },
    ],
  },
  { path: '**', redirectTo: ROUTER_TOKENS.HOME },
];
