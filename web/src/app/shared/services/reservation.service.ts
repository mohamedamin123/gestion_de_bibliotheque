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
  findAll(): Observable<Reservation[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Reservation[]>(this.apiUrl+"/find-all",httpOptions);
  }

  // Méthode pour obtenir un utilisateur par son ID
  findReservationById(Reservation: Reservation): Observable<Reservation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Reservation>(`${this.apiUrl}/find-by-id/${Reservation.idReservation}`,httpOptions);
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

  findByMemberId(id: number): Observable<Reservation []> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Reservation []>(`${this.apiUrl}/find-by-member-id/${id}`,httpOptions);
  }


  findByMemberIdAndLivreId(Reservation: Reservation): Observable<Reservation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Reservation>(`${this.apiUrl}/find-by-member-id-and-livre-id/${Reservation.memberId}/${Reservation.livreId}`,httpOptions);
  }



  // Méthode pour créer un nouvel utilisateur
// Méthode pour créer un nouvel utilisateur
saveReservation(reservation: Reservation): Observable<Reservation> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
    })
  };
  const body = {
    livreId: reservation.livreId,
    memberId: reservation.memberId,
  };
  console.log( reservation.memberId);
  console.log( reservation.livreId);

  return this.http.post<Reservation>(`${this.apiUrl}/save`, body,httpOptions);
}

  // Méthode pour mettre à jour un utilisateur
  updateReservation(reservation: Reservation): Observable<Reservation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    const body = {
      livreId: reservation.livreId,
      memberId: reservation.memberId,
    };
    return this.http.put<Reservation>(`${this.apiUrl}/update`, body,httpOptions);
  }


  // Méthode pour supprimer un utilisateur
  deleteReservation(id: number): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };


    return this.http.delete<void>(`${this.apiUrl}/delete-by-id/${id}`,httpOptions);
  }

}
