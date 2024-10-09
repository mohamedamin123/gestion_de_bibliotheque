package org.bibliotheque.bibliotheque.modele.DTO.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder

public class AdminResDTO extends UserResDTO {
    private Integer idAdmin;





}
