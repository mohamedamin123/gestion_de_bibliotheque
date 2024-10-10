export class Emprunt {
  private _idEmprunt?: number;
  private _dateEmprunt: Date;
  private _dateRetour: Date;
  private _memberId?: number;
  private _livreId?: number;

  constructor(
      memberId?: number,
      livreId?: number,
  ) {
      this._dateEmprunt = new Date(); // Current date
      // Set dateRetour to 10 days from today
      this._dateRetour = new Date(); // Current date
      this._dateRetour.setDate(this._dateRetour.getDate() + 10); // 10 days later
      this._memberId = memberId;
      this._livreId = livreId;
  }

  // Getters and Setters
  get idEmprunt(): number | undefined {
      return this._idEmprunt;
  }

  set idEmprunt(idEmprunt: number) {
      this._idEmprunt = idEmprunt;
  }

  get dateEmprunt(): Date {
      return this._dateEmprunt;
  }

  set dateEmprunt(dateEmprunt: Date) {
      this._dateEmprunt = dateEmprunt;
  }

  get dateRetour(): Date {
      return this._dateRetour;
  }

  set dateRetour(dateRetour: Date) {
      this._dateRetour = dateRetour;
  }

  get memberId(): number | undefined {
      return this._memberId;
  }

  set memberId(memberId: number) {
      this._memberId = memberId;
  }

  get livreId(): number | undefined {
      return this._livreId;
  }

  set livreId(livreId: number) {
      this._livreId = livreId;
  }
}
