import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CVService {

  baseApiUrl: string = "https://localhost:7275/api/CV";

  constructor(private httpClient: HttpClient) { }

  downloadCV(){
    return this.httpClient.get(this.baseApiUrl, {observe: 'response', responseType:'blob'});
  }
}
