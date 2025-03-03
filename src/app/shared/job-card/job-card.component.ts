import { Component, Input } from '@angular/core';
import { Job } from '../../core/models/Job';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { JobLocationsPipe } from '../../core/pipes/job-locations.pipe';
import { JobPublishedDatePipe } from '../../core/pipes/job-published-date.pipe';

@Component({
    selector: 'app-job-card',
    imports: [
      JobDetailsComponent,
      JobLocationsPipe,
      JobPublishedDatePipe
    ],
    templateUrl: './job-card.component.html',
    styleUrl: './job-card.component.scss'
})
export class JobCardComponent {
  @Input() job!: Job; // Holds job details passed from the parent component.
  showDetails: boolean = false; // Controls the visibility of the job details model.
  constructor() {}

  /**
   * Opens a dialog displaying detailed job information.
   */
  openDialog(): void {
    this.showDetails = true;
  }

  /**
   * Closes the details dialog and optionally displays a success toast.
   * 
   * @param isSubmit - Indicates whether the dialog is closed after a successful action.
   *                   If `true`, a success toast is shown briefly before hiding it.
   * 
   * - If `isSubmit` is `true`, it displays a success toast message for 3 seconds.
   * - Updates the `showDetails` flag to `false` to close the dialog.
   */
  closeDialog(isSubmit: boolean = false) {
    if (isSubmit) {
      const toast = document.getElementById('success-toast');
      toast?.classList.remove('hidden');
      toast?.classList.add('visible');

      setTimeout(() => {
          toast?.classList.remove('visible');
          toast?.classList.add('hidden');
      }, 3000);
    }
    this.showDetails = false;
  }
}
