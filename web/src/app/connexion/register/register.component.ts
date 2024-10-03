import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Member } from '../../shared/models/member';
import { MemberService } from '../../shared/services/member.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private memberService: MemberService) {
    this.loginForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone1: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]], // Exactly 8 digits
      telephone2: ['', Validators.pattern(/^[0-9]{8}$/)], // Optional
      dateDeNaissance: ['', Validators.required],
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
      const newMember: Member = this.loginForm.value; // Get the form values as a Member object

      // Capitalize the first letter of nom and prenom
      newMember.nom = this.capitalizeFirstLetter(newMember.nom);
      newMember.prenom = this.capitalizeFirstLetter(newMember.prenom);

      // Collect the phone numbers into an array
      newMember.tel = []; // Initialize the telephone array

      // Push telephone numbers into the array if they exist
      if (newMember['telephone1']) {
        newMember.tel.push(newMember['telephone1']);
      }
      if (newMember['telephone2']) {
        newMember.tel.push(newMember['telephone2']);
      }

      // Clear the telephone fields in the form (optional)
      this.loginForm.patchValue({
        telephone1: '',
        telephone2: ''
      });

      // Save the member using the member service
      this.memberService.saveMember(newMember).subscribe({
        next: (response) => {
          console.log('Member registered successfully', response);
          this.router.navigate(['/login']); // Redirect to login page or another route
        },
        error: (error) => {
          console.error('Error registering member', error);
          // Optionally show an error message to the user
        }
      });
    } else {
      console.log('Form is invalid', this.loginForm.errors);
      // Optionally show an error message to the user
    }
  }

  // Helper method to capitalize the first letter of a string
  private capitalizeFirstLetter(value: string): string {
    if (!value) return ''; // Return empty string if value is falsy
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
