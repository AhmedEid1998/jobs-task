export interface Job {
  id: string;
  title: string;
  cover: string;
  description: string;
  location: string;
  date_published: string;
  priority: string;
  applied?: boolean;
  saved?: boolean;
  type: string,
  number_of_vacancies: number;
  minimum_years_of_experience: number,
  job_locations: any[],
  page: any,
  apply: any[],
}
