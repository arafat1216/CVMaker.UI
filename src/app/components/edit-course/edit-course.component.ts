import { ToastrService } from 'ngx-toastr';
import { CourseService } from './../../services/course.service';
import { Course } from './../../models/course.model';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import OktaAuth from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  
  userName: any;
  updateCourse: Course = {
    name: '',
    institute: '',
    link: ''
  }
  id: number = 0;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private courseService: CourseService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService){}
  
  async ngOnInit(){
    let userClaims = await this.oktaAuth.getUser();
    this.userName = userClaims.name;
    this.route.paramMap.subscribe({
      next: (params) =>{
        this.id = Number(params.get('id'));
      }
    })
    this.getCourse();
  }

  onSubmit(){
    this.courseService.updateCourse(this.id, this.updateCourse)
    .subscribe({
      next: (result) =>{
        this.router.navigate(['/courses']).then(() =>{
          this.toastr.success('Course Updated Successfully', 'CV Maker', {
            timeOut: 2000
          })
        });
      }
    })
  }

  getCourse() {
    this.courseService.getCourseById(this.id)
    .subscribe({
      next: (result) =>{
        this.updateCourse.name = result.name;
        this.updateCourse.institute = result.institute;
        this.updateCourse.link = result.link;
      }
    })
  }

}
