package org.bibliotheque.bibliotheque.modele.DTO.req;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@Data
@SuperBuilder

public class AdminReqDTO extends UserReqDTO {

    private Integer idAdmin;

    public AdminReqDTO(Integer idAdmin) {
        super();
        super.setRole("ADMIN");  // Initialize role as "Member"
        this.idAdmin = idAdmin;
        
    }


}

