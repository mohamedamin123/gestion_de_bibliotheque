package org.bibliotheque.bibliotheque.modele.DTO.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder

public class MemberReqDTO extends UserReqDTO {


    private Integer idMember;


    private LocalDate dateDeNaissance;


    private LocalDate dateInscription;


}
