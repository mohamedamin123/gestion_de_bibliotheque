import { Component } from '@angular/core';
import { HeaderComponent } from "../../header.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { Auther } from '../../../shared/models/auther';
import { AutherService } from '../../../shared/services/auther.service';
import { LoginService } from '../../../shared/services/login.service';
import { LivreService } from '../../../shared/services/livre.service';
import { Livre } from '../../../shared/models/livre';
import { RoundPipe } from "../../../round.pipe";

@Component({
    selector: 'app-liste-livre',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet, FormsModule, HeaderComponent, RoundPipe],
    templateUrl: './liste-livre.component.html',
    styleUrls: ['./liste-livre.component.css']
})
export class ListeLivreComponent {
    selectedItem: string | null = null;
    selectedSubType: string | null = null;
    name: string | null = null;
    nomAuther: string[] = []; // Array to store author names
    idAuther: number[] = []; // Array to store author names
    authorMap: { [key: number]: string } = {}; // Map to store author ID and their names

    searchQuery: string = ''; // To hold the search input
    filteredItems: Livre[] = []; // Filtered items
    items: Livre[] = []; // To hold the list of Authers
    pageSize: number = 10; // Items per page
    currentPage: number = 1; // Current page
    totalItems: number = 0; // Total number of Authers
    etat: any;

    constructor(
        private loginService: LoginService,
        private router: Router,
        private livreService: LivreService, // Inject AutherService,
        private autherService: AutherService // Inject AutherService
    ) {
        this.name = this.loginService.name; // Set the Auther's name if logged in

        // Check if the user is authenticated, if not redirect to the login page
        if (!this.loginService.getEmail() || !this.loginService.name) {
            this.router.navigate(['/login']); // Redirect to login if Auther does not exist
            return; // Stop further execution if not authenticated
        }
    }

    ngOnInit(): void {
        this.getLivre(); // Call method to retrieve Authers
    }

    getLivre() {
        this.livreService.findAllByStatut(true).subscribe(
            (response: Livre[]) => {
                this.items = response; // Set the items with the retrieved data
                this.totalItems = this.items.length; // Total number of items
                this.applyPagination(); // Apply pagination after receiving the books
                console.log(response);

                const authorIds = response.map(livre => livre.idAuther); // Extract author IDs
                const uniqueAuthorIds = Array.from(new Set(authorIds)); // Get unique author IDs

                // Fetch authors for all unique author IDs
                uniqueAuthorIds.forEach(authorId => {
                  if (authorId !== undefined) {
                      this.autherService.findAutherById(authorId).subscribe(
                          (authorResponse) => {
                              const authorName = `${authorResponse.prenom} ${authorResponse.nom}`;

                              // Ensure idAuther is defined before using it
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
        this.router.navigate(["home-bibliothecaire"]);
    }

    save() {
        this.router.navigate(['home-bibliothecaire']);
    }

    getImageSrc(base64String: string | null): string {
        if (base64String) {
            return `data:image/png;base64,${base64String}`;
        }
        return ''; // Return an empty string if no image
    }

    toggleDetails(item: any) {
        item.hidden = !item.hidden;
    }
    accepter() {
      this.router.navigate(["accepter-livre"]);
    }
}
