import { createSelector, createFeatureSelector } from '@ngrx/store';
import { JobsState } from './jobs.state';

/**
 * Selects the entire jobs state from the store.
 */
export const selectJobsState = createFeatureSelector<JobsState>('jobsState');

/**
 * Selects the list of all jobs from the jobs state.
 * @returns An array of job objects.
 */
export const selectAllJobs = createSelector(
  selectJobsState,
  (state: JobsState) => state.jobs
);

/**
 * Selects the error message (if any) from the jobs state.
 * @returns The error message or null if no error exists.
 */
export const selectJobsError = createSelector(
  selectJobsState,
  (state: JobsState) => state.error
);
