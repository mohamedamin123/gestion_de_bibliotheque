package org.bibliotheque.bibliotheque.modele.DTO.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@SuperBuilder
public class EmpruntResDTO {


    private Date dateEmprunt;

    private Date dateRetour;

    private Integer memberId;

    private Integer livreId;

}
