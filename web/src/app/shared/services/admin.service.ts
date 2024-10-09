import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Admin } from '../models/admin';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private apiUrl = environment.apiUrl+'admins/admin'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient,private loginService:LoginService) { }

  // Méthode pour obtenir tous les utilisateurs
  findAll(): Observable<Admin[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Admin[]>(`${this.apiUrl}/find-all`,httpOptions);
  }

  // Méthode pour obtenir un utilisateur par son ID
  findAdminById(id: number): Observable<Admin> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Admin>(`${this.apiUrl}/find-by-id/${id}`,httpOptions);
  }

  findAdminByEmail(email: String): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/find-by-email/${email}`);
  }


  // Méthode pour créer un nouvel utilisateur
// Méthode pour créer un nouvel utilisateur
saveAdmin(Admin: Admin): Observable<Admin> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
    })
  };
  return this.http.post<Admin>(`${this.apiUrl}/save`, Admin,httpOptions);
}

  // Méthode pour mettre à jour un utilisateur
  updateAdmin(Admin: Admin): Observable<Admin> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    console.log(this.loginService.getEmail());
    console.log(this.loginService.getPassword());
    return this.http.put<Admin>(`${this.apiUrl}/update`, Admin,httpOptions);
  }

  updateAdminPassword(Admin: Admin): Observable<Admin> {

    return this.http.put<Admin>(`${this.apiUrl}/update-password`, Admin);
  }

  // Méthode pour supprimer un utilisateur
  deleteAdmin(Admin: Admin): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };


    return this.http.delete<void>(`${this.apiUrl}/delete-by-id/${Admin.idAdmin}`,httpOptions);
  }

}


