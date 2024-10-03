import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Member } from '../../shared/models/member';
import { MemberService } from '../../shared/services/member.service';
import { SendEmailService } from '../../shared/services/send-email.service';

// Define the structure for the email data
export interface Email {
  to: string;
  subject?: string;
  body?: string;
  code?: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loginForm: FormGroup;
   verificationCode = this.generateCode(); // Générer le code une fois et le stocker dans une variable

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private memberService: MemberService,
    private sendEmailService: SendEmailService // Inject the email service
  ) {
    this.loginForm = this.fb.group({

      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone1: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
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
      const newMember: Member = this.loginForm.value;

      // Capitalize the first letter of nom and prenom
      newMember.nom = this.capitalizeFirstLetter(newMember.nom);
      newMember.prenom = this.capitalizeFirstLetter(newMember.prenom);

      // Collect the phone numbers into an array
      newMember.tel = [];
      if (newMember['telephone1']) {
        newMember.tel.push(newMember['telephone1']);
      }
      if (newMember['telephone2']) {
        newMember.tel.push(newMember['telephone2']);
      }

      // Prepare the email object

      const email: Email = {
        to: newMember.email,
        code: this.verificationCode, // Utiliser le code généré
        subject: "Confirm your email",
        body: "Cher utilisateur,\n Merci de vous être inscrit sur notre plateforme. Afin de valider votre compte et vous permettre de profiter de tous nos services, nous vous demandons de confirmer votre adresse e-mail en utilisant le code de confirmation suivant :\n" +
              "\n" + this.verificationCode // Utiliser la variable de code ici
      };


      // Send the email with the verification code
      this.sendEmailService.sendEmail(email).subscribe(
        response => {
          console.log('Verification email sent successfully', response);
          // Assuming the verification code is part of the response (adjust based on your API response)
          this.verificationCode = response.code; // Get the verification code from the response

          // Clear the telephone fields in the form (optional)
          this.loginForm.patchValue({
            telephone1: '',
            telephone2: ''
          });

          // Navigate to the VerifyComponent and pass the member object and the verification code as state

        },
        error => {
          console.error('Error sending email', error);
          // Optionally handle email sending error
        }
      );
      this.router.navigate(['/verify'], {
        state: { member: newMember, verificationCode: this.verificationCode }
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

  // Generate a random code between 100000 and 999999
  private generateCode(): string {
    const code = Math.floor(Math.random() * 900000) + 100000; // Génère un nombre aléatoire entre 100000 et 999999
    return code.toString();
  }
}
