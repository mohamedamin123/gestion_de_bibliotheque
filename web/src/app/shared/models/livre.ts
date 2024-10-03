export class Livre {
  private idLivre?: number;
  private titre: string;
  private nbrPage: number;
  private idAuther?: number;

  constructor(
      titre: string,
      nbrPage: number,
      idAuther?: number,
      idLivre?: number
  ) {
      this.titre = titre;
      this.nbrPage = nbrPage;
      this.idAuther = idAuther;
      this.idLivre = idLivre;
  }

  // Getters and Setters
  getIdLivre(): number | undefined {
      return this.idLivre;
  }

  setIdLivre(idLivre: number): void {
      this.idLivre = idLivre;
  }

  getTitre(): string {
      return this.titre;
  }

  setTitre(titre: string): void {
      this.titre = titre;
  }

  getNbrPage(): number {
      return this.nbrPage;
  }

  setNbrPage(nbrPage: number): void {
      this.nbrPage = nbrPage;
  }


  getIdAuther(): number | undefined {
      return this.idAuther;
  }

  setIdAuther(idAuther: number): void {
      this.idAuther = idAuther;
  }
}
