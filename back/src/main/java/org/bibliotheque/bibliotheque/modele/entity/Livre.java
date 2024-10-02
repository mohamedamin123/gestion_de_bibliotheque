package org.bibliotheque.bibliotheque.modele.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@SuperBuilder
@Entity
@Table
public class Livre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_livre")
    private Integer idLivre;

    @NotNull
    @NotBlank(message = "Le titre ne doit pas être vide")
    private String titre;

    @NotNull
    private int nbrPage;  // Since it's an int, no need for @NotBlank.

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "auther_id")  // Ensure the correct spelling if "author" was intended.
    private Integer idAuther;

    // Relationship with Auther
    @JsonBackReference("livre_auther")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auther_id", insertable = false, updatable = false)
    private Auther auther;

    // Relationship with Reservation
    @JsonManagedReference("reservation_livre")
    @OneToMany(mappedBy = "livre", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reservation> reservations;

    // Relationship with Emprunt
    @JsonManagedReference("emprunt_livre")
    @OneToMany(mappedBy = "livre", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Emprunt> emprunts;

}
