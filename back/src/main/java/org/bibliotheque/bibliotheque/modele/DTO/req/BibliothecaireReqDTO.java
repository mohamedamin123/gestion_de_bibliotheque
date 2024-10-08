package org.bibliotheque.bibliotheque.modele.DTO.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@NoArgsConstructor
@Data
@SuperBuilder

public class BibliothecaireReqDTO extends UserReqDTO {


    private Integer idBibliothecaire;

    private String matricule;


    public BibliothecaireReqDTO(Integer idBibliothecaire, String matricule) {
        super();
        super.setRole("BIBLIOTHECAIRE");  // Initialize role as "Member"
        this.idBibliothecaire = idBibliothecaire;
        this.matricule = matricule;

    }
}
