import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RoundPipe } from '../../../round.pipe';
import { LoginService } from '../../../shared/services/login.service';
import { EmpruntService } from '../../../shared/services/emprunter.service';
import { ReservationService } from '../../../shared/services/reservation.service';
import { Emprunt } from '../../../shared/models/emprunt';
import { HeaderComponent } from "../../header.component";
import { LivreService } from '../../../shared/services/livre.service';
import { Livre } from '../../../shared/models/livre';
import { AutherService } from '../../../shared/services/auther.service';
import { ReservationModalComponent } from './ReservationModal/reservation-modal.component';
import { Reservation } from '../../../shared/models/reservation';
import { ReservationModal2Component } from "./ReservationModal2/reservation-modal2.component";

@Component({
  selector: 'app-home-member',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, CommonModule, FormsModule, RoundPipe, HeaderComponent, ReservationModalComponent, ReservationModal2Component],
  templateUrl: './home-member.component.html',
  styleUrls: ['./home-member.component.css']
})
export class HomeMemberComponent implements OnInit {
  selectedItem: string | null = null;
  selectedSubType: string | null = null;
  name: string | null = null;
  nomAuther: string[] = []; // Array to store author names
  authorMap: { [key: number]: string } = {}; // Map to store author ID and their names
  searchQuery: string = ''; // To hold the search input
  filteredItems: Livre[] = []; // Filtered items
  items: Livre[] = []; // To hold the list of Books
  pageSize: number = 10; // Items per page
  currentPage: number = 1; // Current page
  totalItems: number = 0; // Total number of Books

  showModal = false; // Control the visibility of the modal
  showModal2 = false; // Control the visibility of the modal

  reservationDate: Date | null = null;
  returnDate: Date | null = null;
  returnDate2: Date | null = null;

  selectedLivre!: Livre; // Set to null initially

  constructor(
    private loginService: LoginService,
    private router: Router,
    private empruntService: EmpruntService,
    private reserverService: ReservationService,
    private livreService: LivreService,
    private autherService: AutherService
  ) {
    this.name = this.loginService.name; // Set the member's name if logged in

    // Check if the user is authenticated, if not redirect to the login page
    if (!this.loginService.getEmail() || !this.loginService.name) {
      this.router.navigate(['/login']); // Redirect to login if member does not exist
    }
  }

  categories = [
    { name: 'Éducation', icon: 'images/education.png', subTypes: 'Education' },
    { name: 'Amour et relations', icon: 'images/lamour.png', subTypes: 'Amour' },
    { name: 'Développement personnel', icon: 'images/developement.png', subTypes: 'Développement' },
    { name: 'Famille et parentalité', icon: 'images/famille.png', subTypes: 'Famille' },
    { name: 'Voyages', icon: 'images/voyage.png', subTypes: 'Voyages' },
    { name: 'Santé et bien-être', icon: 'images/sante.png', subTypes: 'Santé' },
    { name: 'Arts et créativité', icon: 'images/art.png', subTypes: 'Arts' },
    { name: 'Société et culture', icon: 'images/culture.png', subTypes: 'Société' },
  ];

  getLivre() {
    this.livreService.findAllByStatut(true).subscribe(
      (response: Livre[]) => {
        this.items = response; // Set the items with the retrieved data
        this.totalItems = this.items.length; // Total number of items
        this.applyPagination(); // Apply pagination after receiving the books
        console.log(response);

        const uniqueAuthorIds = Array.from(new Set(response.map(livre => livre.idAuther))); // Get unique author IDs

        // Fetch authors for all unique author IDs
        uniqueAuthorIds.forEach(authorId => {
          if (authorId !== undefined) {
            this.autherService.findAutherById(authorId).subscribe(
              (authorResponse) => {
                const authorName = `${authorResponse.prenom} ${authorResponse.nom}`;
                if (authorResponse.idAuther !== undefined) {
                  this.nomAuther.push(authorName); // Store the author name
                  this.authorMap[authorResponse.idAuther] = authorName; // Store author ID and name
                } else {
                  console.error('Author ID is undefined', authorResponse);
                }
              },
              (error) => {
                console.error('Error retrieving Author by ID', error);
              }
            );
          }
        });
      },
      (error) => {
        console.error('Error retrieving Books', error);
      }
    );
  }

