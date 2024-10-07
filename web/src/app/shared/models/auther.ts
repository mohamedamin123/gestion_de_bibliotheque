import { User } from './user';

export class Auther extends User {
  private _idAuther?: number;
  private _nationalite: string;

  constructor(
    nom: string = '',
    prenom: string = '',
    tel: string[] = [],
    email: string = '',
    motDePasse: string = '',
    statut: boolean,
    role:string,
    idAuther?: number,
    dateDeNaissance?: Date,
    nationalite: string = ''
  ) {
    super(nom, prenom, tel, email, motDePasse,role,dateDeNaissance,statut);
    this._idAuther = idAuther;
    this._nationalite = nationalite;
  }

  // Getters and setters
  get idAuther(): number | undefined {
    return this._idAuther;
  }

  set idAuther(value: number | undefined) {
    this._idAuther = value;
  }

  get nationalite(): string {
    return this._nationalite;
  }

  set nationalite(value: string) {
    this._nationalite = value;
  }
}
