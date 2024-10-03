import { User } from './user';

export class Member extends User {
  [x: string]: any;
  private _idMember?: number;
  private _dateDeNaissance?: Date;
  private _dateInscription?: Date;

  constructor(
    nom: string = '',
    prenom: string = '',
    tel: string[] = [],
    email: string = '',
    motDePasse: string = '',
    idMember?: number,
    dateDeNaissance?: Date,
    dateInscription?: Date
  ) {
    super(nom, prenom, tel, email, motDePasse);
    this._idMember = idMember;
    this._dateDeNaissance = dateDeNaissance;
    this._dateInscription = dateInscription;
  }

  // Getters and setters
  get idMember(): number | undefined {
    return this._idMember;
  }

  set idMember(value: number | undefined) {
    this._idMember = value;
  }

  get dateDeNaissance(): Date | undefined {
    return this._dateDeNaissance;
  }

  set dateDeNaissance(value: Date | undefined) {
    this._dateDeNaissance = value;
  }

  get dateInscription(): Date | undefined {
    return this._dateInscription;
  }

  set dateInscription(value: Date | undefined) {
    this._dateInscription = value;
  }
}
