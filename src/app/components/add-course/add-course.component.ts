import { Router } from '@angular/router';
import { Course } from './../../models/course.model';
import { CourseService } from './../../services/course.service';
import { Component, OnInit, Inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  userName: any;
  addCourse: Course = {
    name: '',
    institute: '',
    link: ''
  }

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private courseservice: CourseService, private router: Router){}
  
  async ngOnInit() {
    let userClaims = await this.oktaAuth.getUser();
    this.userName = userClaims.name;
  }

  onSubmit(){
    this.courseservice.addCourse(this.addCourse)
    .subscribe({
      next: (result) =>{
        this.router.navigate(['/courses']);
      }
    })
  }

}
