import { Component } from '@angular/core';
import { HeaderComponent } from "../../header.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RoundPipe } from '../../../round.pipe';
import { Emprunt } from '../../../shared/models/emprunt';
import { EmpruntService } from '../../../shared/services/emprunter.service';
import { LoginService } from '../../../shared/services/login.service';
import { ReservationService } from '../../../shared/services/reservation.service';
import { LivreService } from '../../../shared/services/livre.service';
import { Livre } from '../../../shared/models/livre';

@Component({
  selector: 'app-home-auther',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, CommonModule, FormsModule, RoundPipe, HeaderComponent],
  templateUrl: './home-auther.component.html',
  styleUrl: './home-auther.component.css'
})
export class HomeAutherComponent {


  selectedItem: string | null = null;
  selectedSubType: string | null = null;
  name: string | null = null;
  items: Livre[] = []; // Filtered items

  searchQuery: string = ''; // To hold the search input
  filteredItems: any[] = []; // Filtered items
  loginService: LoginService;
  router: Router;

  pageSize: number = 10; // Items per page
  currentPage: number = 1; // Current page
  totalItems: number = 0; // Total number of Authers

  constructor(loginService: LoginService, router: Router,private livreService : LivreService) {
    this.loginService = loginService;
    this.router = router;
    this.name = this.loginService.name; // Set the member's name if logged in


    // Check if the user is authenticated, if not redirect to the login page
    if (!this.loginService.getEmail() || !this.loginService.name) {
      this.router.navigate(['/login']); // Redirect to login if member does not exist
      return; // Stop further execution if not authenticated
    }
  }



  getLivre() {



    this.livreService.findLivreByIdAuther(this.loginService.getMember().idAuther).subscribe(
      (response: Livre[]) => {
        this.items = response; // Set the items with the retrieved data
        this.totalItems = this.items.length; // Total number of items
        this.applyPagination(); // Apply pagination after receiving Authers
        console.log(response);
      },
      (error) => {
        console.error('Error retrieving Authers', error);
      }
    );
  }

  ngOnInit(): void {
    // Initialize filteredItems with all items
    this.getLivre(); // Call method to retrieve Authers

  }

  onClick(item: any) {
    this.selectedItem = item.name;
    this.selectedSubType = item.subTypes;
  }

  toggleDetails(item: any) {
    item.hidden = !item.hidden;
  }

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
        item.titre.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    } else {
      this.filteredItems = [...this.items]; // Show all items if search is empty
    }
  }

  ajouter() {
    this.router.navigate(['/ajouter-livre']); // Redirect to login if member does not exist

    }

    getImageSrc(base64String: string | null): string {
      if (base64String) {
        return `data:image/png;base64,${base64String}`;
      }
      return ''; // Return an empty string if no image
    }

}
