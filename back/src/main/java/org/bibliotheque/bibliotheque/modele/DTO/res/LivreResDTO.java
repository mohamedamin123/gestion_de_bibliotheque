package org.bibliotheque.bibliotheque.modele.DTO.res;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.bibliotheque.bibliotheque.util.enumm.Etat;
import org.bibliotheque.bibliotheque.util.enumm.Type;

@AllArgsConstructor
@NoArgsConstructor
@Data
@SuperBuilder
public class LivreResDTO {

    private Integer idLivre;


    private String titre;

    private int nbrPage;

    private String description;

    private Etat etat;
    private Type type;


    private int star;
    private Boolean statut;

    @Lob
    private byte[] image;


    private Integer idAuther;

}
