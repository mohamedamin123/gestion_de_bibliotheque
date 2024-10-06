import { Component, OnInit } from '@angular/core';
import { Member } from '../../shared/models/member';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-bloque',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './bloque.component.html',
  styleUrl: './bloque.component.css'
})
export class BloqueComponent {



  userCourant: Member | null=null;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
  )
  {
    this.userCourant=loginService.getMember();
    if(this.userCourant?.statut==true)
      this.router.navigate(['/login']); // Navigate to home or any other route

    if(this.userCourant==null )
      this.router.navigate(['/login']); // Navigate to home or any other route

  }
  retour() {
        this.router.navigate(['/login']); // Navigate to home or any other route
      }

}
