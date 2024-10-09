import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { MemberService } from '../../shared/services/member.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null; // Property to hold error messages

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private memberService: MemberService
  ) {
    this.loginService.clearCredentials();

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*+-]).*'),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value.trim();
      const password = this.loginForm.get('password')?.value.trim();

      this.loginService.login(email,password).subscribe({
        next: (response) => {
          if(response) {
            this.loginService.setCredentials(email, password, response);
            if(response.statut) {
              this.errorMessage = null; // Clear any previous error messages
              if(response.role=="MEMBER") {
                this.router.navigate(['/home-member']); // Navigate to home or any other route
              }else if(response.role=="AUTHER") {
                this.router.navigate(['/home-auther']); // Navigate to home or any other route

              }
              else if(response.role=="BIBLIOTHECAIRE"){
                this.router.navigate(['/home-bibliothecaire']); // Navigate to home or any other route

              }
              else if(response.role=="ADMIN"){
                this.router.navigate(['/home-admin']); // Navigate to home or any other route

              }
              else {
                this.router.navigate(['/login']); // Navigate to home or any other route
              }

            }else {
              console.log("bloque");
              this.router.navigate(['/bloque']); // Navigate to home or any other route

            }

          }else {
            console.log("ne pas cbon");
            this.errorMessage = 'Invalid email or password.'; // Set error message on failed login

          }

        },
        error: (error) => {
          console.error('Login error', error);
          this.errorMessage = 'Invalid email or password.'; // Set error message on failed login
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
