export class User {
  private _nom: string;
  private _prenom: string;
  private _tel: string[];
  private _email: string;
  private _password: string;
  private _statut: boolean;
  private _role: string;
  private _dateDeNaissance?: Date;


  constructor(
    nom: string = '',
    prenom: string = '',
    tel: string[] = [],
    email: string = '',
    password: string = '' ,
    role: string = '' ,
    dateDeNaissance?: Date,

    statut: boolean = true // Changed from 'motDePasse' to 'password'

  ) {
    this._nom = nom;
    this._prenom = prenom;
    this._tel = tel;
    this._email = email;
    this._password = password; // Changed to 'password'
    this._statut=statut;
    this._role = role; // Changed to 'password'
    this._dateDeNaissance = dateDeNaissance;


  }

  // Getters and setters
  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get prenom(): string {
    return this._prenom;
  }

  set prenom(value: string) {
    this._prenom = value;
  }

  get tel(): string[] {
    return this._tel;
  }

  set tel(value: string[]) {
    this._tel = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) { // Changed from 'mot_de_passe' to 'password'
    this._password = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) { // Changed from 'mot_de_passe' to 'password'
    this._role = value;
  }

  get statut(): boolean {
    return this._statut;
  }

  set statut(value: boolean) { // Changed from 'mot_de_passe' to 'password'
    this._statut = value;
  }
  get dateDeNaissance(): Date | undefined {
    return this._dateDeNaissance;
  }

  set dateDeNaissance(value: Date | undefined) {
    this._dateDeNaissance = value;
  }

  get name(){
    return this.prenom+" "+this._nom;
  }
}
