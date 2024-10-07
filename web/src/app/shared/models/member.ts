import { User } from './user';

export class Member extends User {
  [x: string]: any;
  private _idMember?: number;
  private _dateInscription?: Date;

  constructor(
    nom: string = '',
    prenom: string = '',
    tel: string[] = [],
    email: string = '',
    motDePasse: string = '',
    statut: boolean,
    role:string,
    idMember?: number,
    dateDeNaissance?: Date,
    dateInscription?: Date
  ) {
    super(nom, prenom, tel, email, motDePasse,role,dateDeNaissance,statut);
    this._idMember = idMember;
    this._dateInscription = dateInscription;
  }

  // Getters and setters
  get idMember(): number | undefined {
    return this._idMember;
  }

  set idMember(value: number | undefined) {
    this._idMember = value;
  }



  get dateInscription(): Date | undefined {
    return this._dateInscription;
  }

  set dateInscription(value: Date | undefined) {
    this._dateInscription = value;
  }
}
