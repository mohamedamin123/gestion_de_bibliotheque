package org.bibliotheque.bibliotheque.modele.DTO.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@NoArgsConstructor
@Data
@SuperBuilder
public class MemberReqDTO extends UserReqDTO {

    private Integer idMember;
    private LocalDate dateInscription;

    // Constructor that always sets the role to "Member"
    public MemberReqDTO(Integer idMember, LocalDate dateDeNaissance, LocalDate dateInscription) {
        super();
        super.setRole("MEMBER");  // Initialize role as "Member"
        this.idMember = idMember;
        this.dateInscription = dateInscription;
    }
}
