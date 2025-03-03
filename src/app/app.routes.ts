import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'jobs', pathMatch: 'full' },
    {
        path: 'jobs',
        loadComponent: () => import('./all-jobs/all-jobs.component').then(m => m.AllJobsComponent)
    },
    { path: '**', component: NotFoundComponent }
];
