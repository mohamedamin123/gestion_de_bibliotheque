import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RoundPipe } from '../../round.pipe';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home-member',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, CommonModule, FormsModule, RoundPipe],
  templateUrl: './home-member.component.html',
  styleUrls: ['./home-member.component.css']
})
export class HomeMemberComponent implements OnInit {
  selectedItem: string | null = null;
  selectedSubType: string | null = null;

  searchQuery: string = ''; // To hold the search input
  filteredItems: any[] = []; // Filtered items

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
      image: 'images/user.png',
      title: 'Titre 1',
      description: 'Description 1',
      nbrPage: 57,
      nbrStar: 2,
      status:'disponible',
      hidden: false
    },
    {
      image: 'images/user.png',
      title: 'Titre 2',
      description: 'Description 2',
      nbrPage: 80,
      nbrStar: 1,
      status:'disponible',
      hidden: false
    },
    {
      image: 'images/user.png',
      title: 'Titre 3',
      description: 'Description 3',
      nbrPage: 100,
      nbrStar: 5,
      status:'ne pas disponible',

      hidden: false
    },

  ];

  ngOnInit(): void {
    // Set the first category as selected by default
    if (this.categories.length > 0) {
      this.selectedItem = this.categories[0].name;
      this.selectedSubType = this.categories[0].subTypes;
    }

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

  changeLivre(item: any) {
  }

  // Filter items based on the search query
  filterItems() {
    if (this.searchQuery.trim()) {
      const query : string =this.searchQuery.toLowerCase().trim();
      this.filteredItems = this.items.filter(item =>
        item.title.toLowerCase().includes(query)||
        item.description.toLowerCase().includes(query)
      );
    } else {
      this.filteredItems = [...this.items]; // Show all items if search is empty
    }
  }
}
