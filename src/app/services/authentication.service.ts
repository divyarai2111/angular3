import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/from';
@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {

  }

  authenticateUser(data) {
    return this.httpClient.post("http://localhost:3000/auth/v1/", data);

  }

  setBearerToken(token) {
    localStorage.setItem("token", token);

  }

  getBearerToken() {
    return localStorage.getItem("token");

  }

  isUserAuthenticated(token): Promise<any> {
    return this.httpClient.post("http://localhost:3000/auth/v1/isAuthenticated", {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).pipe(map(res => res['isAuthenticated'])).toPromise();
  }


}
