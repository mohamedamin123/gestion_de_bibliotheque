package org.bibliotheque.bibliotheque.modele.DTO.req;

import jakarta.persistence.Lob;
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
    private Boolean statut;

    private String description;

    private int star;
    @Lob
    private byte[] image;  // Storing image as a byte array.

    private Integer idAuther;

}
