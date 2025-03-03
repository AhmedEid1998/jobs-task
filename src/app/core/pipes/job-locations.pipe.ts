import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobLocations'
})
export class JobLocationsPipe implements PipeTransform {

  /**
   * Transforms job locations array into a formatted string.
   *
   * @param locations - Array of job location objects.
   * @returns A string containing job locations joined by ' & '.
   */
  transform(locations: { name: string }[] = []): string {
    return locations.map(location => location.name).join(' & ') || '';
  }

}
