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
import { forkJoin, Observable, throwError } from 'rxjs';
import { clear } from 'console';

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
  reservationDate2: Date | null = null;
  returnDate2: Date | null = null;

  selectedLivre!: Livre; // Set to null initially
  memberId!:number;

  filteredEmprunts: any[] = []; // Adjust the type as needed
  filteredReservation: any[] = []; // Adjust the type as needed

  idMember: number=this.loginService.getMember()?.idMember;

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
    { name: 'Éducation', icon: 'images/education.png', subTypes: 'EDUCATION' },
    { name: 'Amour et relations', icon: 'images/lamour.png', subTypes: 'AMOUR_RELATIONS' },
    { name: 'Développement personnel', icon: 'images/developement.png', subTypes: 'DEVELOPPEMENT_PERSONNEL' },
    { name: 'Famille et parentalité', icon: 'images/famille.png', subTypes: 'FAMILLE_PARENTALITE' },
    { name: 'Voyages', icon: 'images/voyage.png', subTypes: 'VOYAGES' },
    { name: 'Santé et bien-être', icon: 'images/sante.png', subTypes: 'SANTE_BIEN_ETRE' },
    { name: 'Arts et créativité', icon: 'images/art.png', subTypes: 'ARTS_CREATIVITE' },
    { name: 'Société et culture', icon: 'images/culture.png', subTypes: 'SOCIETE_CULTURE' },
  ];



  isInFilteredEmprunt(item: Livre): boolean {
    //console.log(item);
    //console.log(this.filteredEmprunts);
    return this.filteredEmprunts.some(emprunt => emprunt.livreId == item.idLivre);
  }

  // Method to check if an item exists in filteredReservation
  isInFilteredReservation(item: Livre) : boolean{
    return this.filteredReservation.some(emprunt => emprunt.livreId == item.idLivre);


  }



  getLivre(type:string) {

    this.livreService.findAllByStatutAndType(true,type).subscribe(
      (responseLivre: Livre[]) => {

        this.items = responseLivre;

        this.filteredItems = this.removeDuplicates(this.items);
        this.filteredItems = this.removeDuplicates(this.filteredItems);

        this.totalItems = this.filteredItems.length;
        this.applyPagination();

        const uniqueAuthorIds = Array.from(new Set(responseLivre.map(livre => livre.idAuther).filter(id => id !== undefined))) as number[];

        this.empruntService.findByMemberId(this.idMember).subscribe(
          (emprunts: Emprunt[]) => {
            this.filteredEmprunts = emprunts.filter(emprunt =>
              responseLivre.some(livre => livre.idLivre == emprunt.livreId)
            );
          },
          (erreur) => {
            console.error("Erreur lors de la récupération des emprunts", erreur);
          }
        );

        this.reserverService.findByMemberId(this.idMember).subscribe(
          (reservation: Reservation[]) => {
            this.filteredReservation = reservation.filter(reservation =>
              responseLivre.some(livre => livre.idLivre == reservation.livreId)
            );
          },
          (erreur) => {
            this.items=[];
            this.filteredItems=[];
            //console.error("Erreur lors de la récupération des réservations", erreur);
          }
        );

        this.fetchAuthors(uniqueAuthorIds);
      },
      (error) => {

      }
    );
  }




  private fetchAuthors(uniqueAuthorIds: number[]) {
    const authorRequests = uniqueAuthorIds.map(authorId => this.autherService.findAutherById(authorId));
    forkJoin(authorRequests).subscribe(
      (authorsResponses) => {
        authorsResponses.forEach(authorResponse => {
          const authorName = `${authorResponse.prenom} ${authorResponse.nom}`;

          // Ensure idAuther is defined before using it as an index
          if (authorResponse.idAuther !== undefined) {
            this.nomAuther.push(authorName); // Store the author name
            this.authorMap[authorResponse.idAuther] = authorName; // Store author ID and name
          } else {
            console.error('Author ID is undefined', authorResponse);
          }
        });
      },
      (error) => {
        console.error('Error retrieving authors', error);
      }
    );
  }



  ngOnInit(): void {
    // Set the first category as selected by default
    if (this.categories.length > 0) {
      this.selectedItem = this.categories[0].name;
      this.selectedSubType = this.categories[0].subTypes;
      this.getLivre(this.selectedSubType);
      this.filteredItems = this.removeDuplicates(this.filteredItems);

    }
// Fetch all
  }


  getImageSrc(base64String: string | null): string {
    return base64String ? `data:image/png;base64,${base64String}` : ''; // Return an empty string if no image
  }


  onClick(item: any) {

    this.filteredItems = this.removeDuplicates(this.items);
    this.filteredItems = this.removeDuplicates(this.filteredItems);
    this.selectedItem = item.name;
    this.selectedSubType = item.subTypes;
    this.items=[];
    this.filteredItems=[];
    this.totalItems =0;
    this.authorMap={};
    this.nomAuther=[];
        this.getLivre(this.selectedSubType!);


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

    }  if ((item.etat === "EMPRUNTER")  && item.idLivre != undefined) {
      this.selectedLivre = item; // Store the selected book
      this.reservationDate2 = new Date(); // Today's date
      this.returnDate2 = new Date();
      this.reservationDate2.setDate(this.returnDate2.getDate() + 22); // 21 days later
      this.returnDate2.setDate(this.returnDate2.getDate() + 43); // 21 days later
      this.showModal2 = true; // Show the modal
    }
    else if ((item.etat === "RESERVER")  && item.idLivre != undefined) {
      this.reserverService.findByLivreId(item.idLivre).subscribe(
        (response:Reservation[])=>{

          response.sort((a, b) => new Date(b.dateReservation).getTime() - new Date(a.dateReservation).getTime());
          const latestReservation = response[0];


          this.selectedLivre = item; // Store the selected book
          this.reservationDate2 = new Date(); // Today's date
          this.returnDate2 = new Date();

          this.reservationDate2 = new Date(latestReservation.dateReservation); // Clone the original date
          this.returnDate2 = new Date(latestReservation.dateReservation); // Clone the original date

          // Add days using setDate
          this.reservationDate2.setDate(this.reservationDate2.getDate() + 22);
          this.returnDate2.setDate(this.returnDate2.getDate() + 43);
          this.showModal2 = true; // Show the modal
        },
        (err)=>{

        }
      );

    }
  }

  onReserverConfirmed(livre: Livre) {
    if (livre && livre.idLivre!=undefined) {
      const emp = new Reservation(this.loginService.getMember()?.idMember, livre.idLivre);
      console.log("id "+livre.idLivre);
      this.reserverService.saveReservation(emp).subscribe(
        response => {
          livre.etat = "RESERVER"; // Update the book state
          this.livreService.updateLivre(livre).subscribe(
            () => {
              console.log("Emprunt enregistré avec succès");
              window.location.reload();

              this.closeModal();
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
              window.location.reload();


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
    console.log("item : "+this.items);
  }

  // Handle page change
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.filteredItems = this.removeDuplicates(this.filteredItems);
    }
  }

  // Calculate total pages
  totalPages(): number {
    this.filteredItems = this.removeDuplicates(this.filteredItems);
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
        this.filteredItems = this.removeDuplicates(this.filteredItems);
        return matchesTitle || matchesDescription || matchesAuthor;
      });
    } else {
      this.filteredItems = this.removeDuplicates(this.filteredItems);
      this.applyPagination(); // Reapply pagination if the search query is empty
    }
  }


  removeDuplicates(items: Livre[]): Livre[] {
    const uniqueItems = new Map<number, Livre>();
    const duplicates = new Set<number>(); // Pour garder une trace des duplicatas

    items.forEach(item => {
        if (uniqueItems.has(item.idLivre!)) {
            duplicates.add(item.idLivre!); // Marquer comme duplicata
        } else {
            uniqueItems.set(item.idLivre!, item); // Ajouter l'élément unique
        }
    });

    // Retirer un duplicata de chaque élément en vérifiant le Set
    const result: Livre[] = [];
    uniqueItems.forEach(item => {
        if (duplicates.has(item.idLivre!)) {
            result.push(item); // Ajouter l'original
            duplicates.delete(item.idLivre!); // Supprimer du Set pour ne garder qu'un seul duplicata
        } else {
            result.push(item); // Ajouter l'élément unique
        }
    });

    return result;
}



  isDuplicate(item: Livre, index: number): boolean {
    // Check if the item is already in filteredItems based on a unique identifier (e.g., idLivre)
    return this.filteredItems.some(existingItem => existingItem.idLivre === item.idLivre);
  }

}
