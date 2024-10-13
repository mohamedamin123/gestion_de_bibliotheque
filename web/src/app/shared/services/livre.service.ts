import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Livre } from '../models/livre';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LivreService {


  private apiUrl = environment.apiUrl+'livres/livre'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient,private loginService:LoginService) { }

  // Méthode pour obtenir tous les utilisateurs
  findAll(): Observable<Livre[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Livre[]>(`${this.apiUrl}/find-all`,httpOptions);
  }

  findAllByStatut(statut :boolean): Observable<Livre[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Livre[]>(`${this.apiUrl}/find-by-statut/${statut}`,httpOptions);
  }

  findAllByStatutAndType(statut :boolean,type:string): Observable<Livre[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Livre[]>(`${this.apiUrl}/find-by-statut-and-type/${statut}/${type}`,httpOptions);
  }

  // Méthode pour obtenir un utilisateur par son ID
  findLivreById(id: number): Observable<Livre> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Livre>(`${this.apiUrl}/find-by-id/${id}`,httpOptions);
  }

  findLivreByTitre(Livre: Livre): Observable<Livre> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Livre>(`${this.apiUrl}/find-by-titre/${Livre.titre}`,httpOptions);
  }

  findLivreByIdAuther(id: number): Observable<Livre[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Livre[]>(`${this.apiUrl}/find-by-id-auther/${id}`,httpOptions);
  }



  // Méthode pour créer un nouvel utilisateur
  saveLivre(livre: Livre): Observable<Livre> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail() + ':' + this.loginService.getPassword())
      })
    };

    // Sélectionnez les attributs que vous souhaitez envoyer
    const body = {
      titre: livre.titre,          // Titre du livre
      nbrPage: livre.nbrPage,      // Nombre de pages
      description: livre.description, // Description du livre
      star: 0,             // Étoile de notation
      idAuther:this.loginService.getMember().idAuther, // Assign the author ID
      image:livre.image,
      statut:false,
      etat:"DISPONIBLE",
      type:livre.type
      // N'incluez pas idLivre et idAuther si vous ne souhaitez pas les envoyer
    };

    return this.http.post<Livre>(`${this.apiUrl}/save`, body, httpOptions);
  }


  // Méthode pour mettre à jour un utilisateur
  updateLivre(livre: Livre): Observable<Livre> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    const body = {
      idLivre: livre.idLivre,          // Titre du livre
      type:livre.type,
      titre: livre.titre,          // Titre du livre
      nbrPage: livre.nbrPage,      // Nombre de pages
      description: livre.description, // Description du livre
      star: 0,             // Étoile de notation
      idAuther:this.loginService.getMember().idAuther, // Assign the author ID
      image:livre.image,
      statut:livre.statut,
      etat:livre.etat
      // N'incluez pas idLivre et idAuther si vous ne souhaitez pas les envoyer
    };

    return this.http.put<Livre>(`${this.apiUrl}/update`, body,httpOptions);
  }

  updateLivrePassword(Livre: Livre): Observable<Livre> {

    return this.http.put<Livre>(`${this.apiUrl}/update-password`, Livre);
  }

  // Méthode pour supprimer un utilisateur
  deleteLivre(Livre: Livre): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };


    return this.http.delete<void>(`${this.apiUrl}/delete-by-id/${Livre.idLivre}`,httpOptions);
  }

}


