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
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { SummaryComponent } from './components/summary/summary.component';
import { SkillListComponent } from './components/skill-list/skill-list.component';
import { AddSkillComponent } from './components/add-skill/add-skill.component';
import { UpdateSkillComponent } from './components/update-skill/update-skill.component';
import { DeleteSkillComponent } from './components/delete-skill/delete-skill.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { DegreesListComponent } from './components/degrees-list/degrees-list.component';
import { AddDegreeComponent } from './components/add-degree/add-degree.component';
import { EditDegreeComponent } from './components/edit-degree/edit-degree.component';
import { WorkExperiencesListComponent } from './components/work-experiences-list/work-experiences-list.component';
import { AddWorkExperienceComponent } from './components/add-work-experience/add-work-experience.component';
import { EditWorkExperienceComponent } from './components/edit-work-experience/edit-work-experience.component';
import { PreviewComponent } from './components/preview/preview.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const config = {
  issuer: 'https://dev-64581829.okta.com/oauth2/default',
  clientId: '0oa8mzfnvxtTzLKVO5d7',
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
    SocialLinksComponent,
    SummaryComponent,
    SkillListComponent,
    AddSkillComponent,
    UpdateSkillComponent,
    DeleteSkillComponent,
    ProjectListComponent,
    AddProjectComponent,
    EditProjectComponent,
    CourseListComponent,
    AddCourseComponent,
    EditCourseComponent,
    DegreesListComponent,
    AddDegreeComponent,
    EditDegreeComponent,
    WorkExperiencesListComponent,
    AddWorkExperienceComponent,
    EditWorkExperienceComponent,
    PreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
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
