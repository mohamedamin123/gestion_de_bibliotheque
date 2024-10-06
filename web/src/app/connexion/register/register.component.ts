import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Member } from '../../shared/models/member';
import { MemberService } from '../../shared/services/member.service';
import { SendEmailService } from '../../shared/services/send-email.service';
import { Observable, map, catchError, of } from 'rxjs';

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
  verificationCode = this.generateCode();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private memberService: MemberService,
    private sendEmailService: SendEmailService
  ) {
    this.loginForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-z]+$/)]],
      prenom: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-z]+$/)]],
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
      this.trimFormValues(); // Call the trim method before processing the form

      const newMember: Member = this.loginForm.value;

      // Collect the phone numbers into an array
      newMember.tel = [];
      if (newMember['telephone1']) {
        newMember.tel.push(newMember['telephone1']);
      }
      if (newMember['telephone2']) {
        newMember.tel.push(newMember['telephone2']);
      }

      const email: Email = {
        to: newMember.email,
        code: this.verificationCode,
        subject: "Confirm your email",
        body: `Cher utilisateur,\n Merci de vous être inscrit sur notre plateforme. Afin de valider votre compte et vous permettre de profiter de tous nos services, nous vous demandons de confirmer votre adresse e-mail en utilisant le code de confirmation suivant :\n\n${this.verificationCode}`
      };

      this.valideEmailExiste(email.to).subscribe((emailAvailable: boolean) => {
        if (emailAvailable) {
          this.router.navigate(['/verify'], {
            state: { member: newMember, verificationCode: this.verificationCode }
          });
          this.sendEmailService.sendEmail(email).subscribe(
            response => {
              console.log('Verification email sent successfully', response);
              this.loginForm.patchValue({
                telephone1: '',
                telephone2: ''
              });
            },
            error => {
              console.error('Error sending email', error);
            }
          );
        } else {
          this.loginForm.controls['email'].setErrors({ emailExists: true });
          console.log('Email already exists');
        }
      });
    } else {
      console.log('Form is invalid', this.loginForm.errors);
    }
  }

  // Method to trim whitespace from form values
  private trimFormValues() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control && typeof control.value === 'string') {
        control.setValue(control.value.trim());
      }
    });
  }

  private generateCode(): string {
    const code = Math.floor(Math.random() * 900000) + 100000; // Generates a random number between 100000 and 999999
    return code.toString();
  }

  private valideEmailExiste(email: string): Observable<boolean> {
    return this.memberService.findMemberByEmail(email).pipe(
      map(response => {
        if (response) {
          console.log('Email already exists:', response);
          return false;
        } else {
          console.log('Email is available:', email);
          return true;
        }
      }),
      catchError(error => {
        console.error('Error occurred while checking email:', error);
        return of(false); // Return false in case of an error
      })
    );
  }
}
