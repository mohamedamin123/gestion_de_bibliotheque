package org.bibliotheque.bibliotheque.modele.DTO.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@SuperBuilder

public class ReservationResDTO {

    private Integer idReservation;

    private Date dateReservation;

    private Integer memberId;

    private Integer livreId;

    private LocalDateTime deletedAt;


}
