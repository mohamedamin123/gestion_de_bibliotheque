package org.bibliotheque.bibliotheque.repository;

import jakarta.validation.constraints.Size;
import org.bibliotheque.bibliotheque.modele.entity.Livre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface LivreRepo extends JpaRepository<Livre,Integer> {
    Optional<Livre> findLivreByIdLivre(Integer id);

    List<Livre> findLivreByTitre(String titre);

    List<Livre> findLivreByIdAuther(Integer id);

    List<Livre> findLivreByStatut(boolean statut);



}
