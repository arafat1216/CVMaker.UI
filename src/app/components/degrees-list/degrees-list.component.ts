import { ToastrService } from 'ngx-toastr';
import { DegreeService } from './../../services/degree.service';
import { DegreeDetails } from './../../models/degree-details.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-degrees-list',
  templateUrl: './degrees-list.component.html',
  styleUrls: ['./degrees-list.component.css']
})
export class DegreesListComponent implements OnInit{

  degrees: DegreeDetails[] = [];
  itemId: number = 0;

  constructor(private degreeService: DegreeService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.getDegrees();
  }

  getDegrees(){
    this.degreeService.getAllDegrees().subscribe({
      next: (result) =>{
        this.degrees = result;
      }
    })
  }

  onDelete(id: any){
    this.itemId = id;
  }

  onConfirm(){
    this.degreeService.deleteDegree(this.itemId).subscribe({
      next: (result) =>{
        this.toastr.success('Degree Deleted Successfully', 'CV Maker', {
          timeOut: 2000
        })
        this.ngOnInit();
      }
    })
  }

}
