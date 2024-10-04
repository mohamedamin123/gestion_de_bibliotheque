import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MemberService } from '../../shared/services/member.service';
import { Member } from '../../shared/models/member';

@Component({
  selector: 'app-new-password',
  standalone: true,
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
  imports: [RouterLink, RouterOutlet, CommonModule, ReactiveFormsModule]
})
export class NewPasswordComponent {
  passwordForm: FormGroup;
  member: Member | null = null;
  verificationCode: any;

  constructor(private fb: FormBuilder, private router: Router, private memberService: MemberService) {

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.member = navigation.extras.state['member'] || null;

      // Check if member is missing or null after refresh
      if (!this.member) {
        this.router.navigate(['/login']);  // Redirect to login page
      }
    }

    this.passwordForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*+-]).*'), // At least one number and one special character
        ]
      ],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.valid && this.member) {
      // Update the member's password
      this.member.password = this.passwordForm.get('password')?.value;

      // Save the member details via the member service
      this.memberService.updateMemberPassword(this.member).subscribe({
        next: (response) => {
          console.log('Membre enregistré avec succès', response);
          this.router.navigate(['/login']);  // Redirect to login page
        },
        error: (error) => {
          console.error('Erreur lors de l\'enregistrement du membre', error);
        }
      });
    }
  }
}
