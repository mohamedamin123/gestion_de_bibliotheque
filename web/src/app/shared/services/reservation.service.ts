import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Reservation } from '../models/reservation';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {


  private apiUrl = environment.apiUrl+'reservations/reservation'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient,private loginService:LoginService) { }

  // Méthode pour obtenir tous les utilisateurs
  findReservations(): Observable<Reservation[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Reservation[]>(this.apiUrl,httpOptions);
  }

  // Méthode pour obtenir un utilisateur par son ID
  findReservationById(Reservation: Reservation): Observable<Reservation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Reservation>(`${this.apiUrl}/find-by-id/${Reservation.getIdReservation}`,httpOptions);
  }

  findReservationByDateReservation(date: Date): Observable<Reservation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Reservation>(`${this.apiUrl}/find-by-date-Reservation/${date}`,httpOptions);
  }

  findByLivreId(id: number): Observable<Reservation []> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Reservation []>(`${this.apiUrl}/find-by-livre-id/${id}`,httpOptions);
  }

  findByMemberId(Reservation: Reservation): Observable<Reservation []> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Reservation []>(`${this.apiUrl}/find-by-member-id/${Reservation.getMemberId}`,httpOptions);
  }


  findByMemberIdAndLivreId(Reservation: Reservation): Observable<Reservation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Reservation>(`${this.apiUrl}/find-by-member-id-and-livre-id/${Reservation.getMemberId}/${Reservation.getLivreId}`,httpOptions);
  }



  // Méthode pour créer un nouvel utilisateur
// Méthode pour créer un nouvel utilisateur
saveReservation(Reservation: Reservation): Observable<Reservation> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
    })
  };
  return this.http.post<Reservation>(`${this.apiUrl}/save`, Reservation,httpOptions);
}

  // Méthode pour mettre à jour un utilisateur
  updateReservation(Reservation: Reservation): Observable<Reservation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    console.log(this.loginService.getEmail());
    console.log(this.loginService.getPassword());
    return this.http.put<Reservation>(`${this.apiUrl}/update`, Reservation,httpOptions);
  }


  // Méthode pour supprimer un utilisateur
  deleteReservation(Reservation: Reservation): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };


    return this.http.delete<void>(`${this.apiUrl}/delete-by-id/${Reservation.getIdReservation}`,httpOptions);
  }

}
