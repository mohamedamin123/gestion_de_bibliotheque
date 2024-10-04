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
    // Load credentials from local storage if available
    this.loadCredentials();
  }

  setCredentials(email: string, password: string, member: Member): void {
    this.email = email;
    this.password = password;
    this.member = member;

    // Store credentials in local storage if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('member', JSON.stringify(member));
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

    // Remove credentials from local storage if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('member');
    }
  }

  private loadCredentials(): void {
    // Only load from local storage if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.email = localStorage.getItem('email');
      this.password = localStorage.getItem('password');
      const memberData = localStorage.getItem('member');
      this.member = memberData ? JSON.parse(memberData) : null;
    }
  }
}
