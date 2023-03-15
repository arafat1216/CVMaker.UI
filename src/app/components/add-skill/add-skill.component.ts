import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SkillService } from './../../services/skill.service';
import { Skill } from './../../models/skill.model';
import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit{

  userName: any;
  addSkill: Skill = {
    name: ''
  }
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private skillService: SkillService, private router: Router, private toastr: ToastrService){}
  async ngOnInit(){
    let userclaims = await this.oktaAuth.getUser();
    this.userName  = userclaims.name;
  }

  onSubmit(){
    this.skillService.addSkill(this.addSkill)
    .subscribe({
      next:(result) =>{
        this.router.navigate(['/skills']).then(()=>{
          this.toastr.success('Skill Added Successfully', 'CV Maker', {
            timeOut: 2000
          })
        });
      }
    })
  }
}
