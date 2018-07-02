import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map,filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http:Http) { 

    console.log('Data Service connected...')
  }
  getPosts(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts1232')
      .pipe(map(res => res.json()));
  }

}
