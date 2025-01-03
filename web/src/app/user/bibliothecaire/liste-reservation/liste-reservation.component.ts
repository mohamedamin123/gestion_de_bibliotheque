import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { Member } from '../../../shared/models/member';
import { LoginService } from '../../../shared/services/login.service';
import { MemberService } from '../../../shared/services/member.service';
import { HeaderComponent } from '../../header.component';
import { ReservationService } from '../../../shared/services/reservation.service';
import { Emprunt } from '../../../shared/models/emprunt';
import { Reservation } from '../../../shared/models/reservation';
import { AutherService } from '../../../shared/services/auther.service';
import { LivreService } from '../../../shared/services/livre.service';
import { EmpruntService } from '../../../shared/services/emprunter.service';
import { Livre } from '../../../shared/models/livre';

@Component({
  selector: 'app-liste-reservation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet, FormsModule, HeaderComponent],
  templateUrl: './liste-reservation.component.html',
  styleUrls: ['./liste-reservation.component.css'] // Corrected typo
})
export class ListeReservationComponent {
  selectedItem: string | null = null;
  selectedSubType: string | null = null;
  name: string | null = null;

  searchQuery: string = ''; // To hold the search input
  filteredItems: any[] = []; // Filtered items (use array type)
  items: any[] = []; // List of members, initialized as an empty array
  pageSize: number = 10; // Items per page
  currentPage: number = 1; // Current page
  totalItems: number = 0; // Total number of members

  constructor(
    private loginService: LoginService,
    private router: Router,
    private empruntService: EmpruntService,
    private reservationService: ReservationService,
    private memberService: MemberService,
    private autherService: AutherService,
    private livreService: LivreService
  ) {
    this.name = this.loginService.name; // Set the member's name if logged in
  }