  getImageSrc(base64String: string | null): string {
    return base64String ? `data:image/png;base64,${base64String}` : ''; // Return an empty string if no image
  }

  ngOnInit(): void {
    // Set the first category as selected by default
    if (this.categories.length > 0) {
      this.selectedItem = this.categories[0].name;
      this.selectedSubType = this.categories[0].subTypes;
    }

    this.getLivre(); // Fetch all books initially
  }

  onClick(item: any) {
    this.selectedItem = item.name;
    this.selectedSubType = item.subTypes;
  }

  toggleDetails(item: any) {
    item.hidden = !item.hidden;
  }

  changeLivre(item: Livre) {
    if (item.etat === "DISPONIBLE") {
      this.selectedLivre = item; // Store the selected book
      this.reservationDate = new Date(); // Today's date
      this.returnDate = new Date();
      this.returnDate.setDate(this.returnDate.getDate() + 21); // 21 days later
      this.showModal = true; // Show the modal

    }  if (item.etat === "EMPRUNTER" && item.idLivre != undefined) {

      this.reserverService.findByLivreId(item.idLivre).subscribe(
        (response)=>{

        },
        ()=>{

        }
      );


      this.selectedLivre = item; // Store the selected book
      this.reservationDate = new Date(); // Today's date
      this.returnDate = new Date();
      this.returnDate.setDate(this.returnDate.getDate() + 21); // 21 days later
      this.showModal2 = true; // Show the modal

    }
    else {
      console.log("erreur");
    }
  }

  onReserverConfirmed(livre: Livre) {
    if (livre) {

      const emp = new Reservation(this.loginService.getMember()?.idMember, livre.idLivre);
      this.reserverService.saveReservation(emp).subscribe(
        response => {
          livre.etat = "RESERVER"; // Update the book state
          this.livreService.updateLivre(livre).subscribe(
            () => {
              console.log("Emprunt enregistré avec succès");
              this.closeModal(); // Close the modal after saving
            },
            error => {
              console.error('Erreur lors de la mise à jour du livre', error);
            }
          );
        },
        error => {
          console.error('Erreur lors de l\'emprunt', error);
        }
      );
    } else {
      console.error("selectedLivre is null, cannot proceed with the borrowing process");
    }
  }


  onEmprunterConfirmed(livre: Livre) {
    if (livre) {

      const emp = new Emprunt(this.loginService.getMember()?.idMember, livre.idLivre);
      this.empruntService.saveEmprunt(emp).subscribe(
        response => {
          livre.etat = "EMPRUNTER"; // Update the book state
          this.livreService.updateLivre(livre).subscribe(
            () => {
              console.log("Emprunt enregistré avec succès");
              this.closeModal(); // Close the modal after saving
            },
            error => {
              console.error('Erreur lors de la mise à jour du livre', error);
            }
          );
        },
        error => {
          console.error('Erreur lors de l\'emprunt', error);
        }
      );
    } else {
      console.error("selectedLivre is null, cannot proceed with the borrowing process");
    }
  }

  closeModal() {
    this.showModal = false; // Hide the modal
    this.showModal2 = false; // Hide the modal

  }
  // Filter items based on the search query
  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredItems = this.items.slice(startIndex, endIndex); // Display only the current page items
  }

  // Handle page change
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.applyPagination();
    }
  }

  // Calculate total pages
  totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  // Filter items based on the search query
  filterItems() {
    if (this.searchQuery.trim()) {
      const query: string = this.searchQuery.toLowerCase().trim();
      this.filteredItems = this.items.filter(item => {
        const matchesTitle = item.titre.toLowerCase().includes(query);
        const matchesDescription = item.description.toLowerCase().includes(query);
        const matchesAuthor = this.authorMap[item.idAuther!]?.toLowerCase().includes(query);

        return matchesTitle || matchesDescription || matchesAuthor;
      });
    } else {
      this.applyPagination(); // Reapply pagination if the search query is empty
    }
  }

}
