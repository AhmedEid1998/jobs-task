import { Job } from "../../models/Job";

/**
 * Defines the structure of the jobs state in the NgRx store.
 */
export interface JobsState {
  /** The list of filtered jobs based on search criteria. */
  filteredJobs: Job[];

  /** The search criteria used to filter jobs. */
  filterQuery: {
    title: string;
    location: string;
  };

  /** The complete list of jobs retrieved from the server. */
  jobs: Job[];

  /** Stores error messages related to job operations, if any. */
  error: any;

  /** Indicates whether a job-related operation (fetching, filtering) is in progress. */
  loading: boolean;

  /** Stores the last available page number for pagination. */
  lastPage: number;
}

/**
 * The initial state of the jobs feature, providing default values.
 */
export const initialState: JobsState = {
  filteredJobs: [],
  filterQuery: {
    title: '',
    location: '',
  },
  jobs: [],
  error: null,
  loading: true,
  lastPage: 0
};
