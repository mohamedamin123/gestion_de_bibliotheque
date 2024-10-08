import { User } from './user';

export class Bibliothecaire extends User {
  private _idBibliothecaire?: number;
  private _matricule: string;

  constructor(
    nom: string = '',
    prenom: string = '',
    tel: string[] = [],
    email: string = '',
    motDePasse: string = '',
    statut: boolean,
    role:string,
    idBibliothecaire?: number,
    dateDeNaissance?: Date,
    matricule: string = ''
  ) {
    super(nom, prenom, tel, email, motDePasse,role,dateDeNaissance,statut);
    this._idBibliothecaire = idBibliothecaire;
    this._matricule = matricule;
  }

  // Getters and setters
  get idBibliothecaire(): number | undefined {
    return this._idBibliothecaire;
  }

  set idBibliothecaire(value: number | undefined) {
    this._idBibliothecaire = value;
  }

  get matricule(): string {
    return this._matricule;
  }

  set matricule(value: string) {
    this._matricule = value;
  }
}
