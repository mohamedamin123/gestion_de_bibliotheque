// ReservationModalComponent
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RoundPipe } from '../../../../round.pipe';
import { HeaderComponent } from '../../../header.component';
import { Livre } from '../../../../shared/models/livre';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.css'],
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, CommonModule, FormsModule, RoundPipe, HeaderComponent],
})
export class ReservationModalComponent {
  @Input() reservationDate: Date | null = null;
  @Input() returnDate: Date | null = null;
  @Input() livre: Livre | null = null; // Input for the book
  @Output() close = new EventEmitter<void>();
  @Output() emprunterConfirmed = new EventEmitter<Livre>(); // Emit the Livre object on confirmation

  constructor() {}

  closeModal() {
    this.close.emit(); // Notify parent to close the modal
  }

  emprunter() {
    if (this.livre) {
      this.emprunterConfirmed.emit(this.livre); // Emit the event with the book
    } else {
      console.error("No livre selected for borrowing");
    }
  }

  retour() {
    this.closeModal();
    console.log("retour");
  }
}
