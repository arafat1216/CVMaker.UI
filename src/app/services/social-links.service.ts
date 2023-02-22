import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialLinks } from '../models/social-links.model';

@Injectable({
  providedIn: 'root'
})
export class SocialLinksService {

  baseApiUrl: string = "https://localhost:7275/api/SocialLinks"

  constructor(private httpClient: HttpClient) { }

  getSocialLinks(): Observable<SocialLinks>{
    return this.httpClient.get<SocialLinks>(this.baseApiUrl);
  }
  
  updateSocialLinks(socialLinks:SocialLinks): Observable<SocialLinks>{
    return this.httpClient.post<SocialLinks>(this.baseApiUrl, socialLinks);
  }
}
