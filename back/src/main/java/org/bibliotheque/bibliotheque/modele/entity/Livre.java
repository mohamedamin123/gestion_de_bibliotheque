package org.bibliotheque.bibliotheque.modele.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.bibliotheque.bibliotheque.util.enumm.Etat;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Arrays;
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
    @NotBlank(message = "Le description ne doit pas être vide")
    private String description;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Etat etat;

    @NotNull
    private int nbrPage;  // Since it's an int, no need for @NotBlank.

    @Min(value = 0, message = "Le nombre d'étoiles ne peut pas être inférieur à 0")
    @Max(value = 5, message = "Le nombre d'étoiles ne peut pas être supérieur à 5")
    private int star;  // The rating must be between 0 and 5.

    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    @NotNull
    private byte[] image;  // Storing image as a byte array.

    private Boolean statut;


    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "auther_id")
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

    @Override
    public String toString() {
        return "Livre{" +
                "idLivre=" + idLivre +
                ", titre='" + titre + '\'' +
                ", description='" + description + '\'' +
                ", etat=" + etat +
                ", nbrPage=" + nbrPage +
                ", star=" + star +
                ", image=" + Arrays.toString(image) +
                ", statut=" + statut +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", deletedAt=" + deletedAt +
                ", idAuther=" + idAuther +
                '}';
    }
}
