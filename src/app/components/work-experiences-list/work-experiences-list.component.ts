import { ToastrService } from 'ngx-toastr';
import { WorkExperienceService } from './../../services/work-experience.service';
import { WorkExperienceDetails } from './../../models/work-experience-details.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-experiences-list',
  templateUrl: './work-experiences-list.component.html',
  styleUrls: ['./work-experiences-list.component.css']
})
export class WorkExperiencesListComponent implements OnInit{
  workExperiences: WorkExperienceDetails[] = [];
  itemId: number = 0;

  constructor(private workExperienceService: WorkExperienceService, private toastr: ToastrService){}

  ngOnInit() {
    this.getWorkExperiences();
  }
  

  getWorkExperiences(){
    this.workExperienceService.getAllWorkExperiences().subscribe({
      next: (result) =>{
        this.workExperiences = result;
        this.getTasks();
      }
    })
    
  }
  

  getTasks(){
    for(let item of this.workExperiences){
      let tasks = item.description.split('#');
      item.tasks = tasks
    }
  }

  onDelete(id: any){
    this.itemId = id;
  }

  onConfirm(){
    this.workExperienceService.deleteWorkExperience(this.itemId).subscribe({
      next: (result) =>{
        this.toastr.success('Work Experience Deleted Successfully', 'CV Maker', {
          timeOut:2000
        });
        this.ngOnInit();  
        
      }
    })
  }
}
