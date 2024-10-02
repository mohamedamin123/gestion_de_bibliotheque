package org.bibliotheque.bibliotheque.repository;

import jakarta.validation.constraints.NotNull;
import org.bibliotheque.bibliotheque.modele.entity.Emprunt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository

public interface EmpruntRepo extends JpaRepository<Emprunt,Integer> {
    Optional<Emprunt> findEmpruntByIdEmprunt(Integer id);


    List<Emprunt> findEmpruntByDateEmprunt(@NotNull(message = "La date d'emprunt ne doit pas être vide") Date dateEmprunt);

    List<Emprunt> findEmpruntByDateRetour(@NotNull(message = "La date de retour ne doit pas être vide") Date dateEmprunt);

    List<Emprunt> findEmpruntByLivreId (Integer idLivre);
    List<Emprunt> findEmpruntByMemberId (Integer idEmprunt);

    List<Emprunt> findEmpruntByMemberIdAndLivreId (Integer idEmprunt,Integer idLivre);



}
