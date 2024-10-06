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
  email: string="";

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
      this.email = navigation.extras.state['email'] || null;
      console.log(this.verificationCode);
    // Check if verificationCode is missing or null after refresh
    if (!this.verificationCode) {
      this.router.navigate(['/login']);  // Redirect to login page
    }
    }
  }

  onInput(input: HTMLInputElement, field: 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6', event: Event) {
    // Allow only numeric input
    input.value = input.value.replace(/[^0-9]/g, '');

    // Update the code object dynamically
    this.code[field] = input.value;

    // Move to the next field if there's input
    if (input.value) {
      const nextInput = input.nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, input: HTMLInputElement, field: 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6') {
    if (event.key === 'Backspace' && !input.value) {
      // Move to the previous field if input is empty and backspace is pressed
      const previousInput = input.previousElementSibling as HTMLInputElement;
      if (previousInput) {
        previousInput.focus(); // Focus on the previous input field
      }
    }
  }




  continue() {
    const codeValue = Object.values(this.code).join('');  // Combine the code fields into a single string

    // Check if the entered code is less than 6 digits
    if (codeValue.length < 6) {
      this.codeError = "Le code doit contenir 6 chiffres";
      return; // Stop further execution
    }

    // Check if verification code exists
    if (this.verificationCode) {
      // Case 1: Both `member` and `verificationCode` are not null
      if (this.member && codeValue === this.verificationCode) {
        this.codeError = ""; // Clear any previous errors

        // Save the member details via the member service
        this.memberService.saveMember(this.member).subscribe({
          next: (response) => {
            console.log('Membre enregistré avec succès', response);
            this.router.navigate(['/login']);  // Redirect to login page
          },
          error: (error) => {
            console.error('Erreur lors de l\'enregistrement du membre', error);
          }
        });

      // Case 2: `member` is null but `verificationCode` is correct
      } else if (!this.member && codeValue === this.verificationCode && this.email) {

                // Save the member details via the member service
                this.memberService.findMemberByEmail(this.email).subscribe({
                  next: (response) => {
                    this.router.navigate(['/nouveau_mot_de_passe'], {
                      state: {member :response }
                    });
                  },
                  error: (error) => {
                    console.error('Erreur lors de l\'enregistrement du membre', error);
                  }
                });


      // Case 3: Code mismatch or other cases
      } else {
        this.codeError = "Le code est incorrect";  // Incorrect verification code

      }

    } else {
      // If verificationCode is null or undefined (unexpected case)
      this.codeError = "Code de vérification manquant";  // Handle as an error
      console.error("Aucun code de vérification disponible pour la comparaison");
    }
  }

}
