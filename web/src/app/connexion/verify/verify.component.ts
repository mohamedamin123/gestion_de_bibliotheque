import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Member } from '../../shared/models/member';
import { MemberService } from '../../shared/services/member.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
  imports: [FormsModule, RouterLink, RouterOutlet]
})
export class VerifyComponent {
  member: Member | null = null;
  verificationCode: string | null = null; // Store the verification code
  codeError: string = "";

  // Create an object to hold the individual digits of the verification code
  code: { [key in 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6']: string } = {
    a1: '',
    a2: '',
    a3: '',
    a4: '',
    a5: '',
    a6: ''
  };

  constructor(private router: Router, private memberService: MemberService) {
    // Retrieve the member object and verification code from the router's state
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.member = navigation.extras.state['member'] || null;
      this.verificationCode = navigation.extras.state['verificationCode'] || null; // Get the verification code
    }
    console.log("code " + this.verificationCode); // Check if the code is retrieved
  }

  onInput(input: HTMLInputElement, field: 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6') {
    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.value) {
      const nextInput = input.nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus(); // Move to the next field if there's input
      }
    }
    this.code[field] = input.value; // Update the code object dynamically
  }

  onBackspace(event: KeyboardEvent, input: HTMLInputElement) {
    if (event.key === 'Backspace' && !input.value) {
      const previousInput = input.previousElementSibling as HTMLInputElement;
      if (previousInput) {
        previousInput.focus(); // Move to the previous field if backspace is pressed
      }
    }
  }

  continue() {
    const codeValue = Object.values(this.code).join('');
    if (codeValue.length < 6) {
      this.codeError = "Le code doit contenir 6 chiffres";
    } else {
      // Verify the entered code with the code sent via email
      if (this.verificationCode && codeValue === this.verificationCode) {
        console.log('Verification successful, member:', this.member);
        this.codeError = "";

        if (this.member) {
          // If verification succeeds, save the member via the member service
          this.memberService.saveMember(this.member).subscribe({
            next: (response) => {
              console.log('Member registered successfully', response);
              this.router.navigate(['/login']); // Redirect to login page or another route
            },
            error: (error) => {
              console.error('Error saving member', error);
            }
          });
        } else {
          console.error('No member data available for verification');
        }
      } else {
        this.codeError = "Le code est incorrect"; // Show error message if the code does not match
      }
    }
  }
}
