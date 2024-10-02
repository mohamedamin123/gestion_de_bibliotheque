package org.bibliotheque.bibliotheque.repository;

import jakarta.validation.constraints.Size;
import org.bibliotheque.bibliotheque.modele.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface MemberRepo extends JpaRepository<Member,Integer> {


    List<Member> findMembersByPrenomOrNom(String prenom,String nom);
    Optional<Member> findMemberByIdMember(Integer id);

    Optional<Member> findMemberByEmail(String email);
    Optional<Member> findMemberByTel(@Size(min = 1, max = 2, message = "Vous devez fournir entre 1 et 2 numéros de téléphone") List<String> tel);


}
