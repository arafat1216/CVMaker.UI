import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import OktaAuth from '@okta/okta-auth-js';
import { OktaAuthModule } from '@okta/okta-angular';
import { OKTA_CONFIG } from '@okta/okta-angular';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { EducationComponent } from './components/education/education.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { SummaryComponent } from './components/summary/summary.component';

const config = {
  issuer: 'https://dev-64581829.okta.com/oauth2/default',
  clientId: '0oa8cfkn13OUIHcMz5d7',
  redirectUri: 'http://localhost:4200/login/callback',
  scopes: ['openid', 'profile', 'email'],
}

const oktaAuth = new OktaAuth(config);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavComponent,
    DashboardComponent,
    ProfileComponent,
    EducationComponent,
    SocialLinksComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: OKTA_CONFIG,
      useValue: {oktaAuth}
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
