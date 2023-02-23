import { Summary } from './../../models/summary.model';
import { SocialLinks } from './../../models/social-links.model';
import { SummaryService } from './../../services/summary.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import OktaAuth from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  userName: any;

  socialLinks: SocialLinks = {
    linkedinUrl: '',
    githubUrl: ''
  };
  summary: Summary = {
    description:''
  } 
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private summaryService: SummaryService, private router: Router){}
  
  async ngOnInit(){
    let userclaims = await this.oktaAuth.getUser();
    this.userName  = userclaims.name;
    this.getSummary();
  }

  onSubmit(){
    this.summaryService.updateSummary(this.summary)
    .subscribe({
      next:(result)=>{
        this.router.navigate(['/dashboard']);
      }
    })
  }

  getSummary(){
    this.summaryService.getSummary()
    .subscribe({
      next: (result) =>{
        this.summary = result;
      }
    })
  }
}
