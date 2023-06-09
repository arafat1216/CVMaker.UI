import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SkillService } from './../../services/skill.service';
import { SkillDetails } from './../../models/skill-details.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit{
  skills: SkillDetails[] = [];
  itemId:number = 0;
  constructor(private skillService: SkillService, private toastr: ToastrService){}
  ngOnInit(): void {
    this.getSkills();
  }

  getSkills(){
    this.skillService.getSkills()
    .subscribe({
      next: (result) =>{
        this.skills = result
      }
    })
  }

  onDelete(event:any){
    this.itemId = event;
  }

  onConfirm(){
    this.skillService.deleteSkill(this.itemId).subscribe({
      next:(result)=>{
        this.toastr.success('Skill Deleted Successfully', 'CV Maker', {
          timeOut: 2000
        })
        this.ngOnInit();
      }
    })
  }

}
