import { CVService } from './../../services/cv.service';
import { ProjectService } from './../../services/project.service';
import { ProjectDetails } from './../../models/project-details.model';
import { CourseService } from './../../services/course.service';
import { CourseDetails } from './../../models/course-details.model';
import { DegreeService } from './../../services/degree.service';
import { DegreeDetails } from './../../models/degree-details.model';
import { SkillService } from './../../services/skill.service';
import { SkillDetails } from './../../models/skill-details.model';
import { WorkExperienceService } from './../../services/work-experience.service';
import { WorkExperienceDetails } from './../../models/work-experience-details.model';
import { SocialLinksService } from './../../services/social-links.service';
import { SocialLinks } from './../../models/social-links.model';
import { SummaryService } from './../../services/summary.service';
import { ProfileService } from './../../services/profile.service';
import { Summary } from './../../models/summary.model';
import { Profile } from './../../models/profile.model';
import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit{
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  profile: Profile = {
    fullName: '',
    email: '',
    address: '',
    phoneNo: ''
  }
  summary: Summary = {
    description: ''
  }
  socialLinks: SocialLinks = {
    linkedinUrl: '',
    githubUrl: ''
  }
  workExperiences: WorkExperienceDetails[] = [];
  skills: SkillDetails[] = [];
  degrees: DegreeDetails[] = [];
  courses: CourseDetails[] = [];
  projects: ProjectDetails[] = [];

  constructor(private profileService: ProfileService, private socialLinksService: SocialLinksService, private summaryService: SummaryService, private workExperienceService: WorkExperienceService, private skillService: SkillService, private degreeService: DegreeService, private courseService: CourseService, private projectService: ProjectService, private cvService: CVService){}
  
  ngOnInit(): void {
    this.getProfile();
    this.getSocialLinks();
    this.getSummary();
    this.getWorkExperiences();
    this.getSkills();
    this.getDegrees();
    this.getCourses();
    this.getProjects();
  }
  getProjects() {
    this.projectService.getProjects().subscribe({
      next: (result) =>{
        this.projects = result;
      }
    })
  }
  getCourses() {
    this.courseService.getCourses().subscribe({
      next: (result) =>{
        this.courses = result;
      }
    })
  }
  getDegrees() {
    this.degreeService.getAllDegrees().subscribe({
      next: (result) =>{
        this.degrees = result
      }
    })
  }
  getSkills() {
    this.skillService.getSkills().subscribe({
      next: (result) =>{
        this.skills = result
      }
    })
  }

  getProfile(){
    this.profileService.getProfile().subscribe({
      next: (result) =>{
        this.profile.address = result.address;
        this.profile.email = result.email;
        this.profile.fullName = result.fullName;
        this.profile.phoneNo = result.phoneNo
      }
    })
  }

  getSocialLinks(){
    this.socialLinksService.getSocialLinks().subscribe({
      next: (result) =>{
        this.socialLinks.githubUrl = result.githubUrl;
        this.socialLinks.linkedinUrl = result.linkedinUrl;
      }
    })
  }

  getSummary(){
    this.summaryService.getSummary().subscribe({
      next: (result) =>{
        this.summary.description = result.description
      }
    })
  }

  getWorkExperiences(){
    this.workExperienceService.getAllWorkExperiences().subscribe({
      next: (result) =>{
        this.workExperiences = result;
        this.getTasks();
        this.processDate()
      }
    })
  }
  processDate() {
    for (let item of this.workExperiences){
      if (item.startDate !="Present"){
        let date = new Date(item.startDate);
        let month = date.getMonth();
        let year = date.getFullYear();
        item.startDate = `${this.months[month]} ${year}`
      }
      
      if (item.endDate !="Present"){
        let date = new Date(item.endDate);
        let month = date.getMonth();
        let year = date.getFullYear();
        item.endDate = `${this.months[month]} ${year}`

      }
    }
  }

  getTasks(){
    for (let item of this.workExperiences){
      let tasks = item.description.split('#');
      item.tasks = tasks 
    }
  }

  printPdf(){
    this.cvService.downloadCV().subscribe({
      next: (result) =>{
        let blob: Blob = result.body as Blob;
        let url = window.URL.createObjectURL(blob);
        
        let a = document.createElement('a');
        a.download = 'cv.pdf';
        a.href = url;
        a.click()
      }
    })
  }
}
