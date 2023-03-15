import { ToastrService } from 'ngx-toastr';
import { JobDescription } from './../../models/job-description.model';
import { WorkExperience } from './../../models/work-experience.model';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkExperienceService } from 'src/app/services/work-experience.service';
import OktaAuth from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-edit-work-experience',
  templateUrl: './edit-work-experience.component.html',
  styleUrls: ['./edit-work-experience.component.css']
})
export class EditWorkExperienceComponent implements OnInit{
  userName: any;
  updateWorkExperience: WorkExperience = {
    designation: '',
    company: '',
    description: '',
    startDate: '',
    endDate: ''
  }
  currentlyWorking: boolean = false;
  tasks: JobDescription[] = [];
  id: number = 0;
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private workExperienceService: WorkExperienceService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService){}
  
  async ngOnInit(){
    let userClaims = await this.oktaAuth.getUser();
    this.userName = userClaims.name;
    this.route.paramMap.subscribe({
      next: (params) =>{
        this.id = Number(params.get('id'))
      }
    })
    this.getWorkExperience();
  }

  getWorkExperience(){
    this.workExperienceService.getWorkExperienceById(this.id).subscribe({
      next: (result) =>{
        this.updateWorkExperience.company = result.company;
        this.updateWorkExperience.description = result.description;
        this.updateWorkExperience.designation = result.designation;
        this.updateWorkExperience.startDate = result.startDate;
        this.updateWorkExperience.endDate = result.endDate;
        this.currentlyWorking = this.updateWorkExperience.endDate == "Present" ? true : false;
        this.getTasks();
      }
    })
  }
  getTasks() {
    let tasks = this.updateWorkExperience.description.split('#');

    for (let task of tasks){
      let jobDescription: JobDescription = {
        description: task
      }
      this.tasks.push(jobDescription);
    }
  }

  onCurrentlyWorkingChange(){
    if (this.currentlyWorking){
      this.updateWorkExperience.endDate = "Present";
    }
    else{
      this.updateWorkExperience.endDate = "";
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
    this.updateWorkExperience.description = this.getDescription();
    this.workExperienceService.updateWorkExperience(this.id, this.updateWorkExperience).subscribe({
      next: (result) =>{
        this.router.navigate(['/workexperiences']).then(() =>{
          this.toastr.success('Work Experience Updated Successfully', 'CV Maker', {
            timeOut: 2000
          })
        })
      }
    }) 
    
  }
}
