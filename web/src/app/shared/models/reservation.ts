export class Reservation {
  private idReservation?: number;
  private dateReservation: Date;
  private memberId?: number;
  private livreId?: number;

  constructor(
      dateReservation: Date,
      memberId?: number,
      livreId?: number,
  ) {
      this.dateReservation = dateReservation;
      this.memberId = memberId;
      this.livreId = livreId;
  }

  // Getters and Setters
  getIdReservation(): number | undefined {
      return this.idReservation;
  }

  setIdReservation(idReservation: number): void {
      this.idReservation = idReservation;
  }

  getDateReservation(): Date {
      return this.dateReservation;
  }

  setDateReservation(dateReservation: Date): void {
      this.dateReservation = dateReservation;
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
