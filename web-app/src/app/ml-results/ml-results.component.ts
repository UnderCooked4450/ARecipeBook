import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  NgIf,NgFor,UpperCasePipe,} from '@angular/common'
import {FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment'; 

@Component({
  selector: 'app-ml-results',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,],
  templateUrl: './ml-results.component.html',
  styleUrl: './ml-results.component.css'
})
export class MlResultsComponent {
  constructor(private http: HttpClient ,private router: Router, private _route: ActivatedRoute) {}

  public imageData: any;
  public dataImage: any;
  private baseUrl = environment.apiUrl;
  public dataurl: any;
  public foodlist: any;

  
ngOnInit(){
  this._route.params.subscribe((params)=>{
    this.imageData=params
    this.dataurl={image: this.imageData._imageAsBase64}
   })
   this.http.post(`${this.baseUrl}/lensapi/`, this.dataurl).subscribe({
    next: (value:any) => {
      this.dataImage=value
      this.foodlist=value.list['Food'];  
      console.log(this.foodlist) 
      if(this.foodlist==undefined || this.foodlist.length<1)
      {
        alert('Please bring the food into view')
        this.router.navigate(["camera"])
      }  
    },
    error: error => {
      console.error('erro1:', error);
      if (error.error && error.error.message) {
        alert(error.error.message);
      } else {
        alert('error2');
        console.log(error)
      }
    }
  })
}
  home(){
    this.router.navigate(["/homepage"])
  }

}
