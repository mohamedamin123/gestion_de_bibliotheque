package org.bibliotheque.bibliotheque.modele.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
@Entity
@Table
public class Member extends User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_member")
    private Integer idMember;



    @CreationTimestamp
    @Column(name = "date_inscription", updatable = false)
    private LocalDate dateInscription;

    // Relationships
    @JsonManagedReference("reservation_member")
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reservation> reservations;

    @JsonManagedReference("emprunt_member")
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Emprunt> emprunts;


    public Member(@NotNull @NotBlank(message = "Le nom ne doit pas être vide") String nom, @NotBlank(message = "Le prénom ne doit pas être vide") @NotNull String prenom, @Size(min = 1, max = 2, message = "Vous devez fournir entre 1 et 2 numéros de téléphone") List<String> tel, @Past(message = "La date de naissance doit être dans le passé") LocalDate dateDeNaissance, @NotNull @Email String email, @NotNull @NotBlank(message = "Le mot de passe ne doit pas être vide") String password, Boolean statut, String role, LocalDateTime createdAt, LocalDateTime updatedAt, LocalDateTime deletedAt, Integer idMember, LocalDate dateInscription) {
        super(nom, prenom, tel, dateDeNaissance, email, password, statut, role, createdAt, updatedAt, deletedAt);
        this.idMember = idMember;
        this.dateInscription = dateInscription;
    }
}
