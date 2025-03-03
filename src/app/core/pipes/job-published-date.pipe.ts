import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobPublishedDate'
})
export class JobPublishedDatePipe implements PipeTransform {
  /**
   * Transforms a job's published date into a relative time format.
   *
   * @param dateString - The job's published date as a string.
   * @returns A formatted string indicating how long ago the job was published.
   */
  transform(dateString: string | null): string {
    if (!dateString) return '';

    const givenDate = new Date(dateString);
    const currentDate = new Date();
    const diffMs = currentDate.getTime() - givenDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `Since ${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
    }

    const months = Math.floor(diffDays / 30);
    const remainingDays = diffDays % 30;

    if (diffDays < 365) {
      return remainingDays === 0
        ? `Since ${months} ${months === 1 ? 'month' : 'months'}`
        : `Since ${months} ${months === 1 ? 'month' : 'months'} and ${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`;
    }

    const years = Math.floor(diffDays / 365);
    const remainingMonths = Math.floor((diffDays % 365) / 30);
    const remainingDaysFinal = (diffDays % 365) % 30;

    let result = `Since ${years} ${years === 1 ? 'year' : 'years'}`;
    if (remainingMonths > 0) {
      result += ` and ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    }
    if (remainingDaysFinal > 0) {
      result += ` and ${remainingDaysFinal} ${remainingDaysFinal === 1 ? 'day' : 'days'}`;
    }

    return result;
  }

}
