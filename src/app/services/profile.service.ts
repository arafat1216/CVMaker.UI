import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseApiUrl:string = "https://localhost:7275/api/Profile"

  constructor(private httpClient: HttpClient) { }

  getProfile(): Observable<Profile>{
    return this.httpClient.get<Profile>(this.baseApiUrl)
  }

  updateProfile(profile:Profile): Observable<Profile>{
    return this.httpClient.post<Profile>(this.baseApiUrl, profile)
  }
}
