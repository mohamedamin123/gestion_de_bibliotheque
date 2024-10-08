import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../../shared/services/login.service';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {
  constructor(private router: Router,private loginService:LoginService) {
    if (!this.loginService.getEmail() || !this.loginService.name) {
      this.router.navigate(['/login']); // Redirect to login if Auther does not exist
      return; // Stop further execution if not authenticated
    }
  }

  logout() {
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
