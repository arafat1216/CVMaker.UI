import { Course } from './../models/course.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseDetails } from '../models/course-details.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseApiUrl: string = "https://localhost:7275/api/Courses";

  constructor(private httpClient: HttpClient) { }

  getCourses(): Observable<CourseDetails[]>{
    return this.httpClient.get<CourseDetails[]>(this.baseApiUrl);
  }

  getCourseById(courseId: number): Observable<CourseDetails>{
    return this.httpClient.get<CourseDetails>(`${this.baseApiUrl}/${courseId}`);
  }

  addCourse(addCourseRequest: Course): Observable<CourseDetails>{
    return this.httpClient.post<CourseDetails>(this.baseApiUrl, addCourseRequest);
  }

  updateCourse(courseId: number, updateCourseRequest: Course): Observable<CourseDetails>{
    return this.httpClient.put<CourseDetails>(`${this.baseApiUrl}/${courseId}`, updateCourseRequest);
  }

  deleteCourse(courseId: number): Observable<Object>{
    return this.httpClient.delete<Object>(`${this.baseApiUrl}/${courseId}`);
  }
}
