package org.bibliotheque.bibliotheque.modele.entity;

import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
//@Entity
//@Table(name = "member")
public class Member extends User{

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id_member")
    private int idMember;

    @Past
    //@Column(name = "date_de_naissance")
    private LocalDate dateDeNaissance;

    //@CreationTimestamp
    //@Column(name = "date_inscription")
    private LocalDate dateInscription;

}
