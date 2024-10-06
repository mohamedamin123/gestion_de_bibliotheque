package org.bibliotheque.bibliotheque.modele.DTO.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder

public class MemberResDTO extends UserResDTO {

    private Integer idMember;
    private LocalDate dateDeNaissance;
    private LocalDate dateInscription;


}
