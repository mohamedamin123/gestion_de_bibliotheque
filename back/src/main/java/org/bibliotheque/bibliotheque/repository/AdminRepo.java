package org.bibliotheque.bibliotheque.repository;

import jakarta.validation.constraints.Size;
import org.bibliotheque.bibliotheque.modele.entity.Admin;
import org.bibliotheque.bibliotheque.modele.entity.Auther;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface AdminRepo extends JpaRepository<Admin,Integer> {

    Optional<Admin> findAdminByEmail(String email);

}
