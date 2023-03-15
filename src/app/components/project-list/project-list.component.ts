import { ToastrService } from 'ngx-toastr';
import { ProjectService } from './../../services/project.service';
import { ProjectDetails } from './../../models/project-details.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: ProjectDetails[] = [];
  itemId: number = 0;

  constructor(private projectService: ProjectService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(){
    this.projectService.getProjects()
    .subscribe({
      next: (result) =>{
        this.projects = result;
      }
    })
  }

  onDelete(id: any){
    this.itemId = id;
    console.log(this.itemId);
  }

  onConfirm(){
    this.projectService.deleteProject(this.itemId).subscribe({
      next: (result) =>{
        this.toastr.success('Project Deleted Successfully', 'CV Maker', {
          timeOut: 2000
        })
        this.ngOnInit();
      }
    })
  }

}
