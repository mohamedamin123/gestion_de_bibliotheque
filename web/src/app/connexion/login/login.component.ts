import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink,RouterOutlet], // Removed RouterLink and RouterOutlet
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Fixed property name from 'styleUrl' to 'styleUrls'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*+-]).*'), // At least one number and one special character
        ],
      ],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle successful login logic here
      this.router.navigate(['/register']); // ou n'importe quelle autre route
    } else {
      // Handle form errors if needed
      console.log('Form is invalid');
    }
  }
}
