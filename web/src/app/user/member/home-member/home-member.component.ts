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

@Component({
  selector: 'app-home-member',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, CommonModule, FormsModule, RoundPipe, HeaderComponent],
  templateUrl: './home-member.component.html',
  styleUrls: ['./home-member.component.css']
})
export class HomeMemberComponent implements OnInit {
  selectedItem: string | null = null;
  selectedSubType: string | null = null;
  name: string | null = null;

  searchQuery: string = ''; // To hold the search input
  filteredItems: any[] = []; // Filtered items
  loginService: LoginService;
  router: Router;
  emprunt: EmpruntService;
  reserver: ReservationService;
  
  constructor(loginService: LoginService, router: Router, emprunt: EmpruntService, reserver: ReservationService) {
    this.loginService = loginService;
    this.router = router;
    this.name = this.loginService.name; // Set the member's name if logged in
    this.emprunt = emprunt;
    this.reserver = reserver;

    // Check if the user is authenticated, if not redirect to the login page
    if (!this.loginService.getEmail() || !this.loginService.name) {
      this.router.navigate(['/login']); // Redirect to login if member does not exist
      return; // Stop further execution if not authenticated
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
    // Set the first category as selected by default
    if (this.categories.length > 0) {
      this.selectedItem = this.categories[0].name;
      this.selectedSubType = this.categories[0].subTypes;
    }

    // Initialize filteredItems with all items
    this.filteredItems = [...this.items];

    // Listen for back button navigation

  }

  onClick(item: any) {
    this.selectedItem = item.name;
    this.selectedSubType = item.subTypes;
  }

  toggleDetails(item: any) {
    item.hidden = !item.hidden;
  }

  changeLivre(item: any) {

    if (item.status === "disponible") {
      console.log("emprunter");
      const emp = new Emprunt(this.loginService.getMember()?.idMember, item.idLivre);
      this.emprunt.saveEmprunt(emp).subscribe(
        response => {
          console.log("save emprunt")
          // Redirect or show a success message
        },
        error => {
          console.error('Error updating profile', error);
          // Handle the error case
        }
      );

    } else {
      console.log("reserve");

    }
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
