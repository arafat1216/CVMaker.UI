import { JobDescription } from './../../models/job-description.model';
import { WorkExperience } from './../../models/work-experience.model';
import { Component, Inject, OnInit } from '@angular/core';
import { WorkExperienceService } from 'src/app/services/work-experience.service';
import { Router } from '@angular/router';
import OktaAuth from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-work-experience',
  templateUrl: './add-work-experience.component.html',
  styleUrls: ['./add-work-experience.component.css']
})
export class AddWorkExperienceComponent implements OnInit{
  userName: any;
  addWorkExperience: WorkExperience = {
    designation: '',
    company: '',
    description: '',
    startDate:'',
    endDate: ''
  }
  currentlyWorking: boolean = false;
  tasks: JobDescription[] = [{
    description: ''
  }];

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private workExperienceService: WorkExperienceService, private router: Router, private toastr: ToastrService){}
  
  async ngOnInit() {
    let userClaims = await this.oktaAuth.getUser();
    this.userName = userClaims.name;
  }

  onCurrentlyWorkingChange(){
    if (this.currentlyWorking){
      this.addWorkExperience.endDate = "Present";
    }
    else{
      this.addWorkExperience.endDate = "";
    }
  }

  addTask($event:any){
    $event.preventDefault();
    let task: JobDescription = {
      description: ''
    }

    this.tasks.push(task);
  }

  removeTask(index: number){
    this.tasks.splice(index,1);
  }

  getDescription(){
    let jobTasks: string[] = [];
    
    for(let item of this.tasks){
      jobTasks.push(item.description);
    }

    return jobTasks.join('#');
  }

  onSubmit(){
    this.addWorkExperience.description = this.getDescription();
    this.workExperienceService.addWorkExperience(this.addWorkExperience).subscribe({
      next: (result) =>{
        this.router.navigate(['/workexperiences']).then(()=>{
          this.toastr.success('Work Experience Added Successfully', 'CV Maker', {
            timeOut:2000
          })
        })
      }
    }) 
    
  }
}
