import { EducationService } from './../../services/education.service';
import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/models/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit{
  educationDetails: Education[] = [];
  i = 1;
  constructor(private educationService:EducationService){}

  ngOnInit(): void {
    this.educationDetails = this.educationService.getEducationDetails();
  }
}
