import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private apiUrl = environment.backendURL;

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/addNewUser`, userData);
  }
}
