import { User } from "./user";

export class Admin extends User {
  private _idAdmin?: number;

  constructor(
    nom: string = '',
    prenom: string = '',
    tel: string[] = [],
    email: string = '',
    motDePasse: string = '',
    statut: boolean,
    role:string,
    idAdmin?: number,
    dateDeNaissance?: Date,
  ) {
    super(nom, prenom, tel, email, motDePasse,role,dateDeNaissance,statut);
    this._idAdmin = idAdmin;
  }

  // Getters and setters
  get idAdmin(): number | undefined {
    return this._idAdmin;
  }

  set idAdmin(value: number | undefined) {
    this._idAdmin = value;
  }

}
