import { createAction, props } from '@ngrx/store';
import { Job } from '../../models/Job';

/**
 * Action to fetch the list of jobs.
 * @param page - The current page number for job pagination.
 */
export const getJobs = createAction('[Jobs] get jobs', props<{page: number}>());

/**
 * Action dispatched when job retrieval is successful.
 * @param jobs - An array of job objects retrieved from the server.
 * @param lastPage - The last available page number in pagination.
 */
export const getJobsSuccess = createAction('[Jobs] get jobs success', props<{jobs: Job[], lastPage: number}>());

/**
 * Action dispatched when job retrieval fails.
 * @param error - The error message received upon failure.
 */
export const getJobsFail = createAction('[Jobs] get jobs fail', props<{error: string}>());

/**
 * Action to filter jobs based on title and location.
 * @param title - The job title used as a filter criterion.
 * @param location - The job location used as a filter criterion.
 */
export const filterJobs = createAction('[Jobs] filter jobs', props<{title: string, location: string}>());

/**
 * Action to apply for a specific job.
 * @param id - The unique identifier of the job being applied for.
 */
export const applyForAJob = createAction('[Jobs] apply for a job', props<{id: string}>());