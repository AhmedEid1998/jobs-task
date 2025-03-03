import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Job } from '../../core/models/Job';
import { applyForAJob } from '../../core/store/jobs/jobs.actions';
import { CommonModule } from '@angular/common';
import { SeeMoreLessDirective } from '../../core/directive/see-more-less.directive';
import { JobLocationsPipe } from '../../core/pipes/job-locations.pipe';
import { JobPublishedDatePipe } from '../../core/pipes/job-published-date.pipe';

@Component({
  selector: 'app-job-details',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SeeMoreLessDirective,
    JobLocationsPipe,
    JobPublishedDatePipe
  ],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent implements OnInit {
  @Input() job!: Job; // Holds job details passed from the parent component.
  @Output() modalClosed  = new EventEmitter<boolean>(); // Emitting an event with no data
  jobForm!: FormGroup; // Stores the job application form data.
  showDetails = true; // Controls the visibility of job details.
  activeIndex = 0; // Default active item index
  navItems = [
    { label: 'Job Details', icon: 'M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z' },
    { label: 'Apply', icon: 'M4 4h16v2H4zm0 5h10v2H4zm0 5h16v2H4zm12 5v-3h4v-2h-6v5z' },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initializes the application form with required fields and validation rules.
   * 
   * This method sets up a reactive form with multiple form controls, ensuring 
   * that necessary fields are filled before submission.
   * 
   * - `name`: Required text input for the applicant's full name.
   * - `email`: Required email input with validation for a valid email format.
   * - `phone`: Required text input for the applicant's phone number.
   * - `country`: Required text input for the applicant's country.
   * - `education`: Required text input for the applicant's educational background.
   * - `currentPosition`: Required text input for the applicant's current job position.
   * - `company`: Required text input for the applicant's current or last company.
   * - `CV`: Required file upload field for the applicant's resume (CV).
   * - `coverLetter`: Required file upload field for the applicant's cover letter.
   */
  initializeForm() {
    this.jobForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      education: ['', Validators.required],
      currentPosition: ['', Validators.required],
      company: ['', Validators.required],
      CV: [null, Validators.required],
      coverLetter: [null, Validators.required]
    });
  }

  /**
   * Handles file uploads, ensuring the file size does not exceed 3MB.
   * 
   * @param event - The file input change event.
   * @param field - The form field to update with the selected file.
   */
  onFileChange(event: any, field: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size <= 3000000) {
        this.jobForm.patchValue({ [field]: file });
      } else {
        const toast = document.getElementById('toast-warning');
        toast?.classList.remove('hidden');
        toast?.classList.add('visible');

        setTimeout(() => {
          toast?.classList.remove('visible');
          toast?.classList.add('hidden');
        }, 3000);
        this.jobForm.patchValue({ [field]: null });
      }
    }
  }

  /**
   * Submits the job application form, dispatches the apply action, 
   * and displays a success toast message.
   */
  onSubmit() {
    if (this.jobForm.valid) {
      this.store.dispatch(applyForAJob({id: this.job.id}));
      const newJob = {...this.job};
      newJob.applied = true;
      this.job = newJob;
      this.closeDialog(true);
    } else {
      console.log('Form is invalid');
    }
  }

  /**
   * Toggles the saved state of the job.
   */
  toggleSaveJob() {
    const newJob = {...this.job};
    newJob.saved = !newJob.saved;
    this.job = newJob;
  }

  /**
   * Sets the active index for UI selection or highlighting.
   * @param index - The index of the active tab.
   */
  setActive(index: number) {
    this.activeIndex = index;
  }

  /**
   * Closes the modal and emits an event indicating submission status.
   * @param isSubmit - If the method called when submit the form
   */
  closeDialog(isSubmit: boolean = false) {
    this.modalClosed.emit(isSubmit); // Emit event when modal is closed
  }
}
