import { Livre } from "./livre";
import { Member } from "./member";

export class Reservation {
  private _idReservation?: number;
  private _dateReservation: Date;
  private _memberId?: number;
  private _livreId?: number;
  member?: Member;  // Add this line
  livre?: Livre;
  deletedAt?:Date;

  constructor(
      idReservation?: number,
      memberId?: number,
      livreId?: number,
      dateReservation: Date = new Date() // Default to current date if not provided
  ) {
      this._idReservation = idReservation;
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
