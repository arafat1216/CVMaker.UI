import { ProjectService } from './../../services/project.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import OktaAuth from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit{
  
  userName: any;
  addProject: Project = {
    name: '',
    description: '',
    link: ''
  }

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private projectService: ProjectService, private router: Router){}

  async ngOnInit() {
    let userClaims = await this.oktaAuth.getUser();
    this.userName = userClaims.name;
  }

  onSubmit(){
    this.projectService.addProject(this.addProject)
    .subscribe({
      next: (result) =>{
        this.router.navigate(['/projects']);
      }
    })
  }

}
