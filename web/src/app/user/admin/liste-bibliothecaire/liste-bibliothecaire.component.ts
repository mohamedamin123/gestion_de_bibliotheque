import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header.component';
import { LoginService } from '../../../shared/services/login.service';
import { BibliothecaireService } from '../../../shared/services/bibliothecaire.service';
import { Bibliothecaire } from '../../../shared/models/bibliothecaire';

@Component({
  selector: 'app-liste-bibliothecaire',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet, FormsModule, HeaderComponent],
  templateUrl: './liste-bibliothecaire.component.html',
  styleUrl: './liste-bibliothecaire.component.css'
})
export class ListeBibliothecaireComponent {



  selectedItem: string | null = null;
  selectedSubType: string | null = null;
  name: string | null = null;

  searchQuery: string = ''; // To hold the search input
  filteredItems: Bibliothecaire[] = []; // Filtered items
  items: Bibliothecaire[] = []; // To hold the list of Bibliothecaires
  pageSize: number = 10; // Items per page
  currentPage: number = 1; // Current page
  totalItems: number = 0; // Total number of Bibliothecaires

  constructor(
    private loginService: LoginService,
    private router: Router,
    private bibliothecaireService: BibliothecaireService // Inject bibliothecaireService

  ) {
    this.name = this.loginService.name; // Set the Bibliothecaire's name if logged in

    // Check if the user is authenticated, if not redirect to the login page

  }

  ngOnInit(): void {
    if (!this.loginService.getEmail() || !this.loginService.name) {
      this.router.navigate(['/login']); // Redirect to login if Bibliothecaire does not exist
      return; // Stop further execution if not authenticated
    }
    this.getBibliothecaires(); // Call method to retrieve Bibliothecaires
  }

  getBibliothecaires() {
    this.bibliothecaireService.findAll().subscribe(
      (response: Bibliothecaire[]) => {
        this.items = response; // Set the items with the retrieved data
        this.totalItems = this.items.length; // Total number of items
        this.applyPagination(); // Apply pagination after receiving Bibliothecaires
        console.log(response);
      },
      (error: any) => {
        console.error('Error retrieving Bibliothecaires', error);
      }
    );
  }

  // Apply pagination logic to filter displayed items
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
      this.filteredItems = this.items.filter(item =>
        item.nom.toLowerCase().includes(query) ||
        item.prenom.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query)
      );
    } else {
      this.applyPagination(); // Reapply pagination if the search query is empty
    }
  }

  consulterUser(bibliothecaire: Bibliothecaire) {
    this.router.navigate(['/consulter-user'], { state: { bibliothecaire } });


  }
  modifierUser(Bibliothecaire: Bibliothecaire) {
    console.log('Current statut:', Bibliothecaire.statut);

    // Toggle the statut value
    Bibliothecaire.statut = !Bibliothecaire.statut; // This will switch true to false and vice versa
    console.log('Nouveau statut:', Bibliothecaire);

    this.bibliothecaireService.updateBibliothecaire(Bibliothecaire).subscribe(
      () => {
        // After successful update, refresh the Bibliothecaire list
        console.log('Updated Bibliothecaire:', Bibliothecaire);
        this.getBibliothecaires();
      },
      (error: any) => {
        console.error('Error modifying Bibliothecaire', error);
      }
    );
  }

  deleteUser(Bibliothecaire: Bibliothecaire) {
    // Confirm deletion (optional, but recommended for user experience)
    const confirmDelete = confirm(`Are you sure you want to delete ${Bibliothecaire.nom} ${Bibliothecaire.prenom}?`);
    console.log(Bibliothecaire);
    if (confirmDelete) {
      // Ensure Bibliothecaire.idBibliothecaire is defined before calling deleteBibliothecaire
      if (Bibliothecaire.idBibliothecaire !== undefined) {
        this.bibliothecaireService.deleteBibliothecaire(Bibliothecaire).subscribe(
          () => {
            // After successful deletion, refresh the Bibliothecaire list
            this.getBibliothecaires();
          },
          (error: any) => {
            console.error('Error deleting Bibliothecaire', error);
          }
        );
      } else {
        console.error('Bibliothecaire ID is undefined, cannot delete Bibliothecaire');
      }
    }
  }

  retour() {
    if (this.loginService.getMember().role == 'ADMIN')
      this.router.navigate(["home-admin"])
  }
  save() {
    this.router.navigate(['consulter-user', 'bibliothecaire']);

  }
}
