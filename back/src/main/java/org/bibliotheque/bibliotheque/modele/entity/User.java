package org.bibliotheque.bibliotheque.modele.entity;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@SuperBuilder
@MappedSuperclass
public abstract class User {

    @NotNull
    @NotBlank(message = "Le nom ne doit pas être vide")
    private String nom;

    @NotBlank(message = "Le prénom ne doit pas être vide")
    @NotNull
    private String prenom;

    @Size(min = 1, max = 2, message = "Vous devez fournir entre 1 et 2 numéros de téléphone")
    @ElementCollection
    private List<String> tel;  // Liste de numéros de téléphone

    @Past(message = "La date de naissance doit être dans le passé")
    @Column(name = "date_de_naissance")
    private LocalDate dateDeNaissance;

    @NotNull
    @Email
    private String email;
    @NotNull
    @NotBlank(message = "Le mot de passe ne doit pas être vide")
    private String password;

    private Boolean statut;

    private String role;


    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;



}
