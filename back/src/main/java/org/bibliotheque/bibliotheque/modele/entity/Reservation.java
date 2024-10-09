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
@Table
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reservation")
    private Integer idReservation;

    @NotNull
    @NotBlank(message = "La date de reservation ne doit pas être vide")
    private Date dateReservation;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    // Foreign keys
    @Column(name = "member_id")
    private Integer memberId;

    @Column(name = "livre_id")
    private Integer livreId;

    // Relationships
    @JsonBackReference("reservation_member")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private Member member;

    @JsonBackReference("reservation_livre")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "livre_id", insertable = false, updatable = false)
    private Livre livre;

    @Override
    public String toString() {
        return "Reservation{" +
                "idReservation=" + idReservation +
                ", dateReservation=" + dateReservation +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", deletedAt=" + deletedAt +
                ", memberId=" + memberId +
                ", livreId=" + livreId +
                '}';
    }
}
