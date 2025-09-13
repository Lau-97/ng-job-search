import { Routes } from '@angular/router';
import { JobsComponent } from './pages/jobs/jobs.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { FavouriteJobsComponent } from './pages/favourite-jobs/favourite-jobs.component';
import { HomeComponent } from './pages/home/home.component';
import { ROUTER_TOKENS } from './app.routes.constant';

export const routes: Routes = [
  {
    path: ROUTER_TOKENS.HOME,
    component: HomeComponent,
    children: [
      { path: '', redirectTo: ROUTER_TOKENS.JOBS, pathMatch: 'full' },
      {
        path: ROUTER_TOKENS.FAVOURITES,
        loadComponent: () =>
          import('./pages/favourite-jobs/favourite-jobs.component').then(
            c => c.FavouriteJobsComponent
          ),
      },
      {
        path: ROUTER_TOKENS.JOBS,
        component: JobsComponent,
      },
      {
        path: ROUTER_TOKENS.DETAILS + '/:id',
        loadComponent: () =>
          import('./pages/job-details/job-details.component').then(
            c => c.JobDetailsComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: ROUTER_TOKENS.HOME },
];
