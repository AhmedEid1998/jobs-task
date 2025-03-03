import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../models/Job';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private apiUrl = 'https://api-next.jobsglobal.com:54902/api/v1/jobs/all'; // API base URL for fetching job data.

  constructor(private http: HttpClient) { }

  /**
   * Fetches all jobs with pagination.
   *
   * @param page - The page number to retrieve.
   * @returns An observable containing the list of jobs and pagination metadata.
   */
  getAllJobs(page: number): Observable<any> {
    return this.http.get<{data: Job[], meta: any}>(this.apiUrl, {params: {
      pagination_type: 'paginate',
      page,
      per_page: 20
    }});
  }
  
}
