import { Component } from '@angular/core';
import { HeaderComponent } from "../../header.component";
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RoundPipe } from '../../../round.pipe';
import { LivreService } from '../../../shared/services/livre.service';
import { LoginService } from '../../../shared/services/login.service';
import { Livre } from '../../../shared/models/livre';

@Component({
  selector: 'app-ajouter-livre',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, CommonModule, FormsModule, RoundPipe, HeaderComponent],
  templateUrl: './ajouter-livre.component.html',
  styleUrls: ['./ajouter-livre.component.css']
})
export class AjouterLivreComponent  {
  titre: string = '';
  description: string = '';
  type: string = '';

  nombreDePages: number | null = null;
  nomAuteur: string = 'Auteur par défaut'; // This could be fetched from a service
  selectedFile: File | null = null;
  selectedImage: string | ArrayBuffer | null = null;


  constructor(private loginService: LoginService, private router: Router,private livreService : LivreService) {
    this.loginService = loginService;
    this.router = router;


    // Check if the user is authenticated, if not redirect to the login page
    if (!this.loginService.getEmail() || !this.loginService.name) {
      this.router.navigate(['/login']); // Redirect to login if member does not exist
      return; // Stop further execution if not authenticated
    }
    this.nomAuteur=this.loginService.name;
  }

  ajouter() {
    if (this.titre && this.description && this.nombreDePages && this.nomAuteur && this.selectedFile && this.type) {
      const reader = new FileReader();

      // Convert the selected file to a base64 string
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        const base64Image = reader.result as string; // Convert result to a base64 string

        // Strip the MIME type prefix from the base64 string
        const base64Data = base64Image.split(',')[1]; // Get the base64 part only

        // Create a new Livre object with the base64 image string
        const livre = new Livre(
          this.titre,
          this.nombreDePages ?? 0,
          this.description,
          base64Data, // Assign the stripped base64 image
          0, // Initialize star to 0
          this.type,
          this.loginService.getMember().idAuther // Assign the author ID
        );

        console.log('Livre:', livre);

        // Call the service to save the Livre object
        this.livreService.saveLivre(livre).subscribe(
          response => {
            console.log('Response:', response);
            this.router.navigate(["home-auther"]);
            // Handle success: reset form or notify the user
          },
          error => {
            console.error('Error:', error);
            // Handle error: notify the user or log the error
          }
        );
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
    } else {
      console.log('Form is incomplete!');
    }
  }



  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
