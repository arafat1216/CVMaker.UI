import { ToastrService } from 'ngx-toastr';
import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 userName:any
 
 constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private toastr: ToastrService) {}
  async ngOnInit() {
    let userclaims = await this.oktaAuth.getUser();
    this.userName  = userclaims.name
  }

}
