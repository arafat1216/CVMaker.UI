import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DegreeService } from './../../services/degree.service';
import { Degree } from './../../models/degree.model';
import { Component, Inject, OnInit } from '@angular/core';
import OktaAuth from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-add-degree',
  templateUrl: './add-degree.component.html',
  styleUrls: ['./add-degree.component.css']
})
export class AddDegreeComponent implements OnInit{
  userName: any;
  addDegree: Degree = {
    name: '',
    subject: '',
    institute: '',
    startYear: '',
    endYear: ''
  }
  currentlyStudying: boolean = false;
  
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private degreeService: DegreeService, private router: Router, private toastr: ToastrService){}

  async ngOnInit(){
    let userClaims = await this.oktaAuth.getUser();
    this.userName = userClaims.name;
  }

  onCurrentlyStudyingChange(){
    if (this.currentlyStudying){
      this.addDegree.endYear = "Present";
    }
    else{
      this.addDegree.endYear = '';
    }
  }

  onSubmit(){
    this.addDegree.startYear = String(this.addDegree.startYear);
    this.addDegree.endYear = String(this.addDegree.endYear);
    this.degreeService.addDegree(this.addDegree).subscribe({
      next: (result) =>{
        this.router.navigate(['/degrees']).then(() =>{
          this.toastr.success('Degree Added Successfully', 'CV Maker', {
            timeOut: 2000
          })
        });
      }
    })
   
  }

}
