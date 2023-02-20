import { Injectable } from '@angular/core';
import { Education } from '../models/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor() { }

  getEducationDetails(): Education[]{
     let education:Education[] = []

     let item1: Education = {
      id:1,
      degreeName:"Bachelor of Science",
      subject:"CSE",
      institute:"National University",
      startYear:'2016',
      endYear:'2020'
     }
     let item2: Education = {
      id:1,
      degreeName:"Higher Secondary School Certificate",
      subject:"Science",
      institute:"Daffodil College",
      startYear:'2013',
      endYear:'2015'
     }
     let item3: Education = {
      id:1,
      degreeName:"Secondary School Certificate",
      subject:"Science",
      institute:"B.C.I.C School",
      startYear:'2004',
      endYear:'2013'
     } 
     
     education.push(item1, item2, item3, item1, item2, item3);
     return education
  }
}
