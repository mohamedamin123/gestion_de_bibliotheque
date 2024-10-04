import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MemberService } from '../../shared/services/member.service';
import { Email, SendEmailService } from '../../shared/services/send-email.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email = ""; // Store the email input
  emailError = ""; // Error message for invalid email
  memberError = ""; // Error message for when the member is not found
  emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Pattern to validate email
  verificationCode = this.generateCode(); // Generate a verification code initially

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private memberService: MemberService,
    private sendEmailService: SendEmailService // Inject the email service
  ) {
    
  }

  // Function to validate email format
  testEmail(): boolean {
    if (this.emailPattern.test(this.email.trim())) {
      this.emailError = ""; // Clear error if email is valid
      return true;
    } else {
      this.emailError = "Saisir un email correct"; // Show error message if invalid
      return false;
    }
  }

  // Continue button logic
  continue() {
    if (this.testEmail()) {
      // Check if the member exists by email
      this.memberService.findMemberByEmail(this.email).subscribe({
        next: (response) => {

          if(response) {
            const emailEnvoyer: Email = {
              to: this.email,
              code: this.verificationCode, // Use the generated code
              subject: "Confirmez votre adresse email",
              body: "Cher utilisateur,\n Merci de vous être inscrit sur notre plateforme. Afin de valider votre compte, veuillez utiliser le code de confirmation suivant :\n" + this.verificationCode // Include the code in the email body
            };

            // Send the verification email

            this.sendEmailService.sendEmail(emailEnvoyer).subscribe(
              (emailResponse) => {
                console.log('Email de vérification envoyé avec succès', emailResponse);
                // Navigate to the verification page with email and code in state

              },
              (emailError) => {
                console.error('Erreur lors de l\'envoi de l\'email', emailError);
              }
            );
            this.router.navigate(['/verify'], {
              state: { email: this.email, verificationCode: this.verificationCode }
            });
          } else {
            this.emailError = "Cet email n'est pas enregistré dans notre système."; // Display error if email is not found

          }
          // Member found, proceed to send the verification code

        },
        error: (err) => {
          // If member not found, display an error message
          this.emailError = "Cet email n'est pas enregistré dans notre système."; // Display error if email is not found
          console.error('Membre introuvable', err);
        }
      });
    } else {
      // Handle invalid email case
      console.log("L'email est invalide, veuillez corriger.");
    }
  }

  // Function to generate a 6-digit random code
  private generateCode(): string {
    const code = Math.floor(Math.random() * 900000) + 100000; // Generate random code between 100000 and 999999
    return code.toString();
  }
}
