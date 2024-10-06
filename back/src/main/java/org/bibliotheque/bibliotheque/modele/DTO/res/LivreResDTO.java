package org.bibliotheque.bibliotheque.modele.DTO.res;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Data
@SuperBuilder
public class LivreResDTO {

    private String titre;

    private int nbrPage;

    private String description;

    private int star;

    private Integer idAuther;

}
