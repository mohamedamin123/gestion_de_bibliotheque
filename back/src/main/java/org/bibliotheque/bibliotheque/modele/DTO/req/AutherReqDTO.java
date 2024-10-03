package org.bibliotheque.bibliotheque.modele.DTO.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@Data
@SuperBuilder

public class AutherReqDTO extends UserReqDTO {

    private Integer idAuther;
    private String nationalite;

    public AutherReqDTO(Integer idAuther, String nationalite) {
        super();
        super.setRole("AUTHER");  // Initialize role as "Member"
        this.idAuther = idAuther;
        this.nationalite = nationalite;
    }


}
