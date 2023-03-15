import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DegreeService } from './../../services/degree.service';
import { Degree } from './../../models/degree.model';
import { Component, OnInit, Inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-edit-degree',
  templateUrl: './edit-degree.component.html',
  styleUrls: ['./edit-degree.component.css']
})
export class EditDegreeComponent implements OnInit{
  
  userName: any;
  updateDegree: Degree = {
    name: '',
    subject: '',
    institute: '',
    startYear: '',
    endYear: ''
  }
  currentlyStudying: boolean = false;
  id: number = 0;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private degreeService: DegreeService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService){}
  
  async ngOnInit(){
    let userClaims = await this.oktaAuth.getUser();
    this.userName = userClaims.name;
    this.route.paramMap.subscribe({
      next: (params) =>{
        this.id = Number(params.get('id'));
      }
    })
    this.getDegree();    
  }

  getDegree(){
    this.degreeService.getDegreeById(this.id).subscribe({
      next: (result) =>{
        this.updateDegree.name = result.name;
        this.updateDegree.subject = result.subject;
        this.updateDegree.institute = result.institute;
        this.updateDegree.startYear = result.startYear;
        this.updateDegree.endYear = result.endYear;
        this.currentlyStudying = result.endYear == "Present" ? true : false;
      }
    })
  }

  onCurrentlyStudyingChange(){
    if (this.currentlyStudying){
      this.updateDegree.endYear = "Present";
    }
    else{
      this.updateDegree.endYear = '';
    }
  }

  onSubmit(){
    this.updateDegree.startYear = String(this.updateDegree.startYear);
    this.updateDegree.endYear = String(this.updateDegree.endYear);
    this.degreeService.updateDegree(this.id, this.updateDegree).subscribe({
      next: (result) =>{
        this.router.navigate(['/degrees']).then(() =>{
          this.toastr.success('Degree Updated Successfully', 'CV Maker', {
            timeOut: 2000
          })
        });
      }
    })
  }

}
