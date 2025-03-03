import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobCardComponent } from '../shared/job-card/job-card.component';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';
import { Job } from '../core/models/Job';
import { getJobs, filterJobs } from '../core/store/jobs/jobs.actions';
import { selectJobsState } from '../core/store/jobs/jobs.select';

@Component({
  selector: 'app-all-jobs',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavBarComponent,
    JobCardComponent
  ],
  templateUrl: './all-jobs.component.html',
  styleUrl: './all-jobs.component.scss'
})
export class AllJobsComponent {
  private destroy$ = new Subject<void>();  // Destroy Subject
  page = 1; // Tracks the current page number.
  error = false; // Indicates if an error occurred while fetching jobs.
  jobs: Job[] = []; // Stores the list of retrieved jobs.
  loading = true; // Represents the loading state while fetching data.
  lastPage = 0; // Holds the last available page number.
  searchForm!: FormGroup; // Form for handling job search inputs.

  constructor(
    private _store: Store,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.reloadData();
  }

   /**
   * Initializes the search form with default values.
   * 
   * This method sets up a reactive form with two form controls: 
   * - `title`: Represents the job title input.
   * - `location`: Represents the job location input.
   */
  initializeForm() {
    this.searchForm = this._formBuilder.group({
      title: [''],
      location: ['']
    });
  }

  /**
   * Reloads job data by subscribing to query parameters, job state, and form changes.
   * 
   * - Listens for changes in URL query parameters to update the page number dynamically.
   * - Fetches jobs from the store based on the updated page number.
   * - Subscribes to job state changes to update the job list, loading state, and error state.
   * - Listens for changes in the search form to apply filters with debouncing.
   */
  reloadData() {
    this._activatedRoute.queryParams
      .pipe(
        takeUntil(this.destroy$),
        tap(data => {
          this.page = data['page'] || 1;
          this._store.dispatch(getJobs({page: this.page}));
        })
      ).subscribe();

    this._store.select(selectJobsState)
      .pipe(
        takeUntil(this.destroy$),
        tap(data => {
          if (data.error) this.error = true;
          else if (data.jobs) this.jobs = data.filteredJobs;

          this.loading = data.loading;
          this.lastPage = data.lastPage;
        })
      ).subscribe();

    this.searchForm.valueChanges
      .pipe(
        debounceTime(500), // Wait 0.5 second
        distinctUntilChanged(), // Only trigger if the value actually changes
        tap(() => this._store.dispatch(filterJobs(this.searchForm.value)))
      ).subscribe();
  }

  /**
   * Handles page change events and updates the URL query parameters.
   * 
   * @param page - The pagination event containing the new page index.
   */
  changePage(paginationType: string): void {
    if (paginationType == '+') this.page++;
    else this.page--;
    if (this.page >= 1 && this.page <= this.lastPage) {
      this._router.navigate([], { queryParams: { page: this.page } });
    } else this.page = 1;
  }
  
  ngOnDestroy() {
    this.destroy$.next();  // Emit to complete all subscriptions
    this.destroy$.complete();  // Complete the subject
  }
}
