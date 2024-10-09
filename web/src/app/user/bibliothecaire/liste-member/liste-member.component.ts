import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Member } from '../../../shared/models/member'; // Model
import { MemberService } from '../../../shared/services/member.service'; // Service for API requests
import { LoginService } from '../../../shared/services/login.service';
import { HeaderComponent } from "../../header.component"; // Service for authentication
 
@Component({
  selector: 'app-liste-member',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet, FormsModule, HeaderComponent],
  templateUrl: './liste-member.component.html',
  styleUrl: './liste-member.component.css'
})
export class ListeMemberComponent {


  selectedItem: string | null = null;
  selectedSubType: string | null = null;
  name: string | null = null;

  searchQuery: string = ''; // To hold the search input
  filteredItems: Member[] = []; // Filtered items
  items: Member[] = []; // To hold the list of members
  pageSize: number = 10; // Items per page
  currentPage: number = 1; // Current page
  totalItems: number = 0; // Total number of members

  constructor(
    private loginService: LoginService,
    private router: Router,
    private memberService: MemberService // Inject MemberService
  ) {
    this.name = this.loginService.name; // Set the member's name if logged in

    // Check if the user is authenticated, if not redirect to the login page

  }

  ngOnInit(): void {
    if (!this.loginService.getEmail() || !this.loginService.name) {
      this.router.navigate(['/login']); // Redirect to login if member does not exist
      return; // Stop further execution if not authenticated
    }
    this.getMembers(); // Call method to retrieve members
  }

  getMembers() {
    this.memberService.findAll().subscribe(
      (response: Member[]) => {
        this.items = response; // Set the items with the retrieved data
        this.totalItems = this.items.length; // Total number of items
        this.applyPagination(); // Apply pagination after receiving members
        console.log(response);
      },
      (error) => {
        console.error('Error retrieving members', error);
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

  consulterUser(member: Member) {
    this.router.navigate(['/consulter-user'], { state: { member } });


  }
  modifierUser(member: Member) {
    console.log('Current statut:', member.statut);

    // Toggle the statut value
    member.statut = !member.statut; // This will switch true to false and vice versa
    console.log('Nouveau statut:', member);

    this.memberService.updateMember(member).subscribe(
      () => {
        // After successful update, refresh the member list
        console.log('Updated member:', member);
        this.getMembers();
      },
      (error) => {
        console.error('Error modifying member', error);
      }
    );
  }

  deleteUser(member: Member) {
    // Confirm deletion (optional, but recommended for user experience)
    const confirmDelete = confirm(`Are you sure you want to delete ${member.nom} ${member.prenom}?`);
    console.log(member);
    if (confirmDelete) {
      // Ensure member.idMember is defined before calling deleteMember
      if (member.idMember !== undefined) {
        this.memberService.deleteMember(member).subscribe(
          () => {
            // After successful deletion, refresh the member list
            this.getMembers();
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

  retour() {
    if(this.loginService.getMember().role=='BIBLIOTHECAIRE')
    this.router.navigate(["home-bibliothecaire"])
    else if(this.loginService.getMember().role=='ADMIN')
      this.router.navigate(["home-admin"])
  }
}
