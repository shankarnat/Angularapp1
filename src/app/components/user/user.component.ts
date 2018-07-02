import { Component, OnInit } from '@angular/core';
import {  DataService }  from '../../services/data.service';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name:string = 'John Doe';
  age:number;
  email:string;
  address:Address;
  address_list;
  hobbies:string[];
  posts:Post[]
  chunks:Chunks_info
  chunk_info:Chunks[]
  corrected_chunk_list:Corrected_Chunks[]
  isEdit:Boolean = false;
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource;
  constructor(private dataService:DataService) {


   }

  ngOnInit() {
    this.name = 'John Doe';
    this.age = 30;
    this.email = 'shankar@outlook.com';
    this.address = {
      street:'50 Main St',
      city:'Hyd',
      state:'TG'
    }
    this.address_list = [
      { street:'50 Main St',
      city:'Hyd',
      state:'TG'},
      { street:'50 Main St',
      city:'Hyd',
      state:'TG'}
    ]
    this.corrected_chunk_list = [];
    
    this.displayedColumns =['version','user_ref_name','start_date', 'end_date','step_status']
    this.hobbies = ['write code','read books'];
    this.chunks = {'chunks_info':[
      {
        'version': 234,
        'user_ref_name': 'shankar.natarajan',
        'start_date': 'yyyy',
        'end_date': 'dddd',
        'step_status':[{
          'step_name':'new_step'},
          {
            'step_name':'new_step1'}]
       
      }
    ]}
    this.chunk_info = this.chunks.chunks_info;
    for (let current_row of this.chunks['chunks_info']){  
       for (let current_step of current_row.step_status){
         this.corrected_chunk_list.push( {
           'version': current_row.version,
           'user_ref_name': current_row.user_ref_name,
           'start_date': current_row.start_date,
           'end_date': current_row.end_date,
           'step_status': current_step.step_name
         });
         console.log(this.corrected_chunk_list);
       }
    }
    console.log(this.corrected_chunk_list);
    this.dataSource=this.corrected_chunk_list;


    /*interval(5000).pipe(startWith(0),switchMap(() => this.dataService.getPosts())).subscribe(
      (res) => {
        console.log(res)
      }
    ) */
    this.dataService.getPosts().subscribe(
      result => {
      this.posts = result
      console.log(this.posts)
      },
      error => {
        console.log("Hello")
      }
    
  );
    console.log(this.chunks)
    console.log(this.chunk_info)
    }
    onClick(){
      this.name = "Shankar";
      this.hobbies.push('New Hobby');
    }
    addHobby(hobby){
      this.hobbies.push(hobby);
      return false;
    }
    toggleEdit(){
      this.isEdit = !this.isEdit;
    }
  }

interface Address {
  street:string,
  city:string,
  state:string

}
interface Post{
  id:number,
  title:string,
  body:string,
  userId:number
}

interface Chunks_info{
  chunks_info:Chunks[]
}

interface Chunks{
  version:number,
  user_ref_name:string,
  start_date:string,
  end_date:string,
  step_status:status[]
}

interface Corrected_Chunks{
  version:number,
  user_ref_name:string,
  start_date:string,
  end_date:string,
  step_status:string
}

interface status{
  step_name:string
}

