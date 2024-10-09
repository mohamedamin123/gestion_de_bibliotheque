import { stat } from "fs";

export class Livre {
  private _idLivre?: number;
  private _titre: string;
  private _nbrPage: number;
  private _description: string;
  private _star: number;
  private _image: string;
  private  _etat: string | undefined;

  private _statut:boolean;

  private _idAuther?: number;
  private _hidden?: boolean; // Make it optional, as it's not a required field from the database.

  constructor(
    titre: string,
    nbrPage: number,
    description: string,
    image: string,

    star: number,
    idAuther?: number,
    idLivre?: number,
    statut: boolean=false,

  ) {
    this._titre = titre;
    this._nbrPage = nbrPage;
    this._description = description;
    this._image = image;

    this._star = star;
    this._idAuther = idAuther;
    this._idLivre = idLivre;
    this._statut=statut;
  }



  // Getters and Setters
  get idLivre(): number | undefined {
    return this._idLivre;
  }

  set idLivre(idLivre: number) {
    this._idLivre = idLivre;
  }

  get titre(): string {
    return this._titre;
  }

  set titre(titre: string) {
    this._titre = titre;
  }

  get nbrPage(): number {
    return this._nbrPage;
  }

  set nbrPage(nbrPage: number) {
    this._nbrPage = nbrPage;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  get etat(): string | undefined{
    return this._etat;
  }

  set etat(description: string) {
    this._etat = description;
  }

  get image(): string {
    return this._image;
  }

  set image(image: string) {
    this._image = image;
  }

  get star(): number {
    return this._star;
  }

  set star(star: number) {
    this._star = star;
  }

  get idAuther(): number | undefined {
    return this._idAuther;
  }

  set idAuther(idAuther: number) {
    this._idAuther = idAuther;
  }

  // Correct getter and setter for hidden
  get hidden(): boolean {
    return this._hidden ?? false; // Return false if _hidden is undefined
  }

  set hidden(hidden: boolean) {
    this._hidden = hidden;
  }

  get statut(): boolean {
    return this._statut ?? false; // Return false if _hidden is undefined
  }

  set statut(hidden: boolean) {
    this._statut = hidden;
  }
}
