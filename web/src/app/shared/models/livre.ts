export class Livre {
  private _idLivre?: number;
  private _titre: string;
  private _nbrPage: number;
  private _description: string;
  private _star: number;
  private _idAuther?: number;

  constructor(
    titre: string,
    nbrPage: number,
    description: string,
    star: number,
    idAuther?: number,
    idLivre?: number
  ) {
    this._titre = titre;
    this._nbrPage = nbrPage;
    this._description = description;
    this._star = star;
    this._idAuther = idAuther;
    this._idLivre = idLivre;
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
}
