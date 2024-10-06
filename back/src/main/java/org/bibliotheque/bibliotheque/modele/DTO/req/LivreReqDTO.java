package org.bibliotheque.bibliotheque.modele.DTO.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Data
@SuperBuilder


public class LivreReqDTO {


    private Integer idLivre;

    private String titre;

    private int nbrPage;

    private String description;

    private int star;

    private Integer idAuther;

}
