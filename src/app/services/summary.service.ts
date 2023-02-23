import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Summary } from '../models/summary.model';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  baseApiUrl: string = "https://localhost:7275/api/Summary";

  constructor(private httpClient: HttpClient) { }

  getSummary(): Observable<Summary>{
    return this.httpClient.get<Summary>(this.baseApiUrl);
  }

  updateSummary(summary: Summary): Observable<Summary>{
    return this.httpClient.post<Summary>(this.baseApiUrl, summary);
  }
}
