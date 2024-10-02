package org.bibliotheque.bibliotheque.modele.DTO.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@SuperBuilder

public class EmpruntReqDTO {

    private Integer idEmprunt;

    private Date dateEmprunt;

    private Date dateRetour;

    private Integer memberId;

    private Integer livreId;

}
