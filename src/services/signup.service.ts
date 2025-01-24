import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private apiUrl = 'http://localhost:3000/api/users/addNewUser';

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
}
