export class Reservation {
  private _idReservation?: number;
  private _dateReservation: Date;
  private _memberId?: number;
  private _livreId?: number;

  constructor(
      memberId?: number,
      livreId?: number,
      dateReservation: Date = new Date() // Default to current date if not provided
  ) {
      this._memberId = memberId;
      this._livreId = livreId;
      this._dateReservation = dateReservation;
  }

  // Getters and Setters
  get idReservation(): number | undefined {
      return this._idReservation;
  }

  set idReservation(idReservation: number) {
      this._idReservation = idReservation;
  }

  get dateReservation(): Date {
      return this._dateReservation;
  }

  set dateReservation(dateReservation: Date) {
      this._dateReservation = dateReservation;
  }

  get memberId(): number | undefined {
      return this._memberId;
  }

  set memberId(memberId: number | undefined) {
      this._memberId = memberId;
  }

  get livreId(): number | undefined {
      return this._livreId;
  }

  set livreId(livreId: number | undefined) {
      this._livreId = livreId;
  }
}
