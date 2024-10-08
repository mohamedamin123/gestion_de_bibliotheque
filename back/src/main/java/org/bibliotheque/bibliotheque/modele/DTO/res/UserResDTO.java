package org.bibliotheque.bibliotheque.modele.DTO.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@SuperBuilder

public abstract class UserResDTO {


    private String nom;
    private String prenom;
    private List<String> tel;  // Liste de numéros de téléphone
    private String email;
    private String password;
    private String role;
    private LocalDate dateDeNaissance;
    private Boolean statut;



}
