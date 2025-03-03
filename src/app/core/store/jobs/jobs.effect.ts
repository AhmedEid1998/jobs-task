import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { getJobs, getJobsFail, getJobsSuccess } from './jobs.actions';
import { JobsService } from '../../services/jobs.service';

@Injectable()
export class JobsEffects {
  constructor(
    private actions$: Actions,
    private jobsService: JobsService
  ) {}

  /**
   * Helper function to process a successful job fetch response.
   * Extracts job data and pagination details, then dispatches 
   * a success action with the retrieved jobs.
   *
   * @param response - The API response containing job data and metadata.
   * @returns An action containing the job list and last page number.
   */
  private handleGetJobsSuccess(response: { data: any[], meta: any }) {
    const jobs = response.data;
    const lastPage = response.meta.last_page;
    return getJobsSuccess({ jobs, lastPage });
  }

  /**
   * Helper function to process job fetch failure.
   * Dispatches a failure action with the encountered error.
   *
   * @param error - The error object from the failed request.
   * @returns An observable that emits the `getJobsFail` action with the error payload.
   */
  private handleGetJobsFailure(error: any) {
    return of(getJobsFail({ error }));
  }

  /**
   * Effect to handle job fetching.
   * Listens for the `getJobs` action, calls the job service, 
   * and dispatches either a success or failure action based on the API response.
   */
  loadJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getJobs),
      switchMap((action) =>
        this.jobsService.getAllJobs(action.page).pipe(
          map(this.handleGetJobsSuccess),
          catchError(this.handleGetJobsFailure)
        )
      )
    )
  );
}