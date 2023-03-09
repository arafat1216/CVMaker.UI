import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Degree } from '../models/degree.model';
import { DegreeDetails } from '../models/degree-details.model';

@Injectable({
  providedIn: 'root'
})
export class DegreeService {

  baseApiUrl: string = "https://localhost:7275/api/Degrees";

  constructor(private httpClient: HttpClient) { }

  getAllDegrees(): Observable<DegreeDetails[]>{
    return this.httpClient.get<DegreeDetails[]>(this.baseApiUrl);
  }

  getDegreeById(degreeId: number): Observable<DegreeDetails>{
    return this.httpClient.get<DegreeDetails>(`${this.baseApiUrl}/${degreeId}`);
  }

  addDegree(addDegree: Degree):Observable<DegreeDetails>{
    return this.httpClient.post<DegreeDetails>(this.baseApiUrl, addDegree);
  }

  updateDegree(degreeId: number, updateDegree: Degree): Observable<DegreeDetails>{
    return this.httpClient.put<DegreeDetails>(`${this.baseApiUrl}/${degreeId}`, updateDegree);
  }

  deleteDegree(degreeId: number): Observable<Object>{
    return this.httpClient.delete<Object>(`${this.baseApiUrl}/${degreeId}`);
  }
}
