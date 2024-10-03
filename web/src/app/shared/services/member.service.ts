import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../models/member';
@Injectable({
  providedIn: 'root'
})
export class MemberService {


  private apiUrl = 'http://localhost:8082/members/member'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir tous les utilisateurs
  findMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  // Méthode pour obtenir un utilisateur par son ID
  findMemberById(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour créer un nouvel utilisateur
// Méthode pour créer un nouvel utilisateur
saveMember(member: Member): Observable<Member> {
  return this.http.post<Member>(`${this.apiUrl}/save`, member);
}

  // Méthode pour mettre à jour un utilisateur
  updateMember(Member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.apiUrl}/${Member.idMember}`, Member);
  }

  // Méthode pour supprimer un utilisateur
  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


