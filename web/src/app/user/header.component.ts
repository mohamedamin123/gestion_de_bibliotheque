import { Component } from '@angular/core';
import { EmpruntService } from '../shared/services/emprunter.service';
import { LoginService } from '../shared/services/login.service';
import { ReservationService } from '../shared/services/reservation.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet,Router } from '@angular/router';
import { RoundPipe } from '../round.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, CommonModule, FormsModule, RoundPipe, HeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  name: string | null = null;
  loginService: LoginService;
  router: Router;
  emprunt: EmpruntService;
  reserver: ReservationService;

  constructor(loginService: LoginService, router: Router, emprunt: EmpruntService, reserver: ReservationService) {
    this.loginService = loginService;
    this.router = router;
    this.name = this.loginService.name; // Set the member's name if logged in
    this.emprunt = emprunt;
    this.reserver = reserver;

    // Check if the user is authenticated, if not redirect to the login page
    if (!this.loginService.getEmail() || !this.loginService.name) {
      this.router.navigate(['/login']); // Redirect to login if member does not exist
      return; // Stop further execution if not authenticated
    }
  }
  logout() {
    this.loginService.clearCredentials();
    this.router.navigateByUrl('/login', { replaceUrl: true }); // Replaces current state in history
  }
}
