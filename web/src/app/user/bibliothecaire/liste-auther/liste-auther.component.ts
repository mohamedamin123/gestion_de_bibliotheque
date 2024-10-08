import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auther } from '../../../shared/models/auther';
import { LoginService } from '../../../shared/services/login.service';
import { AsyncSubject } from 'rxjs';
import { AutherService } from '../../../shared/services/auther.service';
import { HeaderComponent } from "../../header.component";

@Component({
  selector: 'app-liste-auther',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet, FormsModule, HeaderComponent],
  templateUrl: './liste-auther.component.html',
  styleUrl: './liste-auther.component.css'
})
export class ListeAutherComponent {


  consulterUser(auther: Auther) {
    // Pass the Auther object as a parameter or serialize it
    this.router.navigate(['/consulter-user'], { state: { auther } });
  }
modifierUser(member: Auther) {
  console.log('Current statut:', member.statut);

  // Toggle the statut value
  member.statut = !member.statut; // This will switch true to false and vice versa
  console.log('Nouveau statut:', member);

  this.autherService.updateAuther(member).subscribe(
    () => {
      // After successful update, refresh the member list
      console.log('Updated member:', member);
      this.getAuthers();
    },
    (error) => {
      console.error('Error modifying member', error);
    }
  );
}

deleteUser(member: Auther) {
  // Confirm deletion (optional, but recommended for user experience)
  const confirmDelete = confirm(`Are you sure you want to delete ${member.nom} ${member.prenom}?`);
  console.log(member);
  if (confirmDelete) {
    // Ensure member.idMember is defined before calling deleteMember
    if (member.idAuther !== undefined) {
      this.autherService.deleteAuther(member).subscribe(
        () => {
          // After successful deletion, refresh the member list
          this.getAuthers();
        },
        (error) => {
          console.error('Error deleting member', error);
        }
      );
    } else {
      console.error('Member ID is undefined, cannot delete member');
    }
  }
}

  selectedItem: string | null = null;
  selectedSubType: string | null = null;
  name: string | null = null;

  searchQuery: string = ''; // To hold the search input
  filteredItems: Auther[] = []; // Filtered items
  items: Auther[] = []; // To hold the list of Authers
  pageSize: number = 10; // Items per page
  currentPage: number = 1; // Current page
  totalItems: number = 0; // Total number of Authers
etat: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
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
    this.getAuthers(); // Call method to retrieve Authers
  }

  getAuthers() {
    this.autherService.findAll().subscribe(
      (response: Auther[]) => {
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

  retour() {
    this.router.navigate(["home-bibliothecaire"])
  }

  save () {
    this.router.navigate(['consulter-user']);

  }
}
