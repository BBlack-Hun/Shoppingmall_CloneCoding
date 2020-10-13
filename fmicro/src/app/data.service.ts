import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http:HttpClient
  ) { }

  getRealestate():Observable<string[]>{
    return this.http.get<string[]>('/api/realestate/')
  }

  getlist(category):Observable<string[]>{
    return this.http.get<string[]>('/api/realestate/'+category)
  }

  getdetail(id):Observable<string[]>{
    return this.http.get<string[]>('/api/realestate/'+id)
  }
}
