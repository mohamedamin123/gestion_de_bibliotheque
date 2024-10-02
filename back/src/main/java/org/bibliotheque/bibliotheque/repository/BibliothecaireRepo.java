package org.bibliotheque.bibliotheque.repository;

import jakarta.validation.constraints.Size;
import org.bibliotheque.bibliotheque.modele.entity.Bibliothecaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface BibliothecaireRepo extends JpaRepository<Bibliothecaire,Integer> {


    List<Bibliothecaire> findBibliothecairesByPrenomOrNom(String prenom,String nom);


    Optional<Bibliothecaire> findBibliothecaireByIdBibliothecaire(Integer id);


    Optional<Bibliothecaire> findBibliothecaireByEmail(String email);
    Optional<Bibliothecaire> findBibliothecaireByTel(@Size(min = 1, max = 2, message = "Vous devez fournir entre 1 et 2 numéros de téléphone") List<String> tel);


}
