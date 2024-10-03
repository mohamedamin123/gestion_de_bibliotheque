export class User {
  private _nom: string;
  private _prenom: string;
  private _tel: string[];
  private _email: string;
  private _password: string;

  constructor(
    nom: string = '',
    prenom: string = '',
    tel: string[] = [],
    email: string = '',
    password: string = '' // Changed from 'motDePasse' to 'password'
  ) {
    this._nom = nom;
    this._prenom = prenom;
    this._tel = tel;
    this._email = email;
    this._password = password; // Changed to 'password'
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
}
