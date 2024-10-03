export class Emprunt {
  private idEmprunt?: number;
  private dateEmprunt: Date;
  private dateRetour: Date;
  private memberId?: number;
  private livreId?: number;

  constructor(
      dateEmprunt: Date,
      dateRetour: Date,
      memberId?: number,
      livreId?: number,
      idEmprunt?: number,

  ) {
      this.dateEmprunt = dateEmprunt;
      this.dateRetour = dateRetour;
      this.memberId = memberId;
      this.livreId = livreId;
      this.idEmprunt = idEmprunt;

  }

  // Getters and Setters
  getIdEmprunt(): number | undefined {
      return this.idEmprunt;
  }

  setIdEmprunt(idEmprunt: number): void {
      this.idEmprunt = idEmprunt;
  }

  getDateEmprunt(): Date {
      return this.dateEmprunt;
  }

  setDateEmprunt(dateEmprunt: Date): void {
      this.dateEmprunt = dateEmprunt;
  }

  getDateRetour(): Date {
      return this.dateRetour;
  }

  setDateRetour(dateRetour: Date): void {
      this.dateRetour = dateRetour;
  }

  getMemberId(): number | undefined {
      return this.memberId;
  }

  setMemberId(memberId: number): void {
      this.memberId = memberId;
  }

  getLivreId(): number | undefined {
      return this.livreId;
  }

  setLivreId(livreId: number): void {
      this.livreId = livreId;
  }
}
