package org.bibliotheque.bibliotheque.modele.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
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

    @Past(message = "La date de naissance doit être dans le passé")
    @Column(name = "date_de_naissance")
    private LocalDate dateDeNaissance;

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
}
