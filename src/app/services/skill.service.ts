import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SkillDetails } from '../models/skill-details.model';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  baseApiUrl: string = "https://localhost:7275/api/Skills"

  constructor(private httpClient: HttpClient) { }

  getSkills(): Observable<SkillDetails[]>{
    return this.httpClient.get<SkillDetails[]>(this.baseApiUrl);
  }

  getSkillById(skillId: number): Observable<SkillDetails>{
    return this.httpClient.get<SkillDetails>(`${this.baseApiUrl}/${skillId}`);
  }

  addSkill(addSkillRequest: Skill): Observable<SkillDetails>{
    return this.httpClient.post<SkillDetails>(this.baseApiUrl, addSkillRequest);
  }

  updateSkill(skillId: number, updateSkillRequets: Skill): Observable<SkillDetails>{
    return this.httpClient.put<SkillDetails>(`${this.baseApiUrl}/${skillId}`, updateSkillRequets);
  }

  deleteSkill(skillId: number): Observable<Object>{
    return this.httpClient.delete<Object>(`${this.baseApiUrl}/${skillId}`);
  }

  
}
