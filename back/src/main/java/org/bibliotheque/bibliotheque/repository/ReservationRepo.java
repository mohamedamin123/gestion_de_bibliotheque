package org.bibliotheque.bibliotheque.repository;

import jakarta.validation.constraints.NotNull;
import org.bibliotheque.bibliotheque.modele.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository

public interface ReservationRepo extends JpaRepository<Reservation,Integer> {
    Optional<Reservation> findReservationByIdReservation(Integer id);

    List<Reservation> findReservationByDateReservation(@NotNull(message = "La date d'Reservation ne doit pas être vide") Date dateReservation);

    List<Reservation> findReservationByLivreId (Integer idLivre);
    List<Reservation> findReservationByMemberId (Integer idReservation);

    List<Reservation> findReservationByMemberIdAndLivreId (Integer idReservation,Integer idLivre);



}
