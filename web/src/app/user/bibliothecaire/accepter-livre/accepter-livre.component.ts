import { Component } from '@angular/core';
import { HeaderComponent } from "../../header.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Livre } from '../../../shared/models/livre';
import { LoginService } from '../../../shared/services/login.service';
import { LivreService } from '../../../shared/services/livre.service';
import { AutherService } from '../../../shared/services/auther.service';

@Component({
  selector: 'app-accepter-livre',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet, FormsModule, HeaderComponent],
  templateUrl: './accepter-livre.component.html',
  styleUrl: './accepter-livre.component.css'
})
export class AccepterLivreComponent {



modifierUser(member: Livre) {
  console.log('Current statut:', member.statut);

  // Toggle the statut value
  member.statut = !member.statut; // This will switch true to false and vice versa
  console.log('Nouveau statut:', member);

  this.livreService.updateLivre(member).subscribe(
    () => {
      // After successful update, refresh the member list
      console.log('Updated member:', member);
      this.getLivre();
    },
    () => {
      console.error('Error modifying member');
    }
  );
}



  selectedItem: string | null = null;
  selectedSubType: string | null = null;
  name: string | null = null;

  searchQuery: string = ''; // To hold the search input
  filteredItems: Livre[] = []; // Filtered items
  items: Livre[] = []; // To hold the list of Livres
  pageSize: number = 10; // Items per page
  currentPage: number = 1; // Current page
  totalItems: number = 0; // Total number of Livres
nomAuther: string[] = []; // Array to store author names
idAuther: number[] = []; // Array to store author names
authorMap: { [key: number]: string } = {}; // Map to store author ID and their names

  constructor(
    private loginService: LoginService,
    private autherService : AutherService,
    private router: Router,
    private livreService: LivreService // Inject LivreService
  ) {
    this.name = this.loginService.name; // Set the Livre's name if logged in

    // Check if the user is authenticated, if not redirect to the login page
    if (!this.loginService.getEmail() || !this.loginService.name) {
      this.router.navigate(['/login']); // Redirect to login if Livre does not exist
      return; // Stop further execution if not authenticated
    }
  }

  ngOnInit(): void {
    this.getLivre(); // Call method to retrieve Livres
  }

  getLivre() {
    this.livreService.findAll().subscribe(
        (response: Livre[]) => {
            this.items = response; // Set the items with the retrieved data
            this.totalItems = this.items.length; // Total number of items
            this.applyPagination(); // Apply pagination after receiving the books

            const authorIds = response.map(livre => livre.idAuther); // Extract author IDs
            const uniqueAuthorIds = Array.from(new Set(authorIds)); // Get unique author IDs

            // Fetch authors for all unique author IDs
            uniqueAuthorIds.forEach(authorId => {
                if (authorId !== undefined) {
                    this.autherService.findAutherById(authorId).subscribe(
                        (authorResponse) => {
                            const authorName = `${authorResponse.prenom} ${authorResponse.nom}`;
                            if (authorResponse.idAuther !== undefined) {
                                this.nomAuther.push(authorName); // Store the author name
                                this.authorMap[authorResponse.idAuther] = authorName; // Store author ID and name
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

      this.filteredItems = this.items.filter(item => {
        const matchesTitle = item.titre.toLowerCase().includes(query);
        const matchesDescription = item.description.toLowerCase().includes(query);
        const matchesAuthor = this.nomAuther.some((authorName) =>
          authorName.toLowerCase().includes(query)
        );
        const matchesAuthorId = item.idAuther && this.idAuther.includes(item.idAuther);

        return matchesTitle || matchesDescription || matchesAuthor || matchesAuthorId;
      });
    } else {
      this.applyPagination(); // Reapply pagination if the search query is empty
    }
  }


  retour() {
    this.router.navigate(["liste-livre"])
  }

  save () {
    this.router.navigate(['liste-livre']);

  }
}
