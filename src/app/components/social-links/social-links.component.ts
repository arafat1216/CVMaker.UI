import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { SocialLinks } from 'src/app/models/social-links.model';
import { SocialLinksService } from 'src/app/services/social-links.service';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.css']
})
export class SocialLinksComponent implements OnInit {
  userName: any = '';

  socialLinks: SocialLinks = {
    linkedinUrl: '',
    githubUrl: ''
  };

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private socialLinksService: SocialLinksService, private router: Router, private toastr: ToastrService){}

  async ngOnInit(){
    let userclaims = await this.oktaAuth.getUser();
    this.userName  = userclaims.name;
    this.getSocialLinks();
  }
  
  onSubmit(){
    this.socialLinksService.updateSocialLinks(this.socialLinks).subscribe({
      next:(result) =>{
        this.router.navigate(['/dashboard']).then(()=>{
          this.toastr.success('Social Links Updated Successfully', 'CV Maker', {
            timeOut: 2000
          })
        });
      }
    })
    
  }

  private getSocialLinks(){
    this.socialLinksService.getSocialLinks().subscribe({
      next: (result) =>{
        this.socialLinks = result;
      }
    })
  }

  
}
