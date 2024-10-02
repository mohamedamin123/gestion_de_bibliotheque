package org.bibliotheque.bibliotheque.repository;

import jakarta.validation.constraints.Size;
import org.bibliotheque.bibliotheque.modele.entity.Auther;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository

public interface AutherRepo extends JpaRepository<Auther,Integer> {


    List<Auther> findAuthersByPrenomOrNom(String prenom,String nom);


    Optional<Auther> findAutherByIdAuther(Integer id);


    Optional<Auther> findAutherByEmail(String email);
    Optional<Auther> findAutherByTel(@Size(min = 1, max = 2, message = "Vous devez fournir entre 1 et 2 numéros de téléphone") List<String> tel);


}
