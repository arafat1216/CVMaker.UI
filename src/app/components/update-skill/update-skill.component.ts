import { ToastrService } from 'ngx-toastr';
import { Skill } from './../../models/skill.model';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-update-skill',
  templateUrl: './update-skill.component.html',
  styleUrls: ['./update-skill.component.css']
})
export class UpdateSkillComponent implements OnInit {
  userName: any
  updateSkill: Skill = {
    name: ''
  }
  id: number = 0;
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private skillService: SkillService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService){}
  
  async ngOnInit(){
    let userclaims = await this.oktaAuth.getUser();
    this.userName  = userclaims.name;
    this.route.paramMap.subscribe({
      next:(params) =>{
        this.id = Number(params.get('id'));
      }
    })
    this.getSkill();
    
  }

  onSubmit(){
    this.skillService.updateSkill(this.id, this.updateSkill).subscribe({
      next:(result) =>{
        this.router.navigate(['/skills']).then(() =>{
          this.toastr.success('Skill Update Successfully', 'CV Maker', {
            timeOut: 2000
          })
        });
      }
    })
  }

  getSkill(){
    this.skillService.getSkillById(this.id)
    .subscribe({
      next:(result)=>{
        this.updateSkill.name = result.name
      }
    })
  }
}
