export class Emprunt {
  private idEmprunt?: number;
  private dateEmprunt: Date;
  private dateRetour: Date;
  private memberId?: number;
  private livreId?: number;

  constructor(
      memberId?: number,
      livreId?: number,

  ) {
    this.dateEmprunt = new Date(); // Current date
    // Set dateRetour to 10 days from today
    this.dateRetour = new Date(); // Current date
    this.dateRetour.setDate(this.dateRetour.getDate() + 10); // 10 days later
      this.memberId = memberId;
      this.livreId = livreId;
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
