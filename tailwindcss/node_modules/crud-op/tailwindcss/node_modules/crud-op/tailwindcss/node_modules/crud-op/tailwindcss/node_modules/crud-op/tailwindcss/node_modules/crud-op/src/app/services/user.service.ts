import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponses, IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   apiURL = 'http://localhost:4000/user/';
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ApiResponses<IUser[]>> {

    return this.httpClient.get<ApiResponses<IUser[]>>(this.apiURL);

  }

  getUser(id:string): Observable<ApiResponses<IUser>> {

    return this.httpClient.get<ApiResponses<IUser>>(this.apiURL+id);
  }

  create(user:IUser): Observable<ApiResponses<IUser>> {

    return this.httpClient.post<ApiResponses<IUser>>(this.apiURL,user);

  }

  

  update(id:string, user:IUser): Observable<ApiResponses<IUser>> {

    return this.httpClient.put<ApiResponses<IUser>>(this.apiURL+id,user);

  }

  delete(id:string):Observable<ApiResponses<IUser>>{
    return this.httpClient.delete<ApiResponses<IUser>>(this.apiURL+id);

  }
}
