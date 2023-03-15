import { ToastrService } from 'ngx-toastr';
import { CourseService } from './../../services/course.service';
import { CourseDetails } from './../../models/course-details.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit{
  courses: CourseDetails[] = [];
  itemId: number = 0;

  constructor(private courseService: CourseService, private toastr: ToastrService){}
  
  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(){
    this.courseService.getCourses()
    .subscribe({
      next: (result) =>{
        this.courses = result
      }
    })
  }

  onDelete(id: any){
    this.itemId = id;
  }

  onConfirm(){
    this.courseService.deleteCourse(this.itemId).subscribe({
      next: (result) =>{
        this.toastr.success('Course Deleted Successfully', 'CV Maker', {
          timeOut: 2000
        })
        this.ngOnInit();
      }
    })
  }

}
