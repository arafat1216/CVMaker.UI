import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectDetails } from '../models/project-details.model';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseApiUrl: string = "https://localhost:7275/api/Projects";

  constructor(private httpClient: HttpClient) { }

  getProjects(): Observable<ProjectDetails[]>{
    return this.httpClient.get<ProjectDetails[]>(this.baseApiUrl);
  }

  getProjectById(projectId: number): Observable<ProjectDetails>{
    return this.httpClient.get<ProjectDetails>(`${this.baseApiUrl}/${projectId}`);
  }

  addProject(addProjectRequest: Project): Observable<ProjectDetails>{
    return this.httpClient.post<ProjectDetails>(this.baseApiUrl, addProjectRequest);
  }

  updateProject(projectId: number, updateProjectRequest: Project): Observable<ProjectDetails>{
    return this.httpClient.put<ProjectDetails>(`${this.baseApiUrl}/${projectId}`, updateProjectRequest);
  }

  deleteProject(projectId: number): Observable<Object>{
    return this.httpClient.delete<Object>(`${this.baseApiUrl}/${projectId}`);
  }
}
