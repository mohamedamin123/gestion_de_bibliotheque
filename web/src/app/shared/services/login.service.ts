import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Member } from '../models/member';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private email: string | null = null;
  private password: string | null = null;
  private member: Member | null = null;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    // Load credentials from session storage if available
    this.loadCredentials();
  }

  setCredentials(email: string, password: string, member: Member): void {
    this.email = email;
    this.password = password;
    this.member = member;

    // Store credentials in session storage if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('password', password);
      sessionStorage.setItem('member', JSON.stringify(member));
    }
  }

  getEmail(): string | null {
    return this.email;
  }

  getPassword(): string | null {
    return this.password;
  }

  getMember(): Member | null {
    return this.member;
  }

  clearCredentials(): void {
    this.email = null;
    this.password = null;
    this.member = null;

    // Remove credentials from session storage if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('password');
      sessionStorage.removeItem('member');
    }
  }

  private loadCredentials(): void {
    // Only load from session storage if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.email = sessionStorage.getItem('email');
      this.password = sessionStorage.getItem('password');
      const memberData = sessionStorage.getItem('member');
      this.member = memberData ? JSON.parse(memberData) : null;
    }
  }
}
