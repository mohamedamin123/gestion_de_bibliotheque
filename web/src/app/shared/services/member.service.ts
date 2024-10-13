import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../models/member';
import { environment } from '../../environments/environment';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class MemberService {


  private apiUrl = environment.apiUrl+'members/member'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient,private loginService:LoginService) { }

  // Méthode pour obtenir tous les utilisateurs
  findAll(): Observable<Member[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Member[]>(`${this.apiUrl}/find-all`,httpOptions);
  }

  // Méthode pour obtenir un utilisateur par son ID
  findMemberById(id: number): Observable<Member> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Member>(`${this.apiUrl}/find-by-id/${id}`,httpOptions);
  }

  findMemberByEmail(email: String): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/find-by-email/${email}`);
  }

  findMemberByTel(member:Member): Observable<Member> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    return this.http.get<Member>(`${this.apiUrl}/find-by-tel/${member.tel}`,httpOptions);
  }

  // Méthode pour créer un nouvel utilisateur
// Méthode pour créer un nouvel utilisateur
saveMember(member: Member): Observable<Member> {
  return this.http.post<Member>(`${this.apiUrl}/save`, member);
}

  // Méthode pour mettre à jour un utilisateur
  updateMember(member: Member): Observable<Member> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };
    console.log(this.loginService.getEmail());
    console.log(this.loginService.getPassword());
    return this.http.put<Member>(`${this.apiUrl}/update`, member,httpOptions);
  }

  updateMemberPassword(member: Member): Observable<Member> {

    return this.http.put<Member>(`${this.apiUrl}/update-password`, member);
  }

  // Méthode pour supprimer un utilisateur
  deleteMember(member: Member): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.loginService.getEmail()+ ':' +this.loginService.getPassword())
      })
    };


    return this.http.delete<void>(`${this.apiUrl}/delete-by-id/${member.idMember}`,httpOptions);
  }


}