  ngOnInit(): void {
    if (!this.loginService.getEmail() || !this.loginService.name) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return; // Stop further execution if not authenticated
    }
    this.getMembers(); // Retrieve members and reservations
  }

  getMembers(): void {
    // Fetch all Emprunts
    this.empruntService.findAll().subscribe(
      (response: Emprunt[]) => {
        this.items = [...this.items, ...response];
        this.totalItems = this.items.length;

        response.forEach(emprunt => {
          this.memberService.findMemberById(emprunt.memberId!).subscribe(
            member => emprunt.member = member
          );
          this.livreService.findLivreById(emprunt.livreId!).subscribe(
            livre => {
              emprunt.livre = livre;
              // Fetch the author if not already populated
              if (livre.idAuther) {
                this.autherService.findAutherById(livre.idAuther).subscribe(
                  auther => livre.auther = auther
                );
              }
            }
          );
        });

        this.applyPagination(); // Apply pagination after receiving emprunts
      },
      error => console.error('Error retrieving emprunts', error)
    );

    // Fetch all Reservations
    this.reservationService.findAll().subscribe(
      (response: Reservation[]) => {
        this.items = [...this.items, ...response];
        this.totalItems = this.items.length;

        response.forEach(reservation => {
          this.memberService.findMemberById(reservation.memberId!).subscribe(
            member => reservation.member = member
          );
          this.livreService.findLivreById(reservation.livreId!).subscribe(
            livre => {
              reservation.livre = livre;
              // Fetch the author if not already populated
              if (livre.idAuther) {
                this.autherService.findAutherById(livre.idAuther).subscribe(
                  auther => livre.auther = auther
                );
              }
            }
          );
        });

        this.applyPagination(); // Apply pagination after receiving reservations
      },
      error => console.error('Error retrieving reservations', error)
    );
  }

  // Apply pagination logic
  applyPagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredItems = this.items.slice(startIndex, endIndex);
  }

  // Handle page change
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.applyPagination();
    }
  }

  // Calculate total pages
  totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
  filterItems(): void {
    if (this.searchQuery.trim()) {
      const query: string = this.searchQuery.toLowerCase().trim();
      this.filteredItems = this.items.filter(item =>
        // Check all relevant properties in the item, ensuring they are defined and of type string
        (item.member?.prenom && item.member.prenom.toLowerCase().includes(query)) ||
        (item.member?.nom && item.member.nom.toLowerCase().includes(query)) ||
        (item.livre?.titre && item.livre.titre.toLowerCase().includes(query)) ||
        (item.livre?.auther?.prenom && item.livre.auther.prenom.toLowerCase().includes(query)) ||
        (item.livre?.auther?.nom && item.livre.auther.nom.toLowerCase().includes(query)) ||
        (item.member?.tel && String(item.member.tel).toLowerCase().includes(query)) ||
        (item.dateReservation && this.formatDateForSearch(item.dateReservation).includes(query)) ||
        (item.dateEmprunt && this.formatDateForSearch(item.dateEmprunt).includes(query)) ||
        (item.dateRetour && this.formatDateForSearch(item.dateRetour).includes(query))
      );
    } else {
      this.applyPagination(); // Reapply pagination if the search query is empty
    }
  }

  // Helper function to format Date objects for comparison with search query
  formatDateForSearch(date: Date): string {
    const d = new Date(date); // Ensure it's a Date object
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  supprimer(member: any): void {
    const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?');
    if (!isConfirmed) {
      console.log('Suppression annulée.');
      return;
    }

    if (member.dateRetour) {
      this.supprimerEmprunt(member);
    } else {
      this.supprimerReservation(member);
    }
  }

  private supprimerEmprunt(member: any): void {
    this.empruntService.deleteEmprunt(member.idEmprunt).subscribe(
      () => {
        this.reservationService.findByLivreId(member.livreId!).subscribe(
          (reservations: Reservation[]) => {
            if (reservations.length > 0) {
              this.transformerReservationEnEmprunt(member, reservations[0]);
            } else {
              this.rendreLivreDisponible(member.livreId!);
            }
          },
          (error) => console.error('Erreur lors de la recherche des réservations:', error)
        );
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'emprunt:', error);
        alert('Une erreur s\'est produite lors de la suppression de l\'emprunt.');
      }
    );
  }

  private supprimerReservation(member: any): void {
    this.reservationService.deleteReservation(member.idReservation).subscribe(
      () => {
        this.reservationService.findByLivreId(member.livreId!).subscribe(
          (reservations: Reservation[]) => {
            if (reservations.length === 0) {
              this.verifierSiLivreDoitEtreDisponible(member.livreId!);
            }
          },
          (error) => console.error('Erreur lors de la recherche des réservations:', error)
        );
      },
      (error) => {
        console.error('Erreur lors de la suppression de la réservation:', error);
        alert('Une erreur s\'est produite lors de la suppression de la réservation.');
      }
    );
  }
  private transformerReservationEnEmprunt(member: any, firstReservation: Reservation): void {
    if (firstReservation.idReservation) {
      // Créer une instance d'Emprunt
      const nouvelEmprunt = new Emprunt(
        firstReservation.memberId, // Set memberId
        member.livreId,
      );

      // Préserver les dates de la réservation
      nouvelEmprunt.dateEmprunt = firstReservation.dateReservation;
      this.empruntService.saveEmprunt(nouvelEmprunt).subscribe(
        () => {
          this.reservationService.deleteReservation(firstReservation.idReservation!).subscribe(
            () => {
              alert('Réservation transformée en emprunt avec succès.');
            },
            (error) => {
              console.error('Erreur lors de la suppression de la réservation:', error);
              alert('Erreur lors de la suppression de la réservation.');
            }
          );
        },
        (error) => {
          console.error('Erreur lors de la création de l\'emprunt:', error);
          alert('Erreur lors de la transformation de la réservation en emprunt.');
        }
      );
    } else {
      console.error('ID de la réservation invalide.');
      alert('L\'ID de la réservation est invalide.');
    }
  }

  private rendreLivreDisponible(livreId: number): void {
    this.livreService.findLivreById(livreId).subscribe(
      (livre: Livre) => {
        livre.etat = 'DISPONIBLE';
        this.livreService.updateLivre(livre).subscribe(
          () => console.log('Livre rendu disponible.'),
          (error) => console.error('Erreur lors de la mise à jour du livre:', error)
        );
      },
      (error) => console.error('Erreur lors de la récupération du livre:', error)
    );
  }

  private verifierSiLivreDoitEtreDisponible(livreId: number): void {
    this.livreService.findLivreById(livreId).subscribe(
      (livre: Livre) => {
        if (livre.etat !== 'EMPRUNTÉ') {
          livre.etat = 'DISPONIBLE';
          this.livreService.updateLivre(livre).subscribe(
            () => console.log('Livre marqué comme disponible.'),
            (error) => console.error('Erreur lors de la mise à jour du livre:', error)
          );
        }
      },
      (error) => console.error('Erreur lors de la récupération du livre:', error)
    );
  }


  addDaysToDate(date: string | null | undefined, days: number): string | null {
    if (!date) return null;

    const originalDate = new Date(date);
    const newDate = new Date(originalDate.setDate(originalDate.getDate() + days));

    return newDate.toISOString(); // Return the new date in a string format
  }

  retour(): void {
    const member = this.loginService.getMember();
    if (member.role === 'BIBLIOTHECAIRE') {
      this.router.navigate(['home-bibliothecaire']);
    } else if (member.role === 'ADMIN') {
      this.router.navigate(['home-admin']);
    }
  }
}
