import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-bibliothecaire',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './home-bibliothecaire.component.html',
  styleUrl: './home-bibliothecaire.component.css'
})
export class HomeBibliothecaireComponent {

  constructor(private router: Router) { }

  logout() {
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
