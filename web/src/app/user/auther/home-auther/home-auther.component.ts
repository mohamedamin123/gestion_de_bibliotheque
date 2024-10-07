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

  searchQuery: string = ''; // To hold the search input
  filteredItems: any[] = []; // Filtered items
  loginService: LoginService;
  router: Router;

  constructor(loginService: LoginService, router: Router) {
    this.loginService = loginService;
    this.router = router;
    this.name = this.loginService.name; // Set the member's name if logged in


    // Check if the user is authenticated, if not redirect to the login page
    if (!this.loginService.getEmail() || !this.loginService.name) {
      this.router.navigate(['/login']); // Redirect to login if member does not exist
      return; // Stop further execution if not authenticated
    }
  }



  items = [
    {
      idLivre: 1,
      image: 'images/user.png',
      title: 'Titre 1',
      description: 'Description 1',
      nbrPage: 57,
      nbrStar: 2,
      status: 'disponible',
      hidden: false
    },
    {
      idLivre: 2,
      image: 'images/user.png',
      title: 'Titre 2',
      description: 'Description 2',
      nbrPage: 80,
      nbrStar: 1,
      status: 'disponible',
      hidden: false
    },
    {
      idLivre: 3,
      image: 'images/user.png',
      title: 'Titre 3',
      description: 'Description 3',
      nbrPage: 100,
      nbrStar: 5,
      status: 'ne pas disponible',
      hidden: false
    }
  ];

  ngOnInit(): void {
    // Initialize filteredItems with all items
    this.filteredItems = [...this.items];

  }

  onClick(item: any) {
    this.selectedItem = item.name;
    this.selectedSubType = item.subTypes;
  }

  toggleDetails(item: any) {
    item.hidden = !item.hidden;
  }


  // Filter items based on the search query
  filterItems() {
    if (this.searchQuery.trim()) {
      const query: string = this.searchQuery.toLowerCase().trim();
      this.filteredItems = this.items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    } else {
      this.filteredItems = [...this.items]; // Show all items if search is empty
    }
  }

}
