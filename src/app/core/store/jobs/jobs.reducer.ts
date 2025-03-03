import { createReducer, on } from "@ngrx/store";
import { JobsState, initialState } from "./jobs.state";
import { applyForAJob, filterJobs, getJobsFail, getJobsSuccess } from "./jobs.actions";
import { Job } from "../../models/Job";

// Helper function to filter jobs based on title and location
const filterJobsByQuery = (jobs: Job[], title: string, location: string): Job[] => {
  return jobs.filter(
    (job) =>
      (job.title || '').toLowerCase().includes(title.toLowerCase()) &&
      (job.location || '').toLowerCase().includes(location.toLowerCase())
  );
};

// Helper function to update a job's applied status
const toggleJobApplicationStatus = (jobs: Job[], jobId: string): Job[] => {
  return jobs.map((job) =>
    job.id === jobId ? { ...job, applied: !job.applied } : job
  );
};

export const jobsReducer = createReducer(
  initialState,

  // Handle successful job fetch
  on(getJobsSuccess, (state, { jobs, lastPage }) => ({
    ...state,
    jobs: [...jobs],
    filteredJobs: filterJobsByQuery(jobs, state.filterQuery.title, state.filterQuery.location),
    loading: false,
    error: null,
    lastPage,
  })),

  // Handle job fetch failure
  on(getJobsFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Handle job filtering
  on(filterJobs, (state, { title, location }) => ({
    ...state,
    filterQuery: { title, location },
    filteredJobs: filterJobsByQuery(state.jobs, title, location),
  })),

  // Handle job application
  on(applyForAJob, (state, { id }) => ({
    ...state,
    jobs: toggleJobApplicationStatus(state.jobs, id),
    filteredJobs: filterJobsByQuery(
      toggleJobApplicationStatus(state.jobs, id),
      state.filterQuery.title,
      state.filterQuery.location
    ),
  }))
);