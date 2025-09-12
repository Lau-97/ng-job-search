import { Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { FavouriteJobsComponent } from './favourite-jobs/favourite-jobs.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'jobs', pathMatch: 'full' },
      {
        path: 'favourites',
        component: FavouriteJobsComponent,
      },
      {
        path: 'jobs',
        component: JobsComponent,
      },
      {
        path: 'details/:id',
        component: JobDetailsComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/home' },
];
