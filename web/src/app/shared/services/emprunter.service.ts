import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { Emprunt } from '../models/emprunt';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {


  private apiUrl = environment.apiUrl+'emprunts/emprunt'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient,private loginService:LoginService) { }

  // Méthode pour obtenir tous les utilisateurs
  findEmprunts(): Observable<Emprunt[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Emprunt[]>(this.apiUrl,httpOptions);
  }

  // Méthode pour obtenir un utilisateur par son ID
  findEmpruntById(Emprunt: Emprunt): Observable<Emprunt> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Emprunt>(`${this.apiUrl}/find-by-id/${Emprunt.getIdEmprunt}`,httpOptions);
  }



  findEmpruntByDateEmprunt(date: Date): Observable<Emprunt> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Emprunt>(`${this.apiUrl}/find-by-date-Emprunt/${date}`,httpOptions);
  }

  findEmpruntByDateReservation(date: Date): Observable<Emprunt> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Emprunt>(`${this.apiUrl}/find-by-date-retour/${date}`,httpOptions);
  }


  findByLivreId(Emprunt: Emprunt): Observable<Emprunt> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Emprunt>(`${this.apiUrl}/find-by-livre-id/${Emprunt.getLivreId}`,httpOptions);
  }

  findByMemberId(Emprunt: Emprunt): Observable<Emprunt> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Emprunt>(`${this.apiUrl}/find-by-member-id/${Emprunt.getMemberId}`,httpOptions);
  }


  findByMemberIdAndLivreId(Emprunt: Emprunt): Observable<Emprunt> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Emprunt>(`${this.apiUrl}/find-by-member-id-and-livre-id/${Emprunt.getMemberId}/${Emprunt.getLivreId}`,httpOptions);
  }



  // Méthode pour créer un nouvel utilisateur
// Méthode pour créer un nouvel utilisateur
saveEmprunt(Emprunt: Emprunt): Observable<Emprunt> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
    })
  };
  return this.http.post<Emprunt>(`${this.apiUrl}/save`, Emprunt,httpOptions);
}

  // Méthode pour mettre à jour un utilisateur
  updateEmprunt(Emprunt: Emprunt): Observable<Emprunt> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    console.log(this.loginService.getEmail());
    console.log(this.loginService.getPassword());
    return this.http.put<Emprunt>(`${this.apiUrl}/update`, Emprunt,httpOptions);
  }


  // Méthode pour supprimer un utilisateur
  deleteEmprunt(Emprunt: Emprunt): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };


    return this.http.delete<void>(`${this.apiUrl}/delete-by-id/${Emprunt.getIdEmprunt}`,httpOptions);
  }

}

