import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { jobsReducer } from './core/store/jobs/jobs.reducer';
import { JobsEffects } from './core/store/jobs/jobs.effect';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ jobsState: jobsReducer }),
    provideEffects([JobsEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: true })
  ]
};
