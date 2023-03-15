import { ToastrService } from 'ngx-toastr';
import { Project } from './../../models/project.model';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import OktaAuth from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  userName: any;
  updateProject: Project = {
    name: '',
    description: '',
    link: ''
  }
  id: number = 0;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private projectService: ProjectService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService){}
  
  async ngOnInit(){
    let userClaims = await this.oktaAuth.getUser();
    this.userName = userClaims.name;
    this.route.paramMap.subscribe({
      next: (params) =>{
        this.id = Number(params.get('id'));
      }
    })
    this.getProject();
  }

  onSubmit(){
    this.projectService.updateProject(this.id, this.updateProject)
    .subscribe({
      next: (result) =>{
        this.router.navigate(['/projects']).then(() =>{
          this.toastr.success('Project Updated Successfully', 'CV Maker', {
            timeOut: 2000
          })
        });
      }
    })
  }

  getProject(){
    this.projectService.getProjectById(this.id)
    .subscribe({
      next: (result) =>{
        this.updateProject.name = result.name;
        this.updateProject.description = result.description;
        this.updateProject.link = result.link;
      }
    })
  }

}
