package org.bibliotheque.bibliotheque.modele.DTO.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@SuperBuilder

public abstract class UserReqDTO {


    private String nom;
    private String prenom;
    private List<String> tel;  // Liste de numéros de téléphone
    private String email;
    private String password;

    private Boolean statut;

    private String role;

}
