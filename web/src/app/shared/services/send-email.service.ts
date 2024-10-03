import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Define the structure for the email data
export interface Email {
  to: string;
  subject?: string;
  body?: string;
  code?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  private apiUrl = `${environment.apiUrl}util/send-email`; // API endpoint

  constructor(private http: HttpClient) {}

  // Function to send the email
  sendEmail(email: Email): Observable<any> {
    return this.http.post<any>(this.apiUrl, email);
  }
}
