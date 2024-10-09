package org.bibliotheque.bibliotheque.modele.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@SuperBuilder
@Entity
@Table(name = "emprunt")
public class Emprunt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_emprunt")
    private Integer idEmprunt;

    @NotNull(message = "La date d'emprunt ne doit pas être vide")
    @Column(name = "date_emprunt", nullable = false)
    private Date dateEmprunt;

    @NotNull(message = "La date de retour ne doit pas être vide")
    @Column(name = "date_retour", nullable = false)
    private Date dateRetour;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    // Foreign Keys
    @Column(name = "member_id")
    private Integer memberId;

    @Column(name = "livre_id")
    private Integer livreId;

    // Relationships
    @JsonBackReference("emprunt_member")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private Member member;

    @JsonBackReference("emprunt_livre")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "livre_id",  insertable = false, updatable = false)
    private Livre livre;

    @Override
    public String toString() {
        return "Emprunt{" +
                "idEmprunt=" + idEmprunt +
                ", dateEmprunt=" + dateEmprunt +
                ", dateRetour=" + dateRetour +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", deletedAt=" + deletedAt +
                ", memberId=" + memberId +
                ", livreId=" + livreId +
                '}';
    }
}
