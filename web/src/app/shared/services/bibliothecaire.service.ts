import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Bibliothecaire } from '../models/bibliothecaire';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class BibliothecaireService {


  private apiUrl = environment.apiUrl+'bibliothecaires/bibliothecaire'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient,private loginService:LoginService) { }

  // Méthode pour obtenir tous les utilisateurs
  findAll(): Observable<Bibliothecaire[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Bibliothecaire[]>(`${this.apiUrl}/find-all`,httpOptions);
  }

  // Méthode pour obtenir un utilisateur par son ID
  findBibliothecaireById(Bibliothecaire: Bibliothecaire): Observable<Bibliothecaire> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Bibliothecaire>(`${this.apiUrl}/find-by-id/${Bibliothecaire.idBibliothecaire}`,httpOptions);
  }

  findBibliothecaireByEmail(email: String): Observable<Bibliothecaire> {
    return this.http.get<Bibliothecaire>(`${this.apiUrl}/find-by-email/${email}`);
  }

  findBibliothecaireByTel(Bibliothecaire:Bibliothecaire): Observable<Bibliothecaire> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Bibliothecaire>(`${this.apiUrl}/find-by-tel/${Bibliothecaire.tel}`,httpOptions);
  }

  // Méthode pour créer un nouvel utilisateur
// Méthode pour créer un nouvel utilisateur
saveBibliothecaire(Bibliothecaire: Bibliothecaire): Observable<Bibliothecaire> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
    })
  };
  return this.http.post<Bibliothecaire>(`${this.apiUrl}/save`, Bibliothecaire,httpOptions);
}

  // Méthode pour mettre à jour un utilisateur
  updateBibliothecaire(Bibliothecaire: Bibliothecaire): Observable<Bibliothecaire> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    console.log(this.loginService.getEmail());
    console.log(this.loginService.getPassword());
    return this.http.put<Bibliothecaire>(`${this.apiUrl}/update`, Bibliothecaire,httpOptions);
  }

  updateBibliothecairePassword(Bibliothecaire: Bibliothecaire): Observable<Bibliothecaire> {

    return this.http.put<Bibliothecaire>(`${this.apiUrl}/update-password`, Bibliothecaire);
  }

  // Méthode pour supprimer un utilisateur
  deleteBibliothecaire(Bibliothecaire: Bibliothecaire): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };


    return this.http.delete<void>(`${this.apiUrl}/delete-by-id/${Bibliothecaire.idBibliothecaire}`,httpOptions);
  }

}


