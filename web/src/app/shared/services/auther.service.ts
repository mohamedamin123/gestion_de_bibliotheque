import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Auther } from '../models/auther';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AutherService {


  private apiUrl = environment.apiUrl+'authers/auther'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient,private loginService:LoginService) { }

  // Méthode pour obtenir tous les utilisateurs
  findAll(): Observable<Auther[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Auther[]>(`${this.apiUrl}/find-all`,httpOptions);
  }

  // Méthode pour obtenir un utilisateur par son ID
  findAutherById(id: number): Observable<Auther> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Auther>(`${this.apiUrl}/find-by-id/${id}`,httpOptions);
  }

  findAutherByEmail(email: String): Observable<Auther> {
    return this.http.get<Auther>(`${this.apiUrl}/find-by-email/${email}`);
  }

  findAutherByTel(Auther:Auther): Observable<Auther> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Auther>(`${this.apiUrl}/find-by-tel/${Auther.tel}`,httpOptions);
  }

  // Méthode pour créer un nouvel utilisateur
// Méthode pour créer un nouvel utilisateur
saveAuther(Auther: Auther): Observable<Auther> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
    })
  };
  return this.http.post<Auther>(`${this.apiUrl}/save`, Auther,httpOptions);
}

  // Méthode pour mettre à jour un utilisateur
  updateAuther(Auther: Auther): Observable<Auther> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    console.log(this.loginService.getEmail());
    console.log(this.loginService.getPassword());
    return this.http.put<Auther>(`${this.apiUrl}/update`, Auther,httpOptions);
  }

  updateAutherPassword(Auther: Auther): Observable<Auther> {

    return this.http.put<Auther>(`${this.apiUrl}/update-password`, Auther);
  }

  // Méthode pour supprimer un utilisateur
  deleteAuther(Auther: Auther): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };


    return this.http.delete<void>(`${this.apiUrl}/delete-by-id/${Auther.idAuther}`,httpOptions);
  }

}


