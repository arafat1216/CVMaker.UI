import { WorkExperience } from './../models/work-experience.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkExperienceDetails } from '../models/work-experience-details.model';


@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  baseApiUrl: string = "https://localhost:7275/api/WorkExperiences";

  constructor(private httpClient: HttpClient) { }

  getAllWorkExperiences(): Observable<WorkExperienceDetails[]>{
    return this.httpClient.get<WorkExperienceDetails[]>(this.baseApiUrl);
  }

  getWorkExperienceById(workExperienceId: number): Observable<WorkExperienceDetails>{
    return this.httpClient.get<WorkExperienceDetails>(`${this.baseApiUrl}/${workExperienceId}`)
  }

  addWorkExperience(addWorkExperience: WorkExperience): Observable<WorkExperienceDetails>{
    return this.httpClient.post<WorkExperienceDetails>(this.baseApiUrl, addWorkExperience);
  }

  updateWorkExperience(workExperienceId: number, updateWorkExperience: WorkExperience): Observable<WorkExperienceDetails>{
    return this.httpClient.put<WorkExperienceDetails>(`${this.baseApiUrl}/${workExperienceId}`, updateWorkExperience);
  }

  deleteWorkExperience(workExperienceId: number): Observable<Object>{
    return this.httpClient.delete<Object>(`${this.baseApiUrl}/${workExperienceId}`);
  }
}
